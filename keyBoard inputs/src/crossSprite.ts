import * as PIXI from "pixi.js";
import { Game } from "./game";
import { questionBox } from "./questionBox";

export class Cross {
  game: Game;
  crossSprite: PIXI.Sprite;
  questionBox: questionBox;

  constructor(game: Game, qBox: questionBox) {
    this.game = game;
    this.crossSprite = new PIXI.Sprite(game.loader.resources["crossSprite"].texture!);

    this.crossSprite.x = qBox.qBoxSprite.x + 300;
    this.crossSprite.y = qBox.qBoxSprite.y + 20;
    this.game.pixi.stage.addChild(this.crossSprite);
  }
}
