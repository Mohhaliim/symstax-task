import styled from 'styled-components';

import EmployeesTable from '@/components/employeesTable';
import Navbar from '@/components/navbar';
import ErrorView from '@/components/errorView';

const PageWrapper = styled.div`
    max-width: 1200px;
    margin-inline: auto;
    position: relative;
`;

export default function Home() {
  return (
    <PageWrapper>
      <Navbar />
      <ErrorView />
      <EmployeesTable />
    </PageWrapper>
  );
}
