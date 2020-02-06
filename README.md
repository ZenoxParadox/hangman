# Hangman

## Step 1; play around

Play around with the game as a user.

```bash
npm start
```

## Step 2; look at code

Look at the code a bit to get a better idea of how it runs. The application has just one module with a component for each section. It all communicates through a `gameService`.

Old games are stores in the `historyService`, for now this shows only the `WON` games.

In the `/src/models/` folder you will find the classes that keep track of the game. Most important file is `game.model.ts`.

## Step 3; run the tests

Run the tests

```bash
npm test
```

## Misc

Resources used

[style documentation](https://bootswatch.com/slate/)
