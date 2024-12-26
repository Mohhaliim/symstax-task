import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { setEmployees, setTotalCount, setError, setLoading } from '@/store/slices/employeesSlice';
import {getEmployees} from '@/firebase/EmployeeService';
import { RootState, Employee} from "@/types";
import ViewEmployee from '@/components/viewEmployee';
import DeleteEmployee from '@/components/deleteEmployee';
import EditEmployee from '@/components/editEmployee';
import AddEmployee from '@/components/addEmployee';

const EmployeesTableWrapper = styled.div`
    width: 100%;
    margin-top: 100px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const AddEmployeeButton = styled.button`
    padding: 10px 20px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
    self: flex-start;
`;

const EmployeesTable = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const employees = useSelector((state: RootState) => state.employees.employees);
    const totalCount = useSelector((state: RootState) => state.employees.totalCount);

    useEffect(() => {
        handleGetEmployees(page, rowsPerPage)
    }, [page, rowsPerPage])

    const handleGetEmployees = async (page: number, rowsPerPage: number) => {
        dispatch(setLoading(true));

        try {
            const result = await getEmployees(page, rowsPerPage);
            dispatch(setEmployees(result.employees));
            dispatch(setTotalCount(result.totalCount));
            dispatch(setLoading(false));
        }catch(error) {
            dispatch(setError(error instanceof Error ? error.message : 'An unknown error occurred'));
            dispatch(setLoading(false));
        }
    }

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
      };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    };

    const handleView = (employee: Employee) => {
        setSelectedEmployee(employee);
        setOpenViewDialog(true);
    };

    const handleEdit = (employee: Employee) => {
        setSelectedEmployee(employee);
        setOpenEditDialog(true);
     };

     const handleDelete = (employee: Employee) => {
        setSelectedEmployee(employee);
        setOpenDeleteDialog(true);
      };

    return (
        <EmployeesTableWrapper>
            <AddEmployeeButton onClick={() => setOpenAddDialog(!openAddDialog)}>Add Employee</AddEmployeeButton>
            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((employee) => (
                    <TableRow key={employee.id}>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{employee.phone}</TableCell>
                        <TableCell>
                        <IconButton onClick={() => handleView(employee)}>
                            <ViewIcon />
                        </IconButton>
                        <IconButton onClick={() => handleEdit(employee)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(employee)}>
                            <DeleteIcon />
                        </IconButton>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            { selectedEmployee && openViewDialog && <ViewEmployee employee={selectedEmployee} setOpenViewDialog={setOpenViewDialog} />}
            {selectedEmployee && openDeleteDialog && <DeleteEmployee  employee={selectedEmployee} setOpenDeleteDialog={setOpenDeleteDialog}/>}
            {selectedEmployee && openEditDialog && <EditEmployee employee={selectedEmployee} setOpenEditDialog={setOpenEditDialog}/>}
            {openAddDialog && <AddEmployee setOpenAddDialog={setOpenAddDialog}/>}
        </EmployeesTableWrapper>
    )
}

export default EmployeesTable
