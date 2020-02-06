import { Component, OnInit, HostListener } from "@angular/core";
import { GameService } from "../game.service";
import { alphabeth } from "../models/alphabeth.letters";
import { Status } from "../models/status.enum";

@Component({
  selector: "app-options",
  templateUrl: "./options.component.html"
})
export class OptionsComponent implements OnInit {
  alphabeth: Array<string> = alphabeth;

  isGameOver: boolean = false;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.getGameInfo().subscribe(info => {
      this.isGameOver = info.isGameOver();
    });
  }

  @HostListener("document:keypress", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log("clicked", event.key);

    if (this.alphabeth.includes(event.key)) {
      this.gameService.guessLetter(event.key);
    }
  }

  guessLetter(letter: string): void {
    this.gameService.guessLetter(letter);
  }

  isGuessedLetter(letter: string): boolean {
    return this.gameService.isGuessedLetter(letter);
  }

  getLetterClass(letter: string): string {
    // Default
    if (!this.gameService.isGuessedLetter(letter)) {
      return "btn-secondary";
    }

    // Guessed and correct
    if (this.gameService.isLetterInSecret(letter)) {
      return "btn-success";
    }

    // Guessed and wrong
    return "btn-outline-danger";
  }
}
