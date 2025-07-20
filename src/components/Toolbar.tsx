import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import config from '../config';
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

const RepoInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RepoInput = styled.input`
  padding: 6px 10px;
  border: 1px solid #e1e8ed;
  border-radius: 16px;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.9);
  color: #14171a;
  width: 180px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #1da1f2;
    box-shadow: 0 0 0 2px rgba(29, 161, 242, 0.1);
  }

  &::placeholder {
    color: #657786;
  }

  @media (max-width: 768px) {
    width: 140px;
    font-size: 12px;
  }
`;

const RepoLabel = styled.span`
  font-size: 12px;
  color: #657786;
  font-weight: 500;
`;

const ApplyButton = styled.button`
  background: #1da1f2;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #1991db;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;







interface ToolbarProps {
  onRepoChange?: (owner: string, repo: string) => void;
  currentRepo?: { owner: string; repo: string };
  isLoading?: boolean;
  error?: string | null;
}

const Toolbar = ({
  onRepoChange,
  currentRepo,
  isLoading: repoLoading = false,
  error,
}: ToolbarProps) => {
  const { t } = useTranslation();

  const defaultRepo = `${config.request.owner}/${config.request.repo}`;

  const [repoInput, setRepoInput] = useState(
    currentRepo ? `${currentRepo.owner}/${currentRepo.repo}` : defaultRepo,
  );
  const [validationError, setValidationError] = useState<string>('');

  const isValidRepo = (input: string) => {
    if (!input.trim()) {
      return false;
    }
    const parts = input.split('/');
    return parts.length === 2 && parts[0].trim() && parts[1].trim();
  };

  const handleApplyRepo = () => {
    setValidationError('');

    if (!isValidRepo(repoInput)) {
      setValidationError(t('toolbar.invalidRepo'));
      return;
    }

    const [owner, repo] = repoInput.split('/');
    if (onRepoChange) {
      onRepoChange(owner.trim(), repo.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValidRepo(repoInput)) {
      handleApplyRepo();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoInput(e.target.value);
    if (validationError) {
      setValidationError('');
    }
  };

  useEffect(() => {
    const expectedInput = currentRepo
      ? `${currentRepo.owner}/${currentRepo.repo}`
      : defaultRepo;
    if (expectedInput !== repoInput) {
      setRepoInput(expectedInput);
      setValidationError('');
    }
  }, [currentRepo, defaultRepo]);

  return (
    <ToolbarContainer>
      <LeftSection>
        <LanguageSwitcher />
        <RepoInputContainer>
          <RepoLabel>{t('toolbar.repo')}</RepoLabel>
          <RepoInput
            value={repoInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={t('toolbar.repoPlaceholder')}
            style={{
              borderColor: error || validationError ? '#ff6b6b' : '#e1e8ed',
            }}
          />
          <ApplyButton
            onClick={handleApplyRepo}
            disabled={!isValidRepo(repoInput) || repoLoading}
            title={!isValidRepo(repoInput) ? t('toolbar.invalidRepo') : ''}
          >
            {repoLoading ? (
              <LoadingSpinner style={{ width: '12px', height: '12px' }} />
            ) : (
              t('toolbar.apply')
            )}
          </ApplyButton>
        </RepoInputContainer>
      </LeftSection>
      <RightSection>

      </RightSection>
    </ToolbarContainer>
  );
};

export default Toolbar;
