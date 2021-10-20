import * as PIXI from 'pixi.js';
console.log('main.js');
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

const getCircleGraphics = (x, y, r, color, borderWidth, borderColor) => {
    const gr = new PIXI.Graphics();
    gr.beginFill(color);
    gr.drawCircle(x, y, r);
    gr.endFill();
    return gr;
};

const {renderer, stage} = start(document.body, window.innerWidth, window.innerHeight);

document.addEventListener('click', event => {
    console.log('clicked event:', event);
    const circle = getCircleGraphics(event.x, event.y, 10, 0x770000);
    stage.addChild(circle);
    renderer.render(stage);
});

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