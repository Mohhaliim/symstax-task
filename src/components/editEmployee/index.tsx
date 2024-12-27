import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLoading,
  setError,
  setEmployees,
} from '@/store/slices/employeesSlice';
import { Employee, RootState } from '@/types';
import {
  checkIfEmployeeExists,
  updateEmployee,
} from '@/firebase/EmployeeService';

const departments = [
  { id: 'Engineering', name: 'Engineering' },
  { id: 'Human Resources', name: 'Human Resources' },
  { id: 'Sales', name: 'Sales' },
  { id: 'Marketing', name: 'Marketing' },
  { id: 'Accounting', name: 'Accounting' },
];

const validationSchema = (currentId?: string) => {
  return Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required')
      .test(
        'unique-email',
        'Email already exists',
        async (value) =>
          await checkIfEmployeeExists('email', value || '', currentId)
      ),
    phone: Yup.string()
      .matches(/^(\+20|0)?1[0125][0-9]{8}$/, 'Invalid phone number')
      .test(
        'unique-phone',
        'Phone number already exists',
        async (value) =>
          await checkIfEmployeeExists('phone', value || '', currentId)
      ),
    department: Yup.string().required('Department is required'),
    role: Yup.string()
      .required('Role is required')
      .min(2, 'Role must be at least 2 characters'),
  });
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled.div`
  background-color: #fff;
  padding-inline: 40px;
  padding-block: 30px;
  border-radius: 5px;
  box-shadow: 0 1px 10px -1px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 600px;
  height: fit-content;
  gap: 1rem
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  padding: 20px;
`;

const StyledField = styled(Field)`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const StyledSelect = styled(Field)`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  width: 100%;
`;

const StyledError = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background-color: #ccc;
  }
`;

const EditEmployee = ({
  employee,
  setOpenEditDialog,
}: {
  employee: Employee;
  setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const initialValues = employee;
  const cardWrapperRef = useRef<HTMLDivElement | null>(null);
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        cardWrapperRef.current &&
        !cardWrapperRef.current.contains(event.target as Node)
      ) {
        setOpenEditDialog(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setOpenEditDialog]);

  const handleSubmit = async (values: Employee) => {
    dispatch(setLoading(true));
    try {
      await updateEmployee(employee.id, values);
      dispatch(
        setEmployees(
          employees.map((emp: Employee) =>
            emp.id === employee.id ? values : emp
          )
        )
      );
      dispatch(setLoading(false));
      setOpenEditDialog(false);
    } catch (error) {
      dispatch(
        setError(
          error instanceof Error ? error.message : 'An unknown error occurred'
        )
      );
      dispatch(setLoading(false));
    }
  };

  return (
    <Overlay>
      <CardWrapper ref={cardWrapperRef}>
        <Formik
          initialValues={initialValues}
          validationSchema={() => validationSchema(employee.id)}
          onSubmit={handleSubmit}
          enableReinitialize={false}
        >
          {({
            errors,
            touched,
            isSubmitting,
            values,
            setFieldValue,
          }: FormikProps<Employee>) => (
            <StyledForm>
              <div>
                <StyledField name="name" placeholder="Name" />
                {errors.name && touched.name && (
                  <StyledError>{errors.name}</StyledError>
                )}
              </div>

              <div>
                <StyledField type="email" name="email" placeholder="Email" />
                {errors.email && touched.email && (
                  <StyledError>{errors.email}</StyledError>
                )}
              </div>

              <div>
                <StyledField
                  name="phone"
                  placeholder="Phone (e.g., +201xxxxxxxxx)"
                />
                {errors.phone && touched.phone && (
                  <StyledError>{errors.phone}</StyledError>
                )}
              </div>

              <div>
                <StyledSelect
                  value={values.department}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setFieldValue('department', e.target.value);
                  }}
                  as="select"
                  name="department"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </StyledSelect>
                {errors.department && touched.department && (
                  <StyledError>{errors.department}</StyledError>
                )}
              </div>

              <div>
                <StyledField name="role" placeholder="Role" />
                {errors.role && touched.role && (
                  <StyledError>{errors.role}</StyledError>
                )}
              </div>

              {(errors as { submit?: string }).submit && (
                <StyledError>
                  {(errors as { submit?: string }).submit}
                </StyledError>
              )}

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Employee'}
              </SubmitButton>
            </StyledForm>
          )}
        </Formik>
      </CardWrapper>
    </Overlay>
  );
};

export default EditEmployee;
