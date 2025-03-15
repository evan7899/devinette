
import React, { useState, useEffect, useRef } from 'react';
import { GameState, initializeGame, makeGuess, renderGameAsText } from '@/utils/gameLogic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface GameConsoleProps {
  onGameOver: (score: number) => void;
}

const GameConsole: React.FC<GameConsoleProps> = ({ onGameOver }) => {
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [isPaused, setIsPaused] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const consoleRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Audio setup
  useEffect(() => {
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0d394246c.mp3?filename=electronic-future-beats-117997.mp3');
    audio.loop = true;
    audio.volume = 0.2;
    audioRef.current = audio;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Sound based on game state
  useEffect(() => {
    if (audioRef.current) {
      if (isPaused || gameState.gameOver) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log('Audio play prevented by browser policy:', error);
        });
      }
    }
  }, [isPaused, gameState.gameOver]);
  
  // Update console output
  useEffect(() => {
    const gameText = renderGameAsText(gameState);
    const output = [
      "=== CONSOLE MODE ===",
      `${isPaused ? "[PAUSED]" : ""}`,
      "",
      gameText,
      "",
      "Enter a number between 1 and 100 and press Enter.",
      ""
    ];
    
    setConsoleOutput(output);
    
    // Scroll to bottom
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [gameState, isPaused]);
  
  // Handle win/loss sounds
  useEffect(() => {
    if (gameState.gameOver) {
      let soundUrl = gameState.win
        ? 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443c.mp3?filename=success-1-6297.mp3'
        : 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=wah-wah-sad-trombone-6347.mp3';
      
      const gameOverSound = new Audio(soundUrl);
      gameOverSound.volume = 0.5;
      gameOverSound.play().catch(error => {
        console.log('Game over sound prevented:', error);
      });
      
      // Calculate score based on remaining attempts and notify parent
      const score = gameState.win ? gameState.attemptsLeft * 10 : 0;
      onGameOver(score);
    }
  }, [gameState.gameOver, gameState.win, gameState.attemptsLeft, onGameOver]);
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.gameOver) {
        if (e.key.toLowerCase() === 'r') {
          handleRestart();
        }
        return;
      }
      
      if (isPaused && e.key !== ' ') return;
      
      if (e.key === ' ') {
        setIsPaused(p => !p);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.gameOver, isPaused]);
  
  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameState.gameOver || isPaused) return;
    
    const guess = parseInt(currentGuess);
    setGameState(prevState => makeGuess(prevState, guess));
    setCurrentGuess("");
  };
  
  const handleRestart = () => {
    setGameState(initializeGame());
    setCurrentGuess("");
    setIsPaused(false);
    
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log(e));
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <div className="console-container font-mono text-sm mb-4" ref={consoleRef}>
        {consoleOutput.map((line, index) => (
          <div key={index} className="console-line">
            {line}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleGuessSubmit} className="flex space-x-2">
        <Input
          type="number"
          min="1"
          max="100"
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
          placeholder="Enter your guess (1-100)"
          disabled={isPaused || gameState.gameOver}
          className="flex-1"
        />
        <Button 
          type="submit" 
          disabled={isPaused || gameState.gameOver || !currentGuess}
        >
          Guess
        </Button>
      </form>
      
      <div className="mt-4 flex space-x-3 justify-center">
        <Button 
          onClick={handleRestart}
          variant="outline"
          className="mx-2"
        >
          Restart Game
        </Button>
        <Button 
          onClick={() => setIsPaused(!isPaused)}
          disabled={gameState.gameOver}
          variant="outline"
          className="mx-2"
        >
          {isPaused ? 'Resume Game' : 'Pause Game'}
        </Button>
      </div>
    </div>
  );
};

export default GameConsole;
