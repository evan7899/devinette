
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getScores, Score } from '@/utils/scoreManager';
import { exportScoresToJSON, exportScoresToPDF } from '@/utils/exportUtils';
import { Home, Trophy, Download, Book, FileText } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Leaderboard = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading from a server
    const timer = setTimeout(() => {
      const loadedScores = getScores();
      setScores(loadedScores);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleExportScores = (format: 'json' | 'pdf') => {
    if (format === 'json') {
      exportScoresToJSON();
    } else {
      exportScoresToPDF();
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary">
      <header className="w-full py-4 px-6 border-b glass">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-foreground">DevineLe</h1>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Challenge</span>
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
          <h2 className="text-4xl font-bold mb-2">Classement</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Les meilleurs joueurs avec les scores les plus élevés. Pouvez-vous les battre ?
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto glass rounded-xl p-6 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Scores Élevés</h3>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center space-x-1"
                  disabled={scores.length === 0}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Exporter les scores
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExportScores('json')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Format JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportScores('pdf')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Format PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto animate-spin" />
              <p className="mt-4 text-muted-foreground">Chargement des scores...</p>
            </div>
          ) : scores.length === 0 ? (
            <div className="py-16 text-center border-2 border-dashed rounded-lg">
              <Trophy className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Pas encore de scores !</h3>
              <p className="text-muted-foreground mb-6">Soyez le premier à établir un score élevé.</p>
              <Button asChild>
                <Link to="/">Jouer Maintenant</Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">#</th>
                    <th className="text-left py-3 px-4">Nom d'utilisateur</th>
                    <th className="text-right py-3 px-4">Score</th>
                    <th className="text-right py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((score, index) => (
                    <tr 
                      key={index} 
                      className={`border-b hover:bg-muted/30 transition-colors ${
                        index === 0 ? 'bg-amber-50 dark:bg-amber-950/20' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        {index === 0 ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                            <Trophy className="h-3 w-3" />
                          </span>
                        ) : (
                          <span className="text-muted-foreground">{index + 1}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-medium">{score.username}</td>
                      <td className="py-3 px-4 text-right font-bold text-primary">{score.score}</td>
                      <td className="py-3 px-4 text-right text-muted-foreground text-sm">
                        {formatDate(score.date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <Button asChild>
              <Link to="/">Rejouer</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <footer className="w-full py-4 border-t text-center text-sm text-muted-foreground">
        <p>Créé pour le Projet Paradigmes de Programmation &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Leaderboard;
