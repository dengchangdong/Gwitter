import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import config from '../config';
import { useAuth } from '../hooks/useAuth';
import LanguageSwitcher from './LanguageSwitcher';
import { processAvatarUrl } from '../utils';

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

const LoginInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;

  @media (max-width: 768px) {
    gap: 4px;
    margin-left: 4px;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 26px;
    height: 26px;
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 0 2px rgba(29, 155, 240, 0.3);
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

const AuthButton = styled.button<{ $isLoading?: boolean }>`
  background: none;
  border: none;
  color: #1d9bf0;
  font-size: 14px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 18px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: ${props => props.$isLoading ? 0.6 : 1};

  &:hover {
    background-color: rgba(29, 155, 240, 0.1);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 4px 8px;
  }
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
  const { isAuthenticated, user, login, logout, isLoading: authLoading } =
    useAuth();

  return (
    <ToolbarContainer>
      <Logo>{config.app.siteName}</Logo>

      <RightSection>
        <LanguageSwitcher />
        {isLoading ? (
          <LoadingSpinner />
        ) : isAuthenticated && user ? (
          <LoginInfo>
            <AvatarContainer>
              <Avatar src={processAvatarUrl(user.avatarUrl)} alt={user.login} />
            </AvatarContainer>
            <AuthButton onClick={logout}>{t('auth.logout')}</AuthButton>
          </LoginInfo>
        ) : (
          <AuthButton
            onClick={login}
            disabled={authLoading}
            $isLoading={authLoading}
          >
            {authLoading ? t('auth.loading') : t('auth.login')}
          </AuthButton>
        )}
      </RightSection>
    </ToolbarContainer>
  );
};

export default Toolbar;
