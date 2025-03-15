
import React, { useState, useEffect, useRef } from 'react';
import { GameState, initializeGame, makeGuess } from '@/utils/gameLogic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface GameProps {
  onGameOver: (score: number) => void;
}

const Game: React.FC<GameProps> = ({ onGameOver }) => {
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [isPaused, setIsPaused] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const gameOverSoundPlayed = useRef(false);
  
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
          console.log('Audio play prevented by browser:', error);
        });
      }
    }
  }, [isPaused, gameState.gameOver]);
  
  // Handle win/loss sounds - but only play them once
  useEffect(() => {
    if (gameState.gameOver && !gameOverSoundPlayed.current) {
      let soundUrl = gameState.win
        ? 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443c.mp3?filename=success-1-6297.mp3'
        : 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=wah-wah-sad-trombone-6347.mp3';
      
      const gameOverSound = new Audio(soundUrl);
      gameOverSound.volume = 0.5;
      gameOverSound.play().catch(error => {
        console.log('Game over sound prevented:', error);
      });
      
      // Mark that we've played the sound so we don't play it again
      gameOverSoundPlayed.current = true;
      
      // Calculate score based on remaining attempts and notify parent
      const score = gameState.win ? gameState.attemptsLeft * 10 : 0;
      onGameOver(score);
    }
  }, [gameState.gameOver, gameState.win, gameState.attemptsLeft, onGameOver]);
  
  // Reset the sound played flag when we restart the game
  const handleRestart = () => {
    setGameState(initializeGame());
    setCurrentGuess("");
    setIsPaused(false);
    gameOverSoundPlayed.current = false;
    
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log(e));
    }
  };
  
  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameState.gameOver || isPaused) return;
    
    const guess = parseInt(currentGuess);
    const newState = makeGuess(gameState, guess);
    setGameState(newState);
    setCurrentGuess("");
    
    // Show toast for feedback
    if (newState.message !== gameState.message) {
      if (newState.win) {
        toast.success(newState.message);
      } else if (newState.gameOver) {
        toast.error(newState.message);
      } else {
        toast.info(newState.message);
      }
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-6 glass rounded-2xl animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Devinez le Nombre</h2>
        <p className="text-muted-foreground">{gameState.message}</p>
      </div>
      
      {!gameState.gameOver && (
        <form onSubmit={handleGuessSubmit} className="space-y-4">
          <div>
            <Input
              type="number"
              min="1"
              max="100"
              value={currentGuess}
              onChange={(e) => setCurrentGuess(e.target.value)}
              placeholder="Entrez votre estimation (1-100)"
              className="w-full"
              disabled={isPaused || gameState.gameOver}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button 
              type="submit" 
              disabled={isPaused || gameState.gameOver || !currentGuess}
              className="w-full"
            >
              Valider
            </Button>
            
            <Button 
              type="button"
              variant="outline" 
              onClick={() => setIsPaused(!isPaused)}
              disabled={gameState.gameOver}
              className="w-auto"
            >
              {isPaused ? 'Reprendre' : 'Pause'}
            </Button>
          </div>
        </form>
      )}
      
      {gameState.guesses.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium">Vos estimations :</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {gameState.guesses.map((guess, index) => (
              <span 
                key={index} 
                className="inline-block px-3 py-1 rounded-full bg-muted text-sm"
              >
                {guess}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {!gameState.gameOver && (
        <div className="mt-6">
          <div className="w-full bg-muted rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full" 
              style={{ width: `${(gameState.attemptsLeft / 10) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-center mt-2">
            {gameState.attemptsLeft} tentatives restantes
          </p>
        </div>
      )}
      
      {gameState.gameOver && (
        <Button onClick={handleRestart} className="w-full mt-6">
          Rejouer
        </Button>
      )}
    </div>
  );
};

export default Game;
