import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, IconButton, useTheme, useMediaQuery } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import {
  setEmployees,
  setTotalCount,
  setError,
  setLoading,
} from '@/store/slices/employeesSlice';
import { getEmployees } from '@/firebase/EmployeeService';
import { RootState, Employee } from '@/types';

import Loading from '@/components/loading';
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

    @media (max-width: 768px) {
        margin-top: 60px;
    }
`;

const AddEmployeeButton = styled.button`
    padding: 10px 20px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
    align-self: flex-start;

    &:hover {
        background-color: #45a049;
    }
`;

const EmployeesTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );
  const totalCount = useSelector(
    (state: RootState) => state.employees.totalCount
  );
  const loading = useSelector((state: RootState) => state.employees.loading);

  useEffect(() => {
    handleGetEmployees(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel]);

  const handleGetEmployees = async (page: number, pageSize: number) => {
    dispatch(setLoading(true));
    try {
      let result;

      if (page === 0) {
        result = await getEmployees(page, pageSize);
      } else {
        const lastDoc = employees[employees.length - 1];
        result = await getEmployees(page, pageSize, lastDoc);
      }

      dispatch(setEmployees(result.employees));
      dispatch(setTotalCount(result.totalCount));
    } catch (error) {
      dispatch(
        setError(
          error instanceof Error ? error.message : 'An unknown error occurred'
        )
      );
    } finally {
      console.log('here');
      dispatch(setLoading(false));
    }
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

  const getColumns = (): GridColDef[] => {
    const baseColumns: GridColDef[] = [
      {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        minWidth: 150,
      },
    ];

    if (!isMobile) {
      baseColumns.push({
        field: 'department',
        headerName: 'Department',
        flex: 1,
        minWidth: 150,
      });
    }

    if (!isTablet) {
      baseColumns.push(
        {
          field: 'role',
          headerName: 'Role',
          flex: 1,
          minWidth: 150,
        },
        {
          field: 'phone',
          headerName: 'Phone',
          flex: 1,
          minWidth: 150,
        }
      );
    }

    if (!isMobile) {
      baseColumns.push({
        field: 'email',
        headerName: 'Email',
        flex: 1,
        minWidth: 200,
      });
    }

    baseColumns.push({
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleView(params.row)} size="small">
            <ViewIcon />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row)} size="small">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    });

    return baseColumns;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <EmployeesTableWrapper>
      <AddEmployeeButton onClick={() => setOpenAddDialog(true)}>
        Add Employee
      </AddEmployeeButton>
      <Paper
        sx={{
          width: '100%',
          height: 'fit-content',
          maxWidth: {
            xs: '100%',
            sm: '100%',
            md: '90%',
            lg: '100%',
          },
          margin: '0 auto',
        }}
      >
        <DataGrid
          rows={employees}
          columns={getColumns()}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25]}
          rowCount={totalCount}
          paginationMode="server"
          disableRowSelectionOnClick
          disableColumnFilter
          sx={{
            border: 'none',
            '& .MuiDataGrid-main': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f0f0f0',
              borderColor: '#f0f0f0',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#4CAF50',
              color: 'white',
              fontWeight: 'bold',
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#4CAF50',
              color: 'white',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
              color: 'white',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f5f5f5',
            },
            '& .MuiDataGrid-footerContainer': {
              border: 'none',
            },
            '& .MuiDataGrid-container--top [role=row], & .MuiDataGrid-container--bottom [role=row]':
              {
                backgroundColor: '#4CAF50',
              },
          }}
        />
      </Paper>

      {selectedEmployee && openViewDialog && (
        <ViewEmployee
          employee={selectedEmployee}
          setOpenViewDialog={setOpenViewDialog}
        />
      )}
      {selectedEmployee && openDeleteDialog && (
        <DeleteEmployee
          employee={selectedEmployee}
          setOpenDeleteDialog={setOpenDeleteDialog}
        />
      )}
      {selectedEmployee && openEditDialog && (
        <EditEmployee
          employee={selectedEmployee}
          setOpenEditDialog={setOpenEditDialog}
        />
      )}
      {openAddDialog && <AddEmployee setOpenAddDialog={setOpenAddDialog} />}
    </EmployeesTableWrapper>
  );
};

export default EmployeesTable;
