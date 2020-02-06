import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { CanvasComponent } from "./canvas/canvas.component";
import { AnswerComponent } from "./answer/answer.component";
import { OptionsComponent } from "./options/options.component";
import { EndComponent } from "./end/end.component";
import { ScoresComponent } from "./scores/scores.component";

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    AnswerComponent,
    OptionsComponent,
    EndComponent,
    ScoresComponent
  ],
  imports: [BrowserModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EndComponent, ScoresComponent]
})
export class AppModule {}
