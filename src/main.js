import * as PIXI from 'pixi.js';

console.log('main.js');
const canvasWidth = 640;
const canvasHeight = 360;

const start = (parent, width, height) => {
    // const app = new PIXI.Application({width, height, transparent: true}); // 0xff0000});
    const renderer = PIXI.autoDetectRenderer({
        antialias: true,
        // transparent : true,
        preserveDrawingBuffer: true,
        backgroundColor: 0x7f7f7f,
        width,
        height,
        autoDensity: true,
        resolution: devicePixelRatio
    });
    const stage = new PIXI.Container();
    parent.replaceChild(renderer.view, parent.lastElementChild); // Hack for parcel HMR
    
    const box = getRectGraphics(10, 30, 300, 100, 0x0000ff, 5);
    stage.addChild(box);

    const dot = getCircleGraphics(5, 5, 30, 0xff00ff);
    stage.addChild(dot);

    renderer.render(stage);

    return {renderer, stage};
};

const getRectGraphics = (x, y, w, h, color, borderWidth = 0, borderColor = 0x000000) => {
    const graphics = new PIXI.Graphics();

    graphics.lineStyle(borderWidth, borderColor);
    graphics.beginFill(color);
    graphics.drawRect(x, y, w, h);
    graphics.endFill();

    return graphics;
};

const getCircleGraphics = (x, y, r, color, borderWidth = 1, borderColor = 0x000000) => {
    const gr = new PIXI.Graphics();
    gr.lineStyle(borderWidth, borderColor);
    gr.beginFill(color);
    gr.drawCircle(x, y, r);
    gr.endFill();
    return gr;
};

// const {renderer, stage} = start(document.body, window.innerWidth, window.innerHeight);
const {renderer, stage} = start(document.body, canvasWidth, canvasHeight);

// document.addEventListener('click', event => {
//     console.log('clicked event:', event);
//     const circle = getCircleGraphics(event.x, event.y, 10, 0x770000);
//     stage.addChild(circle);
//     renderer.render(stage);
// });

const vel = [0.1, 0.2];
const pos = [10, 10];
const dot = getCircleGraphics(pos[0], pos[1], 5, 0x009900);
stage.addChild(dot);
setInterval(() => {
    if (pos[1] >= 100) {
        vel[1] *= -1;
    }
    if (pos[1] <= 5) {
        vel[1] *= -1;
    }
    pos[0] = vel[0] + pos[0];
    pos[1] = vel[1] + pos[1];
    dot.x = pos[0];
    dot.y = pos[1];
    renderer.render(stage);
}, 10);

class FpsCounter {
    constructor() {
        this.frametimes = [];
        this.currentFps = 0;
        this.dts = []; // for comparison
        this.currentDtsFps = 0;
        this.highestDt = 0;
    }
    updateFps(dt) {
        // dts method
        const sum = array => array.reduce((pv, cv) => pv + cv, 0);

        this.dts.push(dt);
        if (this.dts.length > 100) {
            this.dts.shift();
        }
        this.highestDt = Math.max(0, ...this.dts);
        const dtSum = sum(this.dts) / 1000;
        this.currentDtsFps = this.dts.length / dtSum;
        // console.table({dtSum, dtCount: this.dts.length});

        // frametimes method (probably better)
        this.frametimes.push(performance.now());
        if (this.frametimes.length > 100) {
            this.frametimes.shift();
        }
        const newest = this.frametimes[this.frametimes.length - 1];
        const oldest = this.frametimes[0];
        this.currentFps = this.frametimes.length / (newest/1000 - oldest/1000);
        // console.table({oldest, newest, framecount: this.frametimes.length, currentFps: this.currentFps});
    }
}
const fpsCounter = new FpsCounter();
const framerate = 60;

import Looper from './ticker';
const looper = new Looper();
looper.init(framerate);
looper.ticker(dt => console.log('tick:', dt));
looper.ticker(dt => fpsCounter.updateFps(dt));
const formatFps = () => 
    ''+Math.round(fpsCounter.currentFps) + ' | ' + Math.round(fpsCounter.currentDtsFps) + ' | ' + Math.round(fpsCounter.highestDt, 2);
looper.ticker(dt => document.getElementById('fps').innerText = formatFps());
