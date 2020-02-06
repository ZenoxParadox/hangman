import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Game } from "../models/game.model";
import { Status } from "../models/status.enum";

@Component({
  selector: "app-end",
  templateUrl: "./end.component.html"
})
export class EndComponent implements OnInit {
  title: string;
  message: string;

  @Input() game: Game;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    const state = this.game.getGameState();

    if (state == Status.WON) {
      this.title = "Congratulations";
      this.message = "You won the game!";
    } else if (state == Status.LOST) {
      this.title = "Too bad :(";
      this.message = `You did not guess the secret word (was ${this.game.secret}). Better luck next time!`;
    }
  }
}
