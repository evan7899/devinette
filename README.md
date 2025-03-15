
# DevineLe Challenge

## À propos du Projet

DevineLe Challenge est un jeu web interactif qui propose une expérience de devinette de nombres amusante et engageante. Ce projet a été développé avec des technologies modernes pour offrir une interface utilisateur fluide et responsive.

## Fonctionnalités Principales

- **Jeu de Devinette** - Une expérience interactive où vous devez deviner un nombre entre 1 et 100
- **Deux Modes de Jeu** - Interface graphique classique ou mode console avec commandes textuelles
- **Système de Classement** - Enregistrez vos scores et comparez-les avec d'autres joueurs
- **Design Responsive** - Fonctionne parfaitement sur tous les appareils, des téléphones aux ordinateurs
- **Effets Sonores et Visuels** - Une expérience immersive avec animations et feedback visuel

## Technologies Utilisées

- React avec TypeScript
- Tailwind CSS pour le styles
- Animations et transitions pour une expérience fluide
- KaTeX pour le rendu des formules mathématiques

## Comment Utiliser

1. Accédez à la page d'accueil pour commencer à jouer
2. Consultez la page "Règles" pour comprendre le fonctionnement du jeu
3. Visitez le "Classement" pour voir les meilleurs scores

## Mode Console

Pour une expérience alternative, tapez `console run` dans la console de commande sur la page d'accueil pour lancer le mode terminal.

## Diagramme UML des Classes

```
+------------------+         +-----------------+
| GameState        |         | Score           |
+------------------+         +-----------------+
| targetNumber     |         | username        |
| guesses          |         | score           |
| attemptsLeft     |         | date            |
| message          |         +-----------------+
| gameOver         |
| win              |
+------------------+
        ^
        |
        |                    +-----------------+
        |                    | scoreManager    |
        |                    +-----------------+
        |                    | saveScore()     |
        |                    | getScores()     |
+------------------+         | exportScores()  |
| gameLogic        |         | importScores()  |
+------------------+         +-----------------+
| initializeGame() |                 ^
| makeGuess()      |                 |
| renderGameText() |                 |
+------------------+                 |
        ^                            |
        |                            |
        |                            |
+------------------+         +-----------------+
| Game Component   |-------->| ScoreModal      |
+------------------+         +-----------------+
| state: GameState |         | username        |
| handleGuess()    |         | score           |
| handleRestart()  |         | onSave()        |
+------------------+         +-----------------+
        ^
        |
+------------------+
| GameConsole      |
+------------------+
| consoleOutput    |
| handleCommand()  |
+------------------+
```

Profitez du jeu et que la chance soit avec vous !
