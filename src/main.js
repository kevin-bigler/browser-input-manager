import * as PIXI from 'pixi.js';

console.log('main.js');
const canvasWidth = 640;
const canvasHeight = 360;

import initRenderer from './main/initRenderer';
import Looper from './main/ticker';
import FpsCounter from './main/FpsCounter';
import BasicExperiment from './main/BasicExperiment';
import BouncyBall from './main/BouncyBall';

const renderer = initRenderer(document.body, canvasWidth, canvasHeight);
const stage = new PIXI.Container();

const fpsCounter = new FpsCounter();
const framerate = 60;

const looper = new Looper();
looper.init(framerate);

// looper.ticker(dt => console.log('tick:', dt));
looper.ticker(dt => fpsCounter.updateFps(dt));

const formatFps = () => 
    ''+Math.round(fpsCounter.currentFps) + ' | ' + Math.round(fpsCounter.currentDtsFps) + ' | ' + Math.round(fpsCounter.highestDt, 2);
looper.ticker(dt => document.getElementById('fps').innerText = formatFps());

const basicExperiment = new BasicExperiment();
looper.ticker(dt => {
    basicExperiment.update(dt);
    basicExperiment.draw(stage);
});
const bouncyBall = new BouncyBall(canvasWidth, canvasHeight);
looper.ticker(dt => {
    bouncyBall.update(dt);
    bouncyBall.draw(stage);
});
looper.ticker(dt => renderer.render(stage));
