import { Injectable } from "@angular/core";
import { Game } from "./models/game.model";
import { BehaviorSubject, Observable } from "rxjs";
import { Status } from "./models/status.enum";

@Injectable({
  providedIn: "root"
})
export class HistoryService {
  games: BehaviorSubject<Game[]>;

  constructor() {
    this.games = new BehaviorSubject([]);
  }

  getGames(): Observable<Game[]> {
    return this.games.asObservable();
  }

  addGame(game: Game): void {
    const list = this.games.getValue();
    list.push(game);

    this.games.next(list);
  }

  sortGames(gamesIn: Game[]): Game[] {
    return gamesIn
      .filter((item, index, array) => {
        return item.getGameState() === Status.WON;
      })
      .sort((a, b) => {
        return b.getRemainingGuesses() - a.getRemainingGuesses();
      })
      .slice(0, 20);
  }
}
