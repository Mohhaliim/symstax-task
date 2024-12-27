import { useEffect } from 'react';
import styled from 'styled-components';
import { Warning as ErrorIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '@/store/slices/employeesSlice';
import { RootState } from '@/types';

const ErrorViewWrapper = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 10px -1px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 15%;
  right: 0%;
  overflow: hidden;
`;

const RedBar = styled.div`
    background-color: #ef3536;
    height: 10px;
    width: 100%
  `;

const ErrorContent = styled.div`
  padding-inline: 20px;
  padding-block: 10px;
  `;

const ErrorMessage = styled.div`
    font-size: 14px;
    font-weight: 500;
    font-color: #ef3536
  `;

const ErrorView = () => {
    const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.employees.error);

  useEffect(()=> {
    if(error) {
        const timer = setTimeout(() => {
            dispatch(setError(null))
        }, 3000)

        return () => clearTimeout(timer)
    }
  },[error, dispatch])

  if (!error) return null;

  return (
    <ErrorViewWrapper>
      <ErrorContent>
        <ErrorIcon style={{ color: '#ef3536' }} />
        <ErrorMessage>{error}</ErrorMessage>
      </ErrorContent>
      <RedBar />
    </ErrorViewWrapper>
  );
};
export default ErrorView;
