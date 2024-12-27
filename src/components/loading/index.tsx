import styled, { keyframes } from 'styled-components';
import { Loader2 } from 'lucide-react';

const LoadingWrapper = styled.div`
    width: 100%;
    margin-top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        margin-top: 60px;
    }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledLoader = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
  color: #4CAF50;
`;

const Loading = () => {
  return (
    <LoadingWrapper>
      <StyledLoader size={50} />
    </LoadingWrapper>
  );
};

export default Loading;
