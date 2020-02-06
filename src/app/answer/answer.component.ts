import { Component, OnInit } from "@angular/core";
import { GameService } from "../game.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-answer",
  templateUrl: "./answer.component.html"
})
export class AnswerComponent implements OnInit {
  secret: string;

  letters: Array<string>;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.getGameInfo().subscribe(info => {
      this.secret = info.secret;

      this.letters = new Array();
      this.secret.split("").map(letter => {
        this.letters.push(letter);
      });
    });
  }

  getLetterClass(letter: string): string {
    if (this.gameService.isGuessedLetter(letter)) {
      return "btn-success";
    }

    return "btn-secondary";
  }

  getLetter(letter: string): string {
    if (this.gameService.isGuessedLetter(letter)) {
      return letter;
    }

    return "_";
  }
}
