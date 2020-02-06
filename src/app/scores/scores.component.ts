import { Component, OnInit } from "@angular/core";
import { Game } from "../models/game.model";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { HistoryService } from "../history.service";

@Component({
  selector: "app-scores",
  templateUrl: "./scores.component.html",
  styleUrls: ["./scores.component.scss"]
})
export class ScoresComponent implements OnInit {
  games: Game[];

  constructor(
    public modal: NgbActiveModal,
    private historyService: HistoryService
  ) {}

  ngOnInit() {
    this.historyService.getGames().subscribe(games => {
      // sort the games
      const sortedGames = this.historyService.sortGames(games);
      this.games = sortedGames;
    });
  }
}
