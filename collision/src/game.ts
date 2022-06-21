import * as PIXI from "pixi.js";

import { Assets } from "./assets"
import { Enemy } from "./enemy";
import { Background } from "./background";
import { Hero } from "./hero";

export class Game {
  pixi: PIXI.Application;
  loader: PIXI.Loader;
  zombie: Enemy
  knight: Hero
  bandit: Enemy
  screenWidth: number = 1280;
  screenHeight: number = 720;

  constructor() {
    this.pixi = new PIXI.Application({ width: this.screenWidth, height: this.screenHeight, backgroundColor: 0x2980b9 });
    document.body.appendChild(this.pixi.view);

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    let assets = new Assets(this)
    this.loader = assets

    this.loader.load(() => this.loadCompleted());
  }

  loadCompleted() {
    const background = new Background(this.loader.resources["background"].texture!, this.screenWidth, this.screenHeight)
    this.pixi.stage.addChild(background)

    //in frames komen de images te staan die de enemy animate
    let enemyFrames = this.createZombieFrames()
    let knightFrames = this.createKnightFrames()

    let banditFrames: PIXI.Texture[][] = this.createBanditFrames()


    this.knight = new Hero(this, knightFrames)

    this.bandit = new Enemy(this, banditFrames)

    //creeër een nieuwe zombie
    //this.zombie = new Enemy(this, enemyFrames)

    //this.bandit = new Enemy(this, banditFrames)


    this.pixi.ticker.add((delta: number) => this.update(delta) )
  }

  createBanditFrames(): PIXI.Texture[][]{

    let banditFramesIdle: PIXI.Texture[] = []
    let banditFramesMove: PIXI.Texture[] = []
    let banditFramesAttack: PIXI.Texture[] = []


    for (let i = 1; i <= 4; i++) {
     banditFramesIdle.push(PIXI.Texture.from(`banditIdle_${i}.png`))
    }

    for (let i = 1; i <= 8; i++){
      banditFramesMove.push(PIXI.Texture.from(`banditRun_${i}.png`))

    }
    for (let i = 1; i <= 8; i++) {
      banditFramesAttack.push(PIXI.Texture.from(`banditAttack_${i}.png`))
    }
    
    return [banditFramesIdle, banditFramesMove, banditFramesAttack]

  }

  createKnightFrames(){
    let knightFrames: PIXI.Texture[] = []

    for (let i = 1; i <= 8; i++) {
      const texture =
              PIXI.Texture.from(`knight_${i}.png`)
              knightFrames.push(texture)
    }
    return knightFrames
  }

  createZombieFrames(){
    let enemyFrames: PIXI.Texture[] = []

    for (let i = 1; i <= 8; i++) {
      const texture =
              PIXI.Texture.from(`zombie_${i}.png`)
              enemyFrames.push(texture)
    }
    return enemyFrames
  }

  update(delta: number) {
    this.bandit.move()
    if (this.collision(this.bandit, this.knight)) {
      this.bandit.width = 700
      this.bandit.height = 700
      console.log("reeeeeeeeeeeeee")
    }
  }

  collision(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
    const bounds1 = sprite1.getBounds()
    const bounds2 = sprite2.getBounds()

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
}
}

new Game
