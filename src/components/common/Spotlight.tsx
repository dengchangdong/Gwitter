import { motion, SpringOptions, useSpring, useTransform } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';

type SpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
};

export const Spotlight = ({
  className,
  size = 720,
  springOptions = { bounce: 0 },
}: React.PropsWithChildren<SpotlightProps>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        const parentStyle = window.getComputedStyle(parent);
        if (parentStyle.position === 'static') {
          parent.style.position = 'relative';
        }
        parent.style.overflow = 'hidden';
        setParentElement(parent);
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement],
  );

  useEffect(() => {
    if (!parentElement) return;

    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseenter', () => setIsHovered(true));
    parentElement.addEventListener('mouseleave', () => setIsHovered(false));

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      try {
        parentElement.removeEventListener('mouseenter', () =>
          setIsHovered(true),
        );
        parentElement.removeEventListener('mouseleave', () =>
          setIsHovered(false),
        );
      } catch (e) {
        console.warn('Could not remove event listeners from parentElement', e);
      }
    };
  }, [parentElement, handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      className={`absolute pointer-events-none rounded-full blur-md transition-opacity duration-150 ease-in-out ${className || ''}`}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
        backgroundImage:
          'radial-gradient(circle at center, rgba(255, 255, 255, 0.95), rgba(244, 244, 245, 0.8), rgba(228, 228, 231, 0.4), rgba(200, 200, 200, 0.1), transparent 70%)',
        opacity: isHovered ? 0.9 : 0,
      }}
    />
  );
};
