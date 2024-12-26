import RegisterForm from '@/components/registerForm';
import styled from 'styled-components';

const PageWrapper = styled.div`
    max-width: 1200px;
    margin-inline: auto;
    display: flex;
`;

const CenterWrapper = styled.div`
    align-content: center;
    min-height: 100vh;
`;
const Register = () => {
  return (
    <CenterWrapper>
      <PageWrapper>
        <RegisterForm />
      </PageWrapper>
    </CenterWrapper>
  );
};

export default Register;
