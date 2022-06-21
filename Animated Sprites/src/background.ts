import * as PIXI from "pixi.js"

export class Background extends PIXI.Sprite{
    constructor(texture: PIXI.Texture, x: number, y: number){
        super(texture)
        console.log("i'm the background")

        this.width = x
        this.height = y
    }
}