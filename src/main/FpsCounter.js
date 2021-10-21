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
        this.dts.push(dt);
        if (this.dts.length > 100) {
            this.dts.shift();
        }
        this.currentDtsFps = computeDtsFps(this.dts);
        this.highestDt = Math.max(0, ...this.dts);

        // frametimes method (probably better)
        this.frametimes.push(performance.now());
        if (this.frametimes.length > 100) {
            this.frametimes.shift();
        }
        this.currentFps = computeFps(this.frametimes);
    }
}

/**
 * get fps from (# frames) / (newest frame timestamp - oldest frame timestamp)
 * @param {number[]} frametimes array of frame timestamps
 */
const computeFps = (frametimes) => {
    const newest = Math.max(...frametimes);
    const oldest = Math.min(...frametimes);
    // const newest = frametimes[frametimes.length - 1];
    // const oldest = frametimes[0];
    return frametimes.length / (newest/1000 - oldest/1000);
};

/**
 * get fps from (# frames) / (average frame duration)
 * @param {number[]} dts array of time durations between frames
 */
const computeDtsFps = (dts) => {
    const dtSum = sum(dts) / 1000;
    return dts.length / dtSum;
};

// helper
const sum = array => array.reduce((pv, cv) => pv + cv, 0);

export default FpsCounter;
export {
    computeFps, 
    computeDtsFps
};

