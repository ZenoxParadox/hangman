import { Status } from "./status.enum";

export const TOTAL_GUESSES: number = 5;

/**
 * Represents the core mechanics of the game
 */
export class Game {
  readonly secret: string;
  private guesses: Set<string>;
  private gameStart: Date;
  private gameEnd: Date;

  constructor(secret: string) {
    this.secret = secret;
    this.guesses = new Set();

    this.gameStart = new Date();
  }

  addGuess(letter: string): void {
    this.guesses.add(letter);
  }

  hasBeenGuessedBefore(letter: string): boolean {
    return this.guesses.has(letter);
  }

  getGuessCount(): number {
    return this.guesses.size;
  }

  endGame(): void {
    if (this.gameEnd) {
      throw new Error("Should only be called once.");
    }

    this.gameEnd = new Date();
  }

  getGameEnd(): Date {
    return this.gameEnd;
  }

  getDuration(): number {
    if (!this.gameEnd) {
      return 0;
    }

    const milliseconds = this.gameEnd.valueOf() - this.gameStart.valueOf();
    return Math.ceil(milliseconds / 1000);
  }

  getRemainingGuesses(): number {
    let guessesLeft = TOTAL_GUESSES;

    for (let guessed of this.guesses) {
      if (!this.isLetterInSecret(guessed)) {
        guessesLeft--;
      }
    }

    return guessesLeft;
  }

  isGameWon(): boolean {
    for (let secretLetter of this.secret) {
      if (!this.guesses.has(secretLetter)) {
        return false;
      }
    }

    return true;
  }

  isGameOver(): boolean {
    if (this.getGameState() == Status.PLAYING) {
      return false;
    }

    return true;
  }

  getGameState(): Status {
    if (this.getRemainingGuesses() <= 0) {
      return Status.LOST;
    }

    if (this.isGameWon()) {
      return Status.WON;
    }

    if (this.gameEnd) {
      return Status.QUIT;
    }

    return Status.PLAYING;
  }

  isLetterInSecret(letter: string): boolean {
    for (let i = 0; i < this.secret.length; i++) {
      const letterOfSecret = this.secret[i];

      if (letter === letterOfSecret) {
        return true;
      }
    }

    return false;
  }
}
