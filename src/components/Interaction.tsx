import styled from '@emotion/styled';
import { forwardRef } from 'react';

interface InteractionProps {
  id: number;
  issueId: string; // GitHub node ID
  repoOwner?: string;
  repoName?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Interaction = forwardRef<HTMLDivElement, InteractionProps>(({
  id,
  issueId,
  repoOwner,
  repoName,
}, ref) => {
  return <Container ref={ref} />;
};

export default Interaction;
