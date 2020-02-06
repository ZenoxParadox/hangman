import { Game } from "./models/game.model";
import { HistoryService } from "./history.service";

/**
 * Utility method to obtain a certain (result) game.
 *
 * @param secret The secret word to guess
 * @param guesses An array of letters to guess (in order)
 */
const getGame = (secret: string, guesses: string[]): Game => {
  const game = new Game(secret);

  for (let guess of guesses) {
    game.addGuess(guess);
  }

  console.groupEnd();

  game.endGame();
  return game;
};

describe("history service", () => {
  let service: HistoryService;

  beforeEach(() => {
    service = new HistoryService();
  });

  describe("sorting", () => {
    it("should show only wins", () => {
      // assign
      let games: Game[] = [];
      for (let i = 0; i < 50; i++) {
        games[i] = getGame("a", ["v", "w", "x", "y", "z"]); // game is LOST
      }

      // act
      const sorted = service.sortGames(games);

      // assert
      expect(sorted.length).toBe(0);
    });

    it("should limit the results", () => {
      // assign
      let games: Game[] = [];
      for (let i = 0; i < 50; i++) {
        games[i] = getGame("a", ["a"]); // game is WON
      }

      // act
      const sorted = service.sortGames(games);

      // assert
      expect(sorted.length).toBe(20);
    });

    it("should order correctly", () => {
      // assign
      const aGame = getGame("a", ["x", "y", "z", "a"]); // third (3 mistakes)
      const bGame = getGame("b", ["v", "w", "x", "y", "z"]); // will be removed
      const cGame = getGame("c", ["c"]); // first (best)
      const dGame = getGame("d", ["x", "y", "d"]); // second (2 mistakes)

      // act
      const sorted = service.sortGames([aGame, bGame, cGame, dGame]);

      // assert
      expect(sorted[0]).toEqual(cGame);
      expect(sorted[1]).toEqual(dGame);
      expect(sorted[2]).toEqual(aGame);
    });
  });
});
