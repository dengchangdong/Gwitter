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


  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    transition:
      color 0.2s,
      opacity 0.2s;
    position: relative;
    z-index: 1;
    fill: ${COLORS.primary};
  }

  &.liked-animation svg {
    animation: ${heartPop} 0.3s ease-in-out;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: transparent;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease;
    z-index: 0;
  }

  &.like-icon:hover {
    svg {
      color: ${COLORS.like};
      fill: ${COLORS.like};
    }

    &::before {
      width: 36px;
      height: 36px;
      background: ${COLORS.likeHover};
    }
  }

  &.comment-icon:hover {
    svg {
      color: ${COLORS.comment};
      fill: ${COLORS.comment};
    }

    &::before {
      width: 36px;
      height: 36px;
      background: ${COLORS.commentHover};
    }
  }

  &.comment-active {
    svg {
      color: ${COLORS.comment};
      fill: ${COLORS.comment};
    }

    &::before {
      width: 36px;
      height: 36px;
      background: ${COLORS.commentHover};
    }
  }
`;

const HeartIcon = forwardRef<SVGSVGElement, { filled?: boolean }>(
  ({ filled = false }, ref) => (
    <svg viewBox="0 0 24 24" ref={ref}>
      <g>
        {filled ? (
          <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
        ) : (
          <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
        )}
      </g>
    </svg>
  ),
);

const CommentIcon = () => (
  <svg viewBox="0 0 24 24">
    <g>
      <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
    </g>
  </svg>
);

interface ParticleStyle {
  x: string;
  y: string;
  duration: string;
  delay: string;
  color: string;
  size: string;
  shape: 'circle' | 'heart';
  initialScale: number;
  initialRotation: string;
}

const generateParticleStyle = (): ParticleStyle => {
  const angle = Math.random() * 360;
  const distance = Math.random() * 25 + 25;
  const x = `${Math.cos(angle * (Math.PI / 180)) * distance}px`;
  const y = `${Math.sin(angle * (Math.PI / 180)) * distance - 15}px`;
  const duration = `${Math.random() * 0.4 + 0.5}s`;
  const delay = `${Math.random() * 0.15}s`;
  const colors = [COLORS.like, '#ff78c8', '#ff4da6', '#e60073', '#cc0066'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const shape = Math.random() > 0.3 ? 'circle' : 'heart';
  const rawSize =
    Math.floor(Math.random() * (shape === 'heart' ? 3 : 4)) +
    (shape === 'heart' ? 5 : 4);
  const size = `${rawSize}px`;
  const initialScale = Math.random() * 0.5 + 0.7;
  const initialRotation = `${Math.random() * 90 - 45}deg`;

  return {
    x,
    y,
    duration,
    delay,
    color,
    size,
    shape,
    initialScale,
    initialRotation,
  };
};

const Interaction = forwardRef<HTMLDivElement, InteractionProps>(({
  id,
  issueId,
  repoOwner,
  repoName,
}, ref) => {
  return <Container ref={ref} />;
};

export default Interaction;
