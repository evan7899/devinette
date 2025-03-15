
## À propos du Projet

c'est pas trop beaucoup super facile React monsieur, mais j'ai le latex en cuire alors ça va !

## Fonctionnalités Principales

- **Jeu de Devinette** - Une expérience interactive où vous devez deviner un nombre entre 1 et 100
- **Deux Modes de Jeu** - Interface graphique classique ou mode console avec commandes textuelles
- **Système de Classement** - Enregistrez vos scores et comparez-les avec d'autres joueurs
- **Design Responsive** - Fonctionne parfaitement sur tous les appareils, des téléphones aux ordinateurs

## Technologies Utilisées

- React avec TypeScript
- Tailwind CSS pour le style
- KaTeX pour le rendu des formules mathématiques

## Comment Utiliser

1. Accédez à la page d'accueil pour commencer à jouer
2. Consultez la page "Règles" pour comprendre le fonctionnement du jeu
3. Visitez le "Classement" pour voir les meilleurs scores

## Mode Console

### Mode Console Web
Pour une expérience alternative dans le navigateur, tapez `console run` dans la console de commande sur la page d'accueil pour lancer le mode terminal.

### Mode Console Local
Vous pouvez également jouer au jeu directement depuis votre terminal local en suivant ces étapes :

1. Assurez-vous d'avoir Node.js installé sur votre machine
3. Installez les dépendances : `npm install` ou `yarn install`
4. Lancez le jeu en mode console : `npm run console` ou `yarn console`

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

## Exports et Documents

Le jeu permet d'exporter :
- Les règles du jeu au format JSON, PDF ou LaTeX
- Le tableau des scores au format JSON ou PDF

---

Profitez du jeu et que la chance soit avec vous !