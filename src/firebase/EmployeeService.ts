import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  DocumentData
} from 'firebase/firestore';
import { db } from './BaseConfig';
import { Employee } from '@/types';

/*
 *   Firebase add employee
 */
export const addEmployee = async (employee: Omit<Employee, 'id'>) => {
  try {
    const result = await addDoc(collection(db, 'employees'), employee);
    return result.id
  } catch (error) {
    console.error('Error adding employee', error);
    throw error;
  }
};

/*
 *   Firebase get employess function
 */
export const getEmployees = async (page: number, rowsPerPage: number, lastDoc?: Employee | DocumentData) => {
  try {
    const totalCount = (await getDocs(collection(db, 'employees'))).size;

    let employeesQuery = query(
      collection(db, 'employees'),
      orderBy('name'),
      limit(rowsPerPage)
    );

    if (page !== 0 && lastDoc) {
      employeesQuery = query(
        collection(db, 'employees'),
        orderBy('name'),
        startAfter(lastDoc.name),
        limit(rowsPerPage)
      );
    }

    const documentSnapshots = await getDocs(employeesQuery);

    const employees = documentSnapshots.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Employee[];

    return { employees, totalCount };
  } catch (error) {
    console.error('Error fetching employees', error);
    throw error;
  }
};

/*
 *   Firebase delete employee
 */
export const deleteEmployee = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'employees', id));
  } catch (error) {
    console.error('Error deleting employee', error);
    throw error;
  }
};

/*
 *   Firebase update employee
 */
export const updateEmployee = async (id: string, data: Partial<Employee>) => {
  try {
    await updateDoc(doc(db, 'employees', id), data);
  } catch (error) {
    console.error('Error updating employee', error);
    throw error;
  }
};

/*
 * Firebase check if employee exists
 */
export const checkIfEmployeeExists = async (
  field: string,
  value: string,
  currentId?: string
) => {
  try {
    const q = query(collection(db, 'employees'), where(field, '==', value));

    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.filter((doc) => doc.id !== currentId);

    return docs.length === 0;
  } catch (error) {
    console.error('Error checking if employee exists', error);
    throw error;
  }
};
