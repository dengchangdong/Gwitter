import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import config from '../config';
import LanguageSwitcher from './LanguageSwitcher';

const slideInTop = keyframes`
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ToolbarContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0.8em 0.4em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  animation: ${slideInTop} 0.3s ease both;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 6px;
    padding: 0.5em 0.2em;
  }
`;

const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid rgba(29, 155, 240, 0.2);
  border-top-color: #1d9bf0;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Logo = styled.div`
  color: #1d9bf0;
  font-size: 20px;
  font-weight: bold;
  cursor: default;
  user-select: none;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

interface ToolbarProps {
  onRepoChange: (owner: string, repo: string) => void;
  currentRepo: { owner: string; repo: string };
  isLoading?: boolean;
  error?: string | null;
}

const Toolbar = ({
  currentRepo,
  isLoading = false,
}: ToolbarProps) => {
  const { t } = useTranslation();

  return (
    <ToolbarContainer>
      <Logo>{config.app.siteName}</Logo>

      <RightSection>
        <LanguageSwitcher />
        {isLoading && <LoadingSpinner />}
      </RightSection>
    </ToolbarContainer>
  );
};

export default Toolbar;
