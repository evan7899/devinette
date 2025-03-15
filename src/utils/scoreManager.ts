
export interface Score {
  username: string;
  score: number;
  date: string;
}

// Function to save score to localStorage (for web mode)
export const saveScore = (username: string, score: number): void => {
  // If score is 0, don't save it
  if (score === 0) return;
  
  const newScore: Score = {
    username,
    score,
    date: new Date().toISOString()
  };
  
  // Get existing scores
  const scoresJSON = localStorage.getItem('game-scores');
  let scores: Score[] = scoresJSON ? JSON.parse(scoresJSON) : [];
  
  // Check if this user already has a score
  const existingScoreIndex = scores.findIndex(s => s.username === username);
  
  if (existingScoreIndex !== -1) {
    // If user exists and new score is higher, update it
    if (scores[existingScoreIndex].score < score) {
      scores[existingScoreIndex] = newScore;
    }
  } else {
    // Add new user score
    scores.push(newScore);
  }
  
  // Sort scores (highest first)
  scores.sort((a, b) => b.score - a.score);
  
  // Keep only top 10 scores
  scores = scores.slice(0, 10);
  
  // Save back to localStorage
  localStorage.setItem('game-scores', JSON.stringify(scores));
};

// Function to get all scores
export const getScores = (): Score[] => {
  const scoresJSON = localStorage.getItem('game-scores');
  return scoresJSON ? JSON.parse(scoresJSON) : [];
};

// For console version - these would be used to read/write from a file
// In a web environment, we simulate by using localStorage
export const exportScoresToJSON = (): string => {
  const scores = getScores();
  return JSON.stringify(scores, null, 2);
};

export const importScoresFromJSON = (json: string): void => {
  try {
    const scores = JSON.parse(json);
    localStorage.setItem('game-scores', JSON.stringify(scores));
  } catch (error) {
    console.error('Error importing scores:', error);
  }
};
