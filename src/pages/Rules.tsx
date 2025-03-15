import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Home, Trophy, Book, Download, FileText } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { exportRulesToJSON, exportRulesToPDF, generateLaTeXRules } from '@/utils/exportUtils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Rules = () => {
  const handleExportRules = (format: 'json' | 'pdf' | 'latex') => {
    if (format === 'json') {
      exportRulesToJSON();
    } else if (format === 'pdf') {
      exportRulesToPDF();
    } else {
      generateLaTeXRules();
    }
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
          <h2 className="text-4xl font-bold mb-2">Un jeu de devinette de nombre</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez les règles et le fonctionnement du jeu de devinette de nombre
          </p>
        </div>
        
        <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Présentation du Jeu</h3>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center space-x-1"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Exporter les règles
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExportRules('json')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Format JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportRules('pdf')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Format PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportRules('latex')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Format LaTeX
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="bg-secondary/40 p-4 rounded-md text-center mb-6">
            <BlockMath math={`\\boxed{\\begin{array}{c}\\textbf{Un jeu de devinette de nombre} \\\\\\text{Simple et amusant} \\\\\\end{array}}`} />
          </div>
          
          <h3 className="text-2xl font-bold mb-4">Règles du Jeu</h3>
          <p className="mb-4">Le jeu est basé sur des règles simples mais attrayantes :</p>
          
          <div className="bg-secondary/40 p-4 rounded-md mb-6">
            <BlockMath math={`\\begin{cases}\\text{Objectif} & \\text{Deviner un nombre entre 1 et 100} \\\\\\text{Tentatives} & \\text{Maximum de 10 essais} \\\\\\text{Points} & \\text{Score = Tentatives restantes} \\times 10 \\\\\\text{Victoire} & \\text{Trouver le nombre exact} \\\\\\text{Défaite} & \\text{Épuiser les 10 tentatives}\\end{cases}`} />
          </div>
          
          <h3 className="text-2xl font-bold mb-4">Formule Mathématique du Score</h3>
          <p className="mb-4">Le score final est calculé selon la formule suivante :</p>
          
          <div className="bg-secondary/40 p-4 rounded-md mb-6">
            <BlockMath math={`Score = \\begin{cases}\\text{Tentatives restantes} \\times 10, & \\text{si victoire} \\\\0, & \\text{si défaite}\\end{cases}`} />
          </div>
          
          <h3 className="text-2xl font-bold mb-4">Fonctionnalités</h3>
          <div className="space-y-4">            
            <div>
              <h4 className="text-xl font-semibold">Mode Console</h4>
              <ul className="list-disc list-inside ml-4">
                <li>Expérience de jeu alternative dans un terminal simulé</li>
                <li>Commandes textuelles simples</li>
                <li>Accessible en tapant <code>console run</code> dans la console de commande</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold">Système de Score</h4>
              <ul className="list-disc list-inside ml-4">
                <li>Calcul automatique des points basé sur les tentatives restantes</li>
                <li>Sauvegarde des meilleurs scores avec nom d'utilisateur</li>
                <li>Tableau de classement des meilleurs joueurs</li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <h3 className="text-2xl font-bold mb-4">Équation Bonus</h3>
          <p className="mb-4">Pour les passionnés de mathématiques, voici une équation intéressante :</p>
          
          <div className="bg-secondary/40 p-4 rounded-md text-center">
            <BlockMath math={`\\oint_{\\partial\\Omega} \\mathbf{E} \\cdot d\\mathbf{l} = -\\frac{d}{dt}\\int_{\\Omega} \\mathbf{B} \\cdot d\\mathbf{S}`} />
          </div>
        </div>
        
        <div className="text-center">
          <Button asChild className="mx-auto">
            <Link to="/">Commencer à jouer</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Rules;
