import { Component, OnInit } from "@angular/core";
import { GameService } from "./game.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EndComponent } from "./end/end.component";
import { Game } from "./models/game.model";
import { ScoresComponent } from "./scores/scores.component";
import { HistoryService } from "./history.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  guessesLeft: number;

  notified: boolean = false;

  constructor(
    private gameService: GameService,
    private historyService: HistoryService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.gameService.getGameInfo().subscribe(game => {
      this.guessesLeft = game.getRemainingGuesses();

      // notify once about the end
      if (!this.notified && game.isGameOver()) {
        this.notifyEnd(game);
      }
    });
  }

  newGame(): void {
    this.gameService.newGame();
    this.notified = false;
  }

  showScores(): void {
    this.modalService.open(ScoresComponent, {
      centered: true,
      size: "xl"
    });
  }

  private notifyEnd(game: Game): void {
    // Add the game to the history service
    game.endGame();
    this.historyService.addGame(game);

    // Show the notificaiton
    this.notified = true;
    const modalRef = this.modalService.open(EndComponent, {
      centered: true
    });
    modalRef.componentInstance.game = game;
  }
}
