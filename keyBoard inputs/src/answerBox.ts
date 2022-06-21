import * as PIXI from "pixi.js";
import { Game } from "./game";
import { questionBox } from "./questionBox";

export class Answer {
  game: Game;
  questionBox: questionBox;

  aBoxSprite: PIXI.Sprite;
  aText: PIXI.Text;

  answer: string;
  correctAnswer: string;

  constructor(game: Game, qBox: questionBox, i: number) {
    this.game = game;
    this.questionBox = qBox;

    //fetch questions from json file
    fetch("question.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        let json = response.json();
        return json;
      })
      .then((json) => {
        this.generateAnswers(json, game, qBox, i);
      })
      .catch(this.errorHandler);
  }

  generateAnswers(data: any, game: Game, qBox: questionBox, i: number) {
    //correct answer
    this.correctAnswer = data[qBox.questionId].correctA;

    //answer
    this.answer = data[qBox.questionId].answers[i];

    //show answer box sprite
    this.aBoxSprite = new PIXI.Sprite(game.loader.resources["aBoxSprite"].texture!);
    this.aBoxSprite.anchor.set(0.5);
    this.aBoxSprite.x = qBox.qBoxSprite.x + 200 * i + 50;
    this.aBoxSprite.y = qBox.qBoxSprite.y + 240;

    //give them text
    this.aText = new PIXI.Text(this.answer, { fontFamily: "Arial", fontSize: 24, fill: 0x000000, align: "center" });
    this.aText.anchor.set(0.5);
    this.aText.x = this.aBoxSprite.x;
    this.aText.y = this.aBoxSprite.y;

    //make the answer sprite interactive
    this.aBoxSprite.interactive = true;
    this.aBoxSprite.buttonMode = true;
    this.aBoxSprite.on("pointerdown", (event: Event) => this.onButtonDown(event, qBox, this.answer, this.correctAnswer));

    //append answer box sprite and text
    this.game.pixi.stage.addChild(this.aBoxSprite, this.aText);
  }

  onButtonDown(event: Event, qBox: questionBox, answer: string, correctAnswer: string) {
    qBox.answerHandler(event, answer, correctAnswer);
  }

  errorHandler(event: any) {
    console.log(event);
  }
}
