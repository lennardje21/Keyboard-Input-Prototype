import * as PIXI from "pixi.js"
import {Game} from "./game"

export class Enemy extends PIXI.AnimatedSprite {

    private xspeed: number
    private yspeed: number
    private game: Game
    private frames: PIXI.Texture[][] = []

    //geef aan hoe en snel de enemy is ook de positie waar de zombie is word hier aangegeven
    constructor(game: Game, textures: PIXI.Texture[][]) {
        console.log("I'm a zombie")
        super(textures[0])

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

        this.frames = textures
        this.game = game

        this.xspeed = 0
        this.yspeed = 0

        this.anchor.set(0.5)
        this.scale.set(-5, 5)
        this.x = 500
        this.y = 430
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

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                this.attack()
                break
            case "A":
            case "ARROWLEFT":
                this.xspeed = -3
                this.scale.set(5, 5)
                this.textures = this.frames[1]
                this.loop = true
                this.play()
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 3
                this.scale.set(-5, 5)
                this.textures = this.frames[1]
                this.loop = true
                this.play()
                break
            case "W":
            case "ARROWUP":
                this.yspeed = -3
                break
            case "S":
            case "ARROWDOWN":
                this.yspeed = 3
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                this.textures = this.frames[0]
                this.loop = true

                this.play()
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                this.textures = this.frames[0]
                this.loop = true

                this.play()
                break
        }
    }
}