import LoginForm from '@/components/loginForm';
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

const Login = () => {
  return (
    <CenterWrapper>
      <PageWrapper>
        <LoginForm />
      </PageWrapper>
    </CenterWrapper>
  );
};

export default Login;
