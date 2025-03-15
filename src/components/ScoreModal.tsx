
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { saveScore } from '@/utils/scoreManager';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface ScoreModalProps {
  score: number;
  onClose: () => void;
}

const ScoreModal: React.FC<ScoreModalProps> = ({ score, onClose }) => {
  const [username, setUsername] = useState('');
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    if (!username.trim()) {
      toast.error('Veuillez entrer un nom d\'utilisateur');
      return;
    }
    
    // Only save if score is greater than 0
    if (score > 0) {
      saveScore(username, score);
      setSaved(true);
      toast.success('Score enregistré avec succès !');
    } else {
      onClose();
    }
  };
  
  const handleDontSave = () => {
    // Simply close the modal without saving or playing any sound
    onClose();
  };
  
  const handlePlayAgain = () => {
    // Simply close the modal which will trigger a new game
    onClose();
  };
  
  // If score is 0, don't show save options
  const shouldShowSaveOptions = score > 0;
  
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card border rounded-xl shadow-lg max-w-md w-full p-6 animate-slide-up">
        <h2 className="text-2xl font-bold mb-2">Partie terminée !</h2>
        
        {!saved ? (
          <>
            <p className="text-xl mb-6">
              Votre score final : <span className="text-primary font-bold">{score}</span>
              {score === 0 && " (Pas de points pour les réponses incorrectes)"}
            </p>
            
            {shouldShowSaveOptions ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Entrez votre nom d'utilisateur pour enregistrer votre score :</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nom d'utilisateur"
                    maxLength={15}
                    className="w-full"
                  />
                </div>
                
                <div className="flex space-x-3 justify-end">
                  <Button variant="outline" onClick={handleDontSave}>
                    Ne pas enregistrer
                  </Button>
                  <Button onClick={handleSave}>
                    Enregistrer le score
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-end mt-4">
                <Button onClick={handlePlayAgain}>
                  Rejouer
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            <p className="text-green-600 font-medium mb-4">
              Score enregistré avec succès !
            </p>
            <p className="mb-6">
              Nom d'utilisateur : <span className="font-medium">{username}</span><br />
              Score : <span className="text-primary font-bold">{score}</span>
            </p>
            
            <div className="flex space-x-3 justify-end">
              <Button variant="outline" onClick={handlePlayAgain}>
                Rejouer
              </Button>
              <Button asChild>
                <Link to="/leaderboard">
                  Voir le classement
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScoreModal;
