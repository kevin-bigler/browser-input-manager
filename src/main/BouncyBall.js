import { getCircleGraphics } from "./graphicsHelper";

export default class BouncyBall {
    constructor(boundaryWidth, boundaryHeight) {
        this.vel = [120, 120];
        this.pos = [40, 40];
        this.r = 8;
        this.boundaryWidth = boundaryWidth;
        this.boundaryHeight = boundaryHeight;

        this.graphic = getCircleGraphics(0, 0, this.r, 0xaaaaaa, 1);
    }
    update(dt) {
        this.pos[0] += this.vel[0] * (dt/1000);
        this.pos[1] += this.vel[1] * (dt/1000);
        // this.pos = wrap(this.pos, this.boundaryWidth, this.boundaryHeight);
        this.vel = bounce(this.pos, this.vel, this.boundaryWidth, this.boundaryHeight);
    }
    draw(parent) {
        this.graphic.x = this.pos[0];
        this.graphic.y = this.pos[1];
        parent.addChild(this.graphic);
    }
}

/**
 * wrapping strategy for updating pos based on boundaries
 * @param {[x: number, y: number]} pos 
 * @param {number} boundaryWidth 
 * @param {number} boundaryHeight 
 * @returns {[x: number, y: number]} new pos
 */
const wrap = (pos, boundaryWidth, boundaryHeight) => {
    const pos2 = pos.slice(0);
    if (pos2[0] < 0) {
        pos2[0] = boundaryWidth;
    }
    if (pos2[0] > boundaryWidth) {
        pos2[0] = 0;
    }
    if (pos2[1] < 0) {
        pos2[1] = boundaryHeight;
    }
    if (pos2[1] > boundaryHeight) {
        pos2[1] = 0;
    }
    return pos2;
};

/**
 * bouncing strategy for updating pos based on boundaries
 * @param {[x: number, y: number]} pos 
 * @param {[x: number, y: number]} vel 
 * @param {*} boundaryWidth 
 * @param {*} boundaryHeight 
 * @returns {[x: number, y: number]} new vel
 */
const bounce = (pos, vel, boundaryWidth, boundaryHeight) => {
    const vel2 = vel.slice(0);
    if (pos[0] < 0) {
        vel2[0] *= -1;
    }
    if (pos[0] > boundaryWidth) {
        vel2[0] *= -1;
    }
    if (pos[1] < 0) {
        vel2[1] *= -1;
    }
    if (pos[1] > boundaryHeight) {
        vel2[1] *= -1;
    }
    return vel2;
};
