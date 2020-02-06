import { Component, OnInit } from "@angular/core";
import { GameService } from "../game.service";
import { Game } from "../models/game.model";
import { HANGMANS } from "../models/hangman.model";

@Component({
  selector: "app-canvas",
  templateUrl: "./canvas.component.html"
})
export class CanvasComponent implements OnInit {
  status: string;

  game: Game;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.getGameInfo().subscribe(game => {
      this.status = game.secret;

      this.game = game;
    });
  }

  getHangman(game: Game): string {
    return HANGMANS[game.getRemainingGuesses()];
  }
}
