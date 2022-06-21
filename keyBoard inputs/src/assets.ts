import * as PIXI from "pixi.js"
import {Game} from "./game"

import qBoxSprite from "./images/qBoxSprite.png";
import aBoxSprite from "./images/aBoxSprite.png";
import aBoxSpriteDeactivated from "./images/aBoxSpriteDeactivated.png";
// import birdSprite1 from "./images/birdSprite1.png"
import crossSprite from "./images/crossSprite.png";
import checkSprite from "./images/checkSprite.png";
import background from "./images/background.png"

type AssetFile = { name: string, url: string }


export class Assets extends PIXI.Loader{

    private assets: AssetFile[] = []
    
    constructor(game: Game) {
        super()

        this.assets = [
            {name: "zombieJson", url: "zombie.json"},
            {name: "knightJson", url: "knight.json"},
            {name: "silverKnightJson", url: "silverKnight.json"},
            {name: "banditJson", url: "bandit.json"},
            {name: "birdJson", url: "bird.json"},
            {name: "qBoxSprite", url: qBoxSprite},
            {name: "background", url: background},
            {name: "aBoxSprite", url: aBoxSprite},
            {name: "aBoxSpriteDeactivated", url: aBoxSpriteDeactivated},
            {name: "checkSprite", url: checkSprite},
            {name: "crossSprite", url: crossSprite},
        ]

        this.assets.forEach(asset => {
            // Add to loader
            this.add(asset.name, asset.url)
            console.log(asset.name)
        })

        this.load( () => game.loadCompleted() )
    }

}