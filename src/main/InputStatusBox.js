import keycode from 'keycode';
import * as PIXI from 'pixi.js';
import { getRectGraphics } from "./graphicsHelper";

export default class InputStatusBox {
    constructor(inputCode) {
        this.inputCode = inputCode;
        this.active = false;
    }

    update(dt) {
        // if (this.inputEvents.has(this.inputCode)) {
        //     const { action } = this.inputEvents.get(this.inputCode);
        //     if (action === KEY_DOWN) {
        //         this.active = true;
        //     } else if (action === KEY_UP) {
        //         this.active = false;
        //     }
        // }
        document.addEventListener('keydown', e => {
            if (keycode(e) === this.inputCode) {
                this.active = true;
            }
        });
        document.addEventListener('keyup', e => {
            if (keycode(e) === this.inputCode) {
                this.active = false;
            }
        });
    }

    draw(parent) {
        const container = new PIXI.Container();

        const fill = this.active ? 0x00ff00 : 0xff0000;
        const graphic = getRectGraphics(0, 0, 30, 30, fill, 1);
        
        const text = new PIXI.Text(this.inputCode+'');
        text.anchor.set(0.5);
        text.x = graphic.width / 2;
        text.y = graphic.height / 2;

        container.addChild(graphic);
        container.addChild(text);
        
        parent.addChild(container);
    }
}
