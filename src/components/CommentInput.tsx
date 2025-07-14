import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CommentInputProps {
  onSubmit: (content: string) => Promise<void>;
  onCancel?: () => void;
  initialValue?: string;
  placeholder?: string;
  submitText?: string;
  showCancel?: boolean;
  isExpanded?: boolean;
}

const InputContainer = styled.div<{ $isExpanded?: boolean }>`
  background: white;
  border-radius: 12px;
  border: 1px solid #e1e8ed;
  padding: 12px;
  transition:
    max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.2s ease;
  overflow: hidden;
  max-height: ${(props) => (props.$isExpanded ? '500px' : '80px')};
  will-change: max-height;
  contain: layout;

  &:focus-within {
    border-color: #1d9bf0;
  }
`;

const TextArea = styled.textarea<{ $isExpanded?: boolean }>`
  width: 100%;
  min-height: ${(props) => (props.$isExpanded ? '60px' : '40px')};
  padding: 0;
  border: none;
  font-size: 14px;
  line-height: 1.3125;
  resize: vertical;
  background: transparent;
  color: #0f1419;
  transition: min-height 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: min-height;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #536471;
  }
`;

const ButtonContainer = styled.div<{ $isExpanded?: boolean }>`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e1e8ed;
  opacity: ${(props) => (props.$isExpanded ? 1 : 0)};
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: ${(props) => (props.$isExpanded ? 'auto' : 'none')};
  will-change: opacity;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
  border: none;
  min-width: 70px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.variant === 'primary'
      ? `
    background: #1d9bf0;
    color: white;

    &:hover:not(:disabled) {
      background: #1a8cd8;
    }

    &:disabled {
      background: #8ecdf8;
      cursor: not-allowed;
    }
  `
      : `
    background: transparent;
    color: #0f1419;
    border: 1px solid #cfd9de;

    &:hover {
      background: #f7f9fa;
      border-color: #8b98a5;
    }
  `}
`;

const CommentInput: React.FC<CommentInputProps> = ({
  onSubmit,
  onCancel,
  initialValue = '',
  placeholder,
  submitText,
  showCancel = false,
  isExpanded = false,
}) => {
  const { t } = useTranslation();
  const [content, setContent] = useState(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(content.trim());
      setContent('');
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setContent(initialValue);
    setIsFocused(false);
    onCancel?.();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // 延迟失焦，避免点击按钮时立即收起
    setTimeout(() => {
      if (!content.trim()) {
        setIsFocused(false);
      }
    }, 150);
  };

  const shouldExpand = isExpanded || isFocused || content.trim().length > 0;

  return (
    <InputContainer $isExpanded={shouldExpand}>
      <TextArea
        ref={textAreaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder || t('comments.placeholder')}
        disabled={isSubmitting}
        onFocus={handleFocus}
        onBlur={handleBlur}
        $isExpanded={shouldExpand}
      />
      <ButtonContainer $isExpanded={shouldExpand}>
        {showCancel && (
          <Button variant="secondary" onClick={handleCancel}>
            {t('comments.cancel')}
          </Button>
        )}
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!content.trim() || isSubmitting}
        >
          {isSubmitting
            ? showCancel
              ? t('comments.saving')
              : t('comments.adding')
            : submitText || t('comments.add')}
        </Button>
      </ButtonContainer>
    </InputContainer>
  );
};

export default CommentInput;
