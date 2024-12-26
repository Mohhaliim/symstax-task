import EmployeesTable from "@/components/employeesTable";
import Navbar from "@/components/navbar"
import styled from 'styled-components';

const PageWrapper = styled.div`
    max-width: 1200px;
    margin-inline: auto;
`;

export default function Home() {
    return (
        <PageWrapper>
            <Navbar />
            <EmployeesTable />
        </PageWrapper>
    )
}