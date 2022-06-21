import * as PIXI from "pixi.js"
import {Game} from "./game"

export class Enemy extends PIXI.AnimatedSprite {

    private xspeed: number
    private yspeed: number
    private game: Game
    private frames: PIXI.Texture[][] = []
    private xPos : number
    private yPos : number

    //geef aan hoe en snel de enemy is ook de positie waar de zombie is word hier aangegeven
    constructor(game: Game, textures: PIXI.Texture[][], x : number, y : number) {
        console.log("I'm a zombie")
        super(textures[0])
        this.xPos = x
        this.yPos = y

        this.frames = textures
        this.game = game

        this.xspeed = 0
        this.yspeed = 0

        this.anchor.set(0.5)
        this.scale.set(-5, 5)
        this.x = this.xPos
        this.y = this.yPos
        this.animationSpeed = 0.1
        this.loop = true
        this.play()

        //voeg de enemy aan het beeld toe
        this.game.pixi.stage.addChild(this)
    }

    //laat de enemy bewegen
    move() {
        this.x += this.xspeed
        this.y += this.yspeed        
    }

    sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

    attack() {
        console.log("slash")
        this.textures = this.frames[2]
        this.loop = false
        this.play()
    }
}