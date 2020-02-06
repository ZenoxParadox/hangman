import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Game } from "./models/game.model";
import { SecretWords } from "./models/secret.words";

@Injectable({
  providedIn: "root"
})
export class GameService {
  private words = new SecretWords();

  private info: BehaviorSubject<Game>;

  constructor() {
    this.info = new BehaviorSubject<Game>(this.createGame());
  }

  private createGame(): Game {
    const randomWord = this.words.getRandom();
    return new Game(randomWord);
  }

  newGame(): void {
    const game = this.createGame();
    this.info.next(game);
  }

  getGameInfo(): Observable<Game> {
    return this.info.asObservable();
  }

  guessLetter(letter: string): void {
    const info = this.info.getValue();
    info.addGuess(letter);

    this.info.next(info);
  }

  isGuessedLetter(letter: string): boolean {
    const info = this.info.getValue();
    return info.hasBeenGuessedBefore(letter);
  }

  isLetterInSecret(letter: string): boolean {
    const info = this.info.getValue();
    return info.isLetterInSecret(letter);
  }
}
