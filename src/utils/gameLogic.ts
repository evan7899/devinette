
export interface GameState {
  targetNumber: number;
  guesses: number[];
  attemptsLeft: number;
  message: string;
  gameOver: boolean;
  win: boolean;
}

export const initializeGame = (): GameState => {
  // Generate random number between 1 and 100
  const targetNumber = Math.floor(Math.random() * 100) + 1;
  
  return {
    targetNumber,
    guesses: [],
    attemptsLeft: 10,
    message: "Devinez un nombre entre 1 et 100. Vous avez 10 tentatives.",
    gameOver: false,
    win: false
  };
};

export const makeGuess = (state: GameState, guess: number): GameState => {
  if (state.gameOver) return state;
  if (isNaN(guess) || guess < 1 || guess > 100) {
    return {
      ...state,
      message: "Veuillez entrer un nombre valide entre 1 et 100."
    };
  }
  
  const newGuesses = [...state.guesses, guess];
  const newAttemptsLeft = state.attemptsLeft - 1;
  
  let message = "";
  let gameOver = false;
  let win = false;
  
  if (guess === state.targetNumber) {
    message = `Félicitations ! Vous avez deviné le nombre ${state.targetNumber} correctement !`;
    gameOver = true;
    win = true;
  } else if (newAttemptsLeft <= 0) {
    message = `Partie terminée ! Le nombre était ${state.targetNumber}.`;
    gameOver = true;
  } else if (guess < state.targetNumber) {
    message = `Le nombre est plus grand que ${guess}. ${newAttemptsLeft} tentatives restantes.`;
  } else {
    message = `Le nombre est plus petit que ${guess}. ${newAttemptsLeft} tentatives restantes.`;
  }
  
  return {
    ...state,
    guesses: newGuesses,
    attemptsLeft: newAttemptsLeft,
    message,
    gameOver,
    win
  };
};

export const renderGameAsText = (gameState: GameState): string => {
  let output = "=== JEU DE DEVINETTE DE NOMBRE ===\n\n";
  
  output += `${gameState.message}\n\n`;
  
  if (gameState.guesses.length > 0) {
    output += "Vos estimations : " + gameState.guesses.join(", ") + "\n";
  }
  
  if (!gameState.gameOver) {
    output += `Tentatives restantes : ${gameState.attemptsLeft}\n`;
  }
  
  return output;
};
