import React, { useEffect, useRef } from 'react';

interface TileProps {
  color: string;
  isActive: boolean;
  onClick: () => void;
}

export const Tile: React.FC<TileProps> = ({ color, isActive, onClick }) => {
  const tileRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isActive && tileRef.current) {
      tileRef.current.classList.remove('active');
      // Force a reflow to restart the animation
      void tileRef.current.offsetWidth;
      tileRef.current.classList.add('active');
    }
  }, [isActive]);

  return (
    <button
      ref={tileRef}
      onClick={onClick}
      className={`game-tile ${isActive ? 'active' : ''}`}
      style={{ backgroundColor: color }}
    />
  );
};