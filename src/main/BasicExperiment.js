import { getCircleGraphics } from "./graphicsHelper";

export default class BasicExperiment {
    constructor() {
        this.acc = [0, 0];
        this.vel = [100, 100];
        this.pos = [10, 10];
        this.dot = getCircleGraphics(this.pos[0], this.pos[1], 5, 0xffffff, 1);
    }

    update(dt) {
        if (this.pos[1] >= 100) {
            this.vel[1] *= -1;
        }
        if (this.pos[1] <= 5) {
            this.vel[1] *= -1;
        }
        this.pos[0] = this.vel[0] * (dt/1000) + this.pos[0];
        this.pos[1] = this.vel[1] * (dt/1000) + this.pos[1];
    }

    draw(parent) {
        this.dot.x = this.pos[0];
        this.dot.y = this.pos[1];
        parent.addChild(this.dot);
    }
}
