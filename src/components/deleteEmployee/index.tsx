import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Employee, RootState } from '@/types';
import { deleteEmployee } from '@/firebase/EmployeeService';
import { setLoading, setError, setTotalCount, setEmployees } from '@/store/slices/employeesSlice';

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

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #ccc;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  `;

const DeleteEmployee = ({employee, setOpenDeleteDialog}: {employee: Employee, setOpenDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const dispatch = useDispatch();
  const cardWrapperRef = useRef<HTMLDivElement | null>(null);
  const employees = useSelector((state: RootState) => state.employees.employees);
  const totalCount = useSelector((state: RootState) => state.employees.totalCount);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if(cardWrapperRef.current && !cardWrapperRef.current.contains(event.target as Node)) {
        setOpenDeleteDialog(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [setOpenDeleteDialog])

  const handleClose = () => {
     setOpenDeleteDialog(false);
  }

  const handleConfirmDelete = async () => {
    dispatch(setLoading(true));
    try {
      await deleteEmployee(employee.id);
      dispatch(setTotalCount(totalCount - 1));
      dispatch(setEmployees(employees.filter((emp) => emp.id !== employee.id)));
      dispatch(setLoading(false));
      handleClose()
   } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'An unknown error occurred'));
      dispatch(setLoading(false));
    }
  }

  return (
    <Overlay>
      <CardWrapper ref={cardWrapperRef}>
        <ButtonWrapper>
          <DeleteButton onClick={handleConfirmDelete}>Delete</DeleteButton>
          <CancelButton onClick={handleClose}>Cancel</CancelButton>
        </ButtonWrapper>
      </CardWrapper>
    </Overlay>
  );
};

export default DeleteEmployee;

/*  */
