import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../config';
import { useAuth } from '../hooks/useAuth';
import LanguageSwitcher from './LanguageSwitcher';

const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: hsla(0, 0%, 100%, 0.8);

  border-radius: 10px;
  border: 1px solid #e1e8ed;
  margin-bottom: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0.1em 0.2em 0 rgba(234, 234, 234, 0.8);
  border: 0.5px solid #f1f1f1;
  margin: 6px;
  margin-bottom: 1em;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;



const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LoginBtn = styled.button`
  background: #1da1f2;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: #1991db;
  }
`;

const LogoutBtn = styled(LoginBtn)`
  background: transparent;
  color: #657786;
  border: none;
  padding: 0;
  font-size: 12px;
  font-weight: 400;
  opacity: 0.8;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: #657786;
    background: transparent;
    opacity: 1;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 16px;
  font-size: 12px;
`;

const UserAvatar = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;

const UserName = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #14171a;
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #e1e8ed;
  border-top: 2px solid #1da1f2;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 16px;
  font-size: 12px;
  color: #657786;
`;

interface ToolbarProps {}

const Toolbar = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, login, logout, isLoading } = useAuth();

  const renderAuthSection = () => {
    if (isLoading) {
      return (
        <LoadingContainer>
          <LoadingSpinner />
          <span>{t('auth.loading')}</span>
        </LoadingContainer>
      );
    }

    if (isAuthenticated && user) {
      return (
        <UserInfo>
          <UserAvatar src={user.avatarUrl} alt={user.login} />
          <UserName>@{user.login}</UserName>
          <LogoutBtn onClick={logout}>{t('auth.logout')}</LogoutBtn>
        </UserInfo>
      );
    }

    return (
      <LoginBtn onClick={login}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        {t('auth.login')}
      </LoginBtn>
    );
  };

  return (
    <ToolbarContainer>
      <LeftSection>
        <LanguageSwitcher />
      </LeftSection>
      <RightSection>{renderAuthSection()}</RightSection>
    </ToolbarContainer>
  );
};

export default Toolbar;
