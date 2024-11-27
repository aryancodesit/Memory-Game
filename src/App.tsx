import React, { useState, useCallback, useEffect } from 'react';
import { GameBoard } from './components/GameBoard';
import { Controls } from './components/Controls';
import { GameOver } from './components/GameOver';
import { useTimer } from './hooks/useTimer';
import { playSound } from './utils/sounds';
import { tileColors } from './utils/colors';

const INITIAL_TIME = 180; // 3 minutes
const SEQUENCE_DELAY = 600; // Reduced from 1000ms to 600ms
const SEQUENCE_HIGHLIGHT_DURATION = 300; // Half of SEQUENCE_DELAY
const POINTS_PER_LEVEL = 10;

function App() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [score, setScore] = useState(0);
  const [activeTile, setActiveTile] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const { timeLeft, formatTime } = useTimer(INITIAL_TIME, isPlaying);

  useEffect(() => {
    if (timeLeft === 0 && isPlaying) {
      setIsGameOver(true);
      setIsPlaying(false);
    }
  }, [timeLeft, isPlaying]);

  const playSequence = useCallback(async () => {
    setIsPlayerTurn(false);
    for (let i = 0; i < sequence.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, SEQUENCE_DELAY));
      setActiveTile(sequence[i]);
      playSound(sequence[i]);
      await new Promise((resolve) => setTimeout(resolve, SEQUENCE_HIGHLIGHT_DURATION));
      setActiveTile(null);
    }
    setIsPlayerTurn(true);
  }, [sequence]);

  const addToSequence = useCallback(() => {
    const newTile = Math.floor(Math.random() * 16);
    setSequence((prev) => [...prev, newTile]);
  }, []);

  const handleStart = () => {
    setIsPlaying(true);
    setScore(0);
    setSequence([]);
    setPlayerSequence([]);
    setIsGameOver(false);
    addToSequence();
  };

  const handleRestart = () => {
    handleStart();
  };

  const handleTileClick = (index: number) => {
    if (!isPlayerTurn) return;

    playSound(index);
    setActiveTile(index);
    setTimeout(() => setActiveTile(null), SEQUENCE_HIGHLIGHT_DURATION);

    const newPlayerSequence = [...playerSequence, index];
    setPlayerSequence(newPlayerSequence);

    const currentIndex = playerSequence.length;
    if (sequence[currentIndex] !== index) {
      setIsGameOver(true);
      setIsPlaying(false);
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      setScore((prev) => prev + POINTS_PER_LEVEL);
      setPlayerSequence([]);
      setTimeout(() => {
        addToSequence();
      }, SEQUENCE_DELAY);
    }
  };

  useEffect(() => {
    if (sequence.length > 0 && isPlaying) {
      playSequence();
    }
  }, [sequence, isPlaying, playSequence]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Memory Sequence Game</h1>
        <div className="flex justify-center gap-8 text-xl">
          <p>Score: {score}</p>
          <p>Time: {formatTime()}</p>
        </div>
      </div>

      <Controls
        onStart={handleStart}
        onRestart={handleRestart}
        isGameOver={isGameOver}
      />

      <GameBoard
        tiles={tileColors}
        activeTile={activeTile}
        isPlayerTurn={isPlayerTurn}
        onTileClick={handleTileClick}
      />

      {isGameOver && (
        <GameOver score={score} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;