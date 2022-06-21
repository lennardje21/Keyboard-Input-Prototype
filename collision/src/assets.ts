import * as PIXI from "pixi.js"
import {Game} from "./game"

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
            {name: "background", url: background}
        ]

        this.assets.forEach(asset => {
            // Add to loader
            this.add(asset.name, asset.url)
            console.log(asset.name)
        })

        this.load( () => game.loadCompleted() )
    }

}