import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tiltAmount?: number;
  glowColor?: string;
  disabledTilt?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  onClick,
  tiltAmount = 14,
  glowColor = 'rgba(59, 130, 246, 0.25)',
  disabledTilt = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Framer Motion spring physics for 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Map mouse coordinates (0 to 1) to tilt angles (-tiltAmount to +tiltAmount)
  const rotateXTarget = useTransform(mouseY, [0, 1], [tiltAmount, -tiltAmount]);
  const rotateYTarget = useTransform(mouseX, [0, 1], [-tiltAmount, tiltAmount]);

  // Apply spring physics for natural elastic physical feel
  const rotateX = useSpring(rotateXTarget, { stiffness: 350, damping: 25 });
  const rotateY = useSpring(rotateYTarget, { stiffness: 350, damping: 25 });

  // Glare position
  const glareX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(mouseY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabledTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseEnter = () => {
    if (!disabledTilt) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  if (disabledTilt) {
    return (
      <div onClick={onClick} className={`relative rounded-2xl w-full min-w-0 max-w-full ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className="relative w-full min-w-0 max-w-full [perspective:1000px]">
      <motion.div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        whileHover={{ scale: 1.025, z: 15 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={`relative rounded-2xl cursor-pointer select-none w-full min-w-0 max-w-full transition-shadow duration-300 ${className}`}
      >
        {/* Glow backdrop shadow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300 z-0"
          style={{
            boxShadow: isHovered
              ? `0 20px 40px -10px ${glowColor}, 0 0 30px 2px ${glowColor}`
              : '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
          }}
        />

        {/* 3D Specular Light Glare Sheen Overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-30"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255, 255, 255, 0.4) 0%, transparent 65%)`,
            mixBlendMode: 'overlay'
          }}
        />

        {/* Card Body Content with 3D Layering */}
        <div
          className="relative z-10 w-full h-full min-w-0 max-w-full overflow-hidden rounded-2xl"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};

