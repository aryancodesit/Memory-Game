import React from 'react';
import { Play, RefreshCw, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ControlsProps {
  onStart: () => void;
  onRestart: () => void;
  isGameOver: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  onStart,
  onRestart,
  isGameOver,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex gap-4 my-4">
      <button onClick={onStart} className="btn-primary">
        <Play className="w-4 h-4 mr-2" />
        Start
      </button>
      <button
        onClick={onRestart}
        disabled={!isGameOver}
        className="btn-secondary"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Restart
      </button>
      <button onClick={toggleTheme} className="btn-secondary">
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 mr-2" />
        ) : (
          <Moon className="w-4 h-4 mr-2" />
        )}
        Theme
      </button>
    </div>
  );
};