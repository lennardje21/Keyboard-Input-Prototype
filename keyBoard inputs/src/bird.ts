import * as PIXI from 'pixi.js';
import { Game } from "./game";

export class Bird {

    birdSprite: PIXI.Sprite
    game:Game

    constructor(game: Game){
        
         this.game = game
    
        this.birdSprite = new PIXI.Sprite(game.loader.resources["birdSprite1"].texture)
        this.birdSprite.scale.set(0.5, 0.5)
        this.birdSprite.y = 480
        this.game.pixi.stage.addChild(this.birdSprite)

        

    }

   

    update(delta: number) {
    
        this.birdSprite.x += delta * 1

    }
            
            // this.push(this.fish)
            // this.pixi.stage.addChild(this.fishes[i])
    
}