import {
    Sprite,
    Application
} from "pixi.js";
import { booleanTypeAnnotation } from "babel-types";

let init = () => {
    const app: Application = new Application(512, 512);
    document.body.appendChild(app.view);

    let background: Sprite = Sprite.fromImage("./skyblue.jpg");
    app.stage.addChild(background);

    class Cloud {
        sprite: Sprite;
        direction: number = 1;
        constructor(sprite: Sprite) {
            this.sprite = sprite;
        }
    }

    
    
    let clouds: Cloud[] = [];
    for (let i: number = 1; i <= 5; i++) {
        let sprite: Sprite = Sprite.fromImage("./cloud3.png");                
        sprite.x = (Math.floor(Math.random() * 750) + 200) / 10 * i - Math.floor(Math.random() * 120) + 50;

        sprite.y = 1000 / 10 * i - Math.floor(Math.random() * 120) + 5;
        let cloud: Cloud = new Cloud(sprite);
        clouds[clouds.length] = cloud;
        app.stage.addChild(cloud.sprite);
    }

    let boi: Sprite = Sprite.fromImage("./boi3balloons.png");
    boi.scale.x = .70;
    boi.scale.y = .70;
    boi.x = 220;
    boi.y = 355;
    app.stage.addChild(boi);
    const speed: number = 5;
    
    let left: number = 0;
    let right: number = 0;

    window.addEventListener("keydown", (e: KeyboardEvent): void  => {
        console.log("key: " + e.keyCode);
        const LEFT: number = 37;
        const RIGHT: number = 39;
        if (e.keyCode === LEFT) {
            left = -1;
        } else if (e.keyCode === RIGHT) {
            right = 1;
        } 
    },                      false);
    
    window.addEventListener("keyup", (e: KeyboardEvent): void  => {
        console.log("key: " + e.keyCode);
        const LEFT: number = 37;
        const UP: number = 38;
        const RIGHT: number = 39;
        const DOWN: number = 40;
        if (e.keyCode === LEFT) {
            left = 0;
        } else if (e.keyCode === RIGHT) {
            right = 0;
        } 
    },                      false);

    // clouds move
    app.ticker.add((delta: number): void => {
        for (let i: number = 0; i < clouds.length; i++) {
            let cloud: Cloud = clouds[i];
            cloud.sprite.y += 5;
            if (cloud.sprite.y >= 512) {
                cloud.sprite.x = (Math.floor(Math.random() * 1000) + 200) / 10 * i - Math.floor(Math.random() * 100) + 50;
                cloud.sprite.y = -70;
            }
        }
        
        boi.x += (left + right) * speed;

        if (boi.x <= 0) {
            boi.x = 0;
        }
        if (boi.x >= 455) {
            boi.x = 455;
        }
    }); // end ticker
};
 
init();