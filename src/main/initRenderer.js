import * as PIXI from 'pixi.js';

const initRenderer = (parent, width, height) => {
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
    parent.replaceChild(renderer.view, parent.lastElementChild); // Hack for parcel HMR
    
    // const stage = new PIXI.Container();

    // const box = getRectGraphics(10, 30, 300, 100, 0x0000ff, 5);
    // stage.addChild(box);

    // const dot = getCircleGraphics(5, 5, 30, 0xff00ff);
    // stage.addChild(dot);

    // renderer.render(stage);

    return renderer;
};

export default initRenderer;
