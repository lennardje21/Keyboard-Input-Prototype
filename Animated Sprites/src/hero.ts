import * as PIXI from "pixi.js"
import {Game} from "./game"

export class Hero extends PIXI.AnimatedSprite {

    private game: Game
    xPos : number
    yPox : number
    constructor(game: Game, textures: PIXI.Texture[], x : number, y : number) {
        console.log("I'm a Hero")
        super(textures)
        this.game = game
        this.xPos = x
        this.yPox = y

        this.anchor.set(0.5)
        this.x = this.xPos
        this.y = this.yPox
        this.animationSpeed = 0.1
        this.loop = true
        this.play()

        //voeg de enemy aan het beeld toe
        this.game.pixi.stage.addChild(this)
    }
}