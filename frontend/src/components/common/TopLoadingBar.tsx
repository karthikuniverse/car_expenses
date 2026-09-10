import React from 'react';
import { useLoadingProgress } from '../../utils/loadingManager';

export const TopLoadingBar: React.FC = () => {
  const { isLoading, progress } = useLoadingProgress();

  if (!isLoading && progress === 0) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[999999] pointer-events-none overflow-hidden"
      style={{
        opacity: isLoading || progress > 0 ? 1 : 0,
        transition: 'opacity 300ms ease-in-out',
      }}
    >
      <div
        className="h-full bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 relative"
        style={{
          width: `${progress}%`,
          transition: progress === 100 ? 'width 150ms ease-out' : 'width 250ms ease-out',
          boxShadow: '0 0 10px rgba(79, 70, 229, 0.7), 0 0 5px rgba(59, 130, 246, 0.5)',
        }}
      >
        {/* Glowing tip at the front edge */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-white/30 blur-[2px]" />
      </div>
    </div>
  );
};
