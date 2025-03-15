
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Game from '@/components/Game';
import ScoreModal from '@/components/ScoreModal';
import { Trophy, Home, Terminal, Book } from 'lucide-react';
import { toast } from 'sonner';
import { initializeGame, makeGuess } from '@/utils/gameLogic';

const Index = () => {
  const [score, setScore] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [command, setCommand] = useState('');
  const [showConsole, setShowConsole] = useState(false);
  
  const handleGameOver = (finalScore: number) => {
    setScore(finalScore);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setScore(null);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if the command is to run the console version
    if (command.toLowerCase() === 'console run' || command.toLowerCase() === 'run console') {
      setShowConsole(true);
      toast.success('Mode console activé !');
    } else {
      toast.error('Commande inconnue. Essayez "console run" pour lancer le mode console.');
    }
    
    setCommand('');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary">
      <header className="w-full py-4 px-6 border-b glass">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
          </div>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="flex items-center space-x-1">
                <Home className="h-4 w-4" />
                <span>Accueil</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/rules" className="flex items-center space-x-1">
                <Book className="h-4 w-4" />
                <span>Règles</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/leaderboard" className="flex items-center space-x-1">
                <Trophy className="h-4 w-4" />
                <span>Classement</span>
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 page-transition">
        <div className="text-center mb-8 animate-slide-down">
          <h2 className="text-4xl font-bold mb-2">Jeu de Devinette de Nombre</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Essayez de deviner un nombre entre 1 et 100. Vous avez 10 tentatives.
            Après chaque tentative, vous recevrez un indice si le nombre est plus grand ou plus petit.
          </p>
        </div>
        
        {!showConsole ? (
          <>
            <div className="max-w-4xl mx-auto">
              <Game onGameOver={handleGameOver} />
            </div>
            
            <div className="max-w-md mx-auto mt-8">
              <form onSubmit={handleCommandSubmit} className="flex items-center space-x-2">
                <div className="flex items-center flex-1 px-3 py-2 border rounded-md bg-background/70">
                  <Terminal className="h-4 w-4 text-muted-foreground mr-2" />
                  <Input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    placeholder="Tapez 'console run' pour lancer le mode console"
                    className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <Button type="submit" size="sm">
                  Exécuter
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Mode Console</h3>
              <Button variant="outline" size="sm" onClick={() => setShowConsole(false)}>
                Quitter la Console
              </Button>
            </div>
            <div className="bg-black text-green-400 font-mono p-4 rounded-md">
              <div className="mb-4">
                <p>===== JEU DE DEVINETTE DE NOMBRE - MODE CONSOLE =====</p>
                <p>Tapez un nombre entre 1 et 100 et appuyez sur Entrée.</p>
                <p>Tapez 'restart' pour recommencer ou 'exit' pour revenir au mode web.</p>
              </div>
              
              <div className="mt-4">
                <ConsoleGameInterface onGameOver={handleGameOver} onExit={() => setShowConsole(false)} />
              </div>
            </div>
          </div>
        )}
      </main>
      
      {showModal && score !== null && (
        <ScoreModal score={score} onClose={handleCloseModal} />
      )}
    </div>
  );
};

// New component for the console interface
const ConsoleGameInterface = ({ onGameOver, onExit }: { onGameOver: (score: number) => void; onExit: () => void }) => {
  const [gameState, setGameState] = useState(initializeGame());
  const [input, setInput] = useState('');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    "Jeu démarré ! Devinez un nombre entre 1 et 100."
  ]);
  
  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Handle special commands
    if (input.toLowerCase() === 'exit') {
      onExit();
      return;
    }
    
    if (input.toLowerCase() === 'restart') {
      setGameState(initializeGame());
      setConsoleOutput(["Jeu redémarré ! Devinez un nombre entre 1 et 100."]);
      setInput('');
      return;
    }
    
    // Process number guess
    const guess = parseInt(input);
    
    if (isNaN(guess)) {
      setConsoleOutput([...consoleOutput, `> ${input}`, "Entrée invalide. Veuillez entrer un nombre entre 1 et 100."]);
    } else {
      const newState = makeGuess(gameState, guess);
      setGameState(newState);
      
      // Add input and response to console output
      setConsoleOutput([
        ...consoleOutput, 
        `> ${input}`, 
        newState.message
      ]);
      
      // Handle game over
      if (newState.gameOver) {
        const score = newState.win ? newState.attemptsLeft * 10 : 0;
        onGameOver(score);
      }
    }
    
    setInput('');
  };
  
  return (
    <div>
      <div className="console-output h-64 overflow-y-auto mb-4">
        {consoleOutput.map((line, index) => (
          <div key={index} className={line.startsWith('>') ? 'text-yellow-400' : ''}>
            {line}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleInputSubmit} className="flex space-x-2">
        <span className="text-yellow-400">{'>'}</span>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none text-green-400 focus-visible:ring-0 focus-visible:ring-offset-0"
          autoFocus
        />
      </form>
    </div>
  );
};

// Import the makeGuess function

export default Index;
