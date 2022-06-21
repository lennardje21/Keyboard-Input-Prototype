import * as PIXI from "pixi.js";
import { Game } from "./game";
import { questionBox } from "./questionBox";

export class Check {
  game: Game;
  checkSprite: PIXI.Sprite;
  questionBox: questionBox;

  constructor(game: Game, qBox: questionBox) {
    this.game = game;
    this.checkSprite = new PIXI.Sprite(game.loader.resources["checkSprite"].texture!);
    this.checkSprite.x = qBox.qBoxSprite.x + 300;
    this.checkSprite.y = qBox.qBoxSprite.y + 20;
    this.game.pixi.stage.addChild(this.checkSprite);
  }
}
