import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

const SwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LanguageButton = styled.button<{ isActive: boolean }>`
  background: ${(props) => (props.isActive ? '#1da1f2' : 'transparent')};
  color: ${(props) => (props.isActive ? 'white' : '#657786')};
  border: 1px solid ${(props) => (props.isActive ? '#1da1f2' : '#e1e8ed')};
  padding: 4px 8px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s;
  min-width: 32px;

  &:hover {
    background: ${(props) => (props.isActive ? '#1991db' : '#f7f9fa')};
    border-color: ${(props) => (props.isActive ? '#1991db' : '#d1d9e0')};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <SwitcherContainer>
      <LanguageButton
        isActive={i18n.language === 'zh' || i18n.language === 'zh-CN'}
        onClick={() => changeLanguage('zh')}
      >
        中
      </LanguageButton>
      <LanguageButton
        isActive={i18n.language === 'en'}
        onClick={() => changeLanguage('en')}
      >
        EN
      </LanguageButton>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher;
