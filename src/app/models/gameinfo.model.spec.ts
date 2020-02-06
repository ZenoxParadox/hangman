import { Game } from "./game.model";
import { Status } from "./status.enum";
import { fakeAsync, tick } from "@angular/core/testing";

describe("game info model", () => {
  beforeEach(() => {
    // -
  });

  afterEach(() => {
    // -
  });

  describe("initialization", () => {
    it("correct game status", () => {
      // assign
      const game = new Game("example");

      // act
      // -

      // assert
      expect(game.getGameState()).toBe(Status.PLAYING);
    });

    it("correct remaining guesses", () => {
      // assign
      const game = new Game("example");

      // act
      // -

      // assert
      expect(game.getRemainingGuesses()).toBe(5);
    });

    it("must have no made guesses", () => {
      // assign
      const game = new Game("example");

      // act
      // -

      // assert
      expect(game.getGuessCount()).toBe(0);
    });

    it("must not have remaining time while still playing", () => {
      // assign
      const game = new Game("example");

      // act
      // -

      // assert
      expect(game.getGameState()).toBe(Status.PLAYING);
      expect(game.getDuration()).toBe(0);
    });

    it("must not have an end time", () => {
      // assign
      const game = new Game("example");

      // act
      // -

      // assert
      expect(game.getGameEnd()).toBeFalsy();
    });
  });

  describe("basic game mechanics", () => {
    it("correctly inform that letter has been used before", () => {
      // assign
      const game = new Game("example");

      // assert
      expect(game.hasBeenGuessedBefore("a")).toBeFalsy();
      expect(game.hasBeenGuessedBefore("b")).toBeFalsy();

      // act
      game.addGuess("a");

      // assert
      expect(game.hasBeenGuessedBefore("a")).toBeTruthy();
      expect(game.hasBeenGuessedBefore("b")).toBeFalsy();
    });

    it("correctly inform that letter is not part of the secret", () => {
      // assign
      const game = new Game("example");

      // act
      // -

      // assert
      expect(game.isLetterInSecret("e")).toBeTruthy();
      expect(game.isLetterInSecret("b")).toBeFalsy();
    });

    it("correctly manage made guesses (when using successful guess)", () => {
      // assign
      const game = new Game("example");

      // act
      game.addGuess("e"); // letter is not in secret

      // assert
      expect(game.getGuessCount()).toBe(1);
    });

    it("correctly manage made guesses (when using wrong guess)", () => {
      // assign
      const game = new Game("example");

      // act
      game.addGuess("b"); // letter is not in secret

      // assert
      expect(game.getGuessCount()).toBe(1);
    });

    it("correctly manage remaining guesses", () => {
      // assign
      const game = new Game("example");

      // act
      game.addGuess("b"); // letter is not in secret

      // assert
      expect(game.getRemainingGuesses()).toBe(4);
    });
  });

  describe("quitting the game prematurely", () => {
    it("it should manage all the quit states correctly", () => {
      // assign
      const game = new Game("example");

      // act
      game.endGame();

      // assert
      expect(game.getGameState()).toBe(Status.QUIT);
      expect(game.isGameOver()).toBeTruthy();
      expect(game.isGameWon()).toBeFalsy();
    });

    it("it should throw an exception when trying to end twice", () => {
      // assign
      const game = new Game("example");

      // act
      game.endGame();

      // assert
      expect(game.getGameState()).toBe(Status.QUIT);
      expect(() => game.endGame()).toThrowError("Should only be called once.");
    });
  });

  describe("game progress status", () => {
    it("must count down remaining guesses correctly", () => {
      // assign
      const game = new Game("example");

      // assert
      expect(game.getRemainingGuesses()).toBe(5);

      // act
      game.addGuess("a"); // no change

      // assert
      expect(game.getRemainingGuesses()).toBe(5);

      // act
      game.addGuess("b"); // -1

      // assert
      expect(game.getRemainingGuesses()).toBe(4);

      // act
      game.addGuess("c"); // -1

      // assert
      expect(game.getRemainingGuesses()).toBe(3);

      // act
      game.addGuess("d"); // -1

      // assert
      expect(game.getRemainingGuesses()).toBe(2);

      // act
      game.addGuess("e"); // no change

      // assert
      expect(game.getRemainingGuesses()).toBe(2);

      // act
      game.addGuess("f"); // -1

      // assert
      expect(game.getRemainingGuesses()).toBe(1);

      // act
      game.addGuess("g"); // -1

      // assert
      expect(game.getRemainingGuesses()).toBe(0);
    });

    it("must correctly end the game in LOST", () => {
      // assign
      const game = new Game("example");

      // act
      game.addGuess("a");
      game.addGuess("b");
      game.addGuess("c");
      game.addGuess("d");
      game.addGuess("e");
      game.addGuess("f");

      // assert
      expect(game.isGameOver()).toBeFalsy();
      expect(game.getGameState()).toBe(Status.PLAYING);

      // act
      game.addGuess("g");

      // assert
      expect(game.isGameOver()).toBeTruthy();
      expect(game.getGameState()).toBe(Status.LOST);
    });

    it("must correctly end the game in WON", () => {
      // assign
      const game = new Game("example");

      // act
      game.addGuess("e");
      game.addGuess("a");
      game.addGuess("m");
      game.addGuess("p");
      game.addGuess("l");

      // assert
      expect(game.isGameOver()).toBeFalsy();
      expect(game.getGameState()).toBe(Status.PLAYING);

      // act
      game.addGuess("x");

      // assert
      expect(game.isGameOver()).toBeTruthy();
      expect(game.getGameState()).toBe(Status.WON);
    });

    /**
     * NOTE: 1.000.000 millisecons === 1000 seconds
     */
    it("must only have duration when the game has ended", fakeAsync(() => {
      // assign
      const game = new Game("example");

      // assert
      expect(game.getGameEnd()).toBeUndefined();
      expect(game.getDuration()).toBe(0);

      // act
      tick(1_000_000); // milliseconds
      game.endGame();

      // assert
      expect(game.getGameEnd()).toBeTruthy();
      expect(game.getDuration()).toBe(1000); // seconds
    }));
  });
});
