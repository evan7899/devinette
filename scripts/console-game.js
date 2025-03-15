#!/usr/bin/env node

const readline = require('readline');

// Create interface for stdin/stdout
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Game state
let gameState = {
  targetNumber: Math.floor(Math.random() * 100) + 1,
  guesses: [],
  attemptsLeft: 10,
  message: "Devinez un nombre entre 1 et 100. Vous avez 10 tentatives.",
  gameOver: false,
  win: false
};

// Display game info
const displayGameInfo = () => {
  console.log("\n===== JEU DE DEVINETTE DE NOMBRE - MODE CONSOLE =====\n");
  console.log(gameState.message);
  
  if (gameState.guesses.length > 0) {
    console.log("\nVos estimations : " + gameState.guesses.join(", "));
  }
  
  if (!gameState.gameOver) {
    console.log(`Tentatives restantes : ${gameState.attemptsLeft}\n`);
  }
  
  if (gameState.gameOver) {
    if (gameState.win) {
      console.log(`\nFélicitations ! Votre score est: ${gameState.attemptsLeft * 10}`);
    }
    console.log("\nTapez 'restart' pour recommencer ou 'exit' pour quitter");
  }
};

// Make a guess
const makeGuess = (guess) => {
  if (gameState.gameOver) return;
  
  const parsedGuess = parseInt(guess);
  
  if (isNaN(parsedGuess) || parsedGuess < 1 || parsedGuess > 100) {
    gameState.message = "Veuillez entrer un nombre valide entre 1 et 100.";
    return;
  }
  
  gameState.guesses.push(parsedGuess);
  gameState.attemptsLeft--;
  
  if (parsedGuess === gameState.targetNumber) {
    gameState.message = `Félicitations ! Vous avez deviné le nombre ${gameState.targetNumber} correctement !`;
    gameState.gameOver = true;
    gameState.win = true;
  } else if (gameState.attemptsLeft <= 0) {
    gameState.message = `Partie terminée ! Le nombre était ${gameState.targetNumber}.`;
    gameState.gameOver = true;
  } else if (parsedGuess < gameState.targetNumber) {
    gameState.message = `Le nombre est plus grand que ${parsedGuess}. ${gameState.attemptsLeft} tentatives restantes.`;
  } else {
    gameState.message = `Le nombre est plus petit que ${parsedGuess}. ${gameState.attemptsLeft} tentatives restantes.`;
  }
};

// Reset game
const resetGame = () => {
  gameState = {
    targetNumber: Math.floor(Math.random() * 100) + 1,
    guesses: [],
    attemptsLeft: 10,
    message: "Jeu redémarré ! Devinez un nombre entre 1 et 100. Vous avez 10 tentatives.",
    gameOver: false,
    win: false
  };
};

// Game loop
const gameLoop = () => {
  displayGameInfo();
  
  rl.question('> ', (input) => {
    input = input.trim().toLowerCase();
    
    if (input === 'exit' || input === 'quit') {
      console.log("\nMerci d'avoir joué ! À bientôt !");
      rl.close();
      return;
    }
    
    if (input === 'restart') {
      resetGame();
      gameLoop();
      return;
    }
    
    makeGuess(input);
    gameLoop();
  });
};

// Start game
console.log("\nBienvenue dans le jeu de devinette de nombre !");
console.log("Tapez 'exit' pour quitter ou 'restart' pour recommencer à tout moment.");
gameLoop();