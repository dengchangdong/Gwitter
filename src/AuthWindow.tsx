import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { parseUrl } from './utils';
import { getAccessToken } from './utils/request';

const Container = styled.div`
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
`;

const InitingWrapper = styled.div`
  padding: 1.25em 0;
  text-align: center;
`;

const InitingText = styled.p`
  margin: 0.5em auto;
  color: #999;
`;

const ErrorText = styled.p`
  margin: 0.5em auto;
  color: #ff4d4f;
  font-size: 0.9em;
`;

const squareAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const loaderInnerAnimation = keyframes`
  0% {
    height: 0%;
  }
  25% {
    height: 0%;
  }
  50% {
    height: 100%;
  }
  75% {
    height: 100%;
  }
  100% {
    height: 0%;
  }
`;

const SquareLoader = styled.span`
  display: inline-block;
  width: 2em;
  height: 2em;
  position: relative;
  border: 4px solid #ccc;
  border-radius: 10%;
  box-shadow: inset 0px 0px 20px 20px #ebebeb33;
  animation: ${squareAnimation} 2s infinite ease;
`;

const SquareInner = styled.span`
  vertical-align: top;
  display: inline-block;
  width: 100% !important;
  background-color: #ccc;
  box-shadow: 0 0 5px 0px #ccc;
  animation: ${loaderInnerAnimation} 2s infinite ease-in;
`;

const AuthWindow = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 设置超时，如果5秒后还没有完成授权，则显示错误
    const timeoutId = setTimeout(() => {
      setError('授权超时，请检查网络连接或重试');
      
      // 向父窗口发送错误消息
      if (window.opener) {
        try {
          window.opener.postMessage(
            JSON.stringify({
              error: 'Authorization timeout',
            }),
            window.opener.location,
          );
        } catch (err) {
          console.error('Failed to send message to opener:', err);
        }
      }
      
      // 3秒后自动关闭窗口
      setTimeout(() => {
        window.close();
      }, 3000);
    }, 30000); // 30秒超时
    
    const code = parseUrl().code;
    if (code) {
      getAccessToken(code)
        .then((res) => {
          clearTimeout(timeoutId);
          
          if (window.opener) {
            try {
              window.opener.postMessage(
                JSON.stringify({
                  result: res,
                }),
                window.opener.location,
              );
            } catch (err) {
              setError('无法与主窗口通信');
              console.error('Failed to send message to opener:', err);
            }
          } else {
            setError('无法找到父窗口');
          }
          
          // 成功后1秒自动关闭窗口
          setTimeout(() => {
            window.close();
          }, 1000);
        })
        .catch((err) => {
          clearTimeout(timeoutId);
          setError('授权失败: ' + (err.message || '未知错误'));
          
          if (window.opener) {
            try {
              window.opener.postMessage(
                JSON.stringify({
                  error: err.message || 'Authorization failed',
                }),
                window.opener.location,
              );
            } catch (msgErr) {
              console.error('Failed to send error message to opener:', msgErr);
            }
          }
          
          // 错误后3秒自动关闭窗口
          setTimeout(() => {
            window.close();
          }, 3000);
        });
    } else {
      clearTimeout(timeoutId);
      setError('未接收到授权码');
      
      // 没有授权码，3秒后自动关闭窗口
      setTimeout(() => {
        window.close();
      }, 3000);
    }
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Container>
      <InitingWrapper>
        <SquareLoader>
          <SquareInner />
        </SquareLoader>
        <InitingText>{error || t('auth.authorizing')}</InitingText>
        {error && <ErrorText>窗口将在几秒钟后自动关闭</ErrorText>}
      </InitingWrapper>
    </Container>
  );
};

export default AuthWindow;
