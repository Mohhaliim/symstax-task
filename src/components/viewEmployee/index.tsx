import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Employee } from '@/types';

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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  align-items: center;
  max-width: 600px;
  height: fit-content;
  gap: 1rem
`;

const LabelDiv = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #535454;
`;

const ValueDiv = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #9fa1a1;
`;

const DataWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const EmailWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  grid-column: span 2
`;

const ViewEmployee = ({employee, setOpenViewDialog}: {employee: Employee, setOpenViewDialog: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const cardWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if(cardWrapperRef.current && !cardWrapperRef.current.contains(event.target as Node)) {
        setOpenViewDialog(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [setOpenViewDialog])

    return (
        <Overlay>
        <CardWrapper ref={cardWrapperRef}>
            <DataWrapper>
              <LabelDiv>Name: </LabelDiv>
              <ValueDiv>{employee.name}</ValueDiv>
            </DataWrapper>
            <DataWrapper>
              <LabelDiv>Department: </LabelDiv>
              <ValueDiv>{employee.department}</ValueDiv>
            </DataWrapper>
            <DataWrapper>
              <LabelDiv>Role: </LabelDiv>
              <ValueDiv>{employee.role}</ValueDiv>
            </DataWrapper>
            <DataWrapper>
              <LabelDiv>Phone: </LabelDiv>
              <ValueDiv>{employee.phone}</ValueDiv>
            </DataWrapper>
            <EmailWrapper>
              <LabelDiv>Email: </LabelDiv>
              <ValueDiv>{employee.email}</ValueDiv>
            </EmailWrapper>
        </CardWrapper>
        </Overlay>
    )
}

export default ViewEmployee