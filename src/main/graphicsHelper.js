import * as PIXI from 'pixi.js';

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

export {
    getRectGraphics,
    getCircleGraphics
};
