import React from 'react';
import { Tile } from './Tile';

interface GameBoardProps {
  tiles: string[];
  activeTile: number | null;
  isPlayerTurn: boolean;
  onTileClick: (index: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  tiles,
  activeTile,
  isPlayerTurn,
  onTileClick,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 w-full max-w-2xl aspect-square">
      {tiles.map((color, index) => (
        <Tile
          key={index}
          color={color}
          isActive={activeTile === index}
          onClick={() => isPlayerTurn && onTileClick(index)}
        />
      ))}
    </div>
  );
};