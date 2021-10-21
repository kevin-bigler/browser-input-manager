class Looper {
    constructor() {
        this.subs = [];
    }
    init(framerate) {
        const startTime = getTime();
        let lastTime = startTime;
        const maxDt = framerate * 5; // no idea...

        const next = () => 
            setTimeout(requestAnimationFrame.bind(null, tick.bind(this)), framerate/40);
        
        const tick = (now) => {
            const dt = Math.min(now - lastTime, maxDt);
            
            if (dt < frameDuration(framerate)) {
                return next();
            }
            
            lastTime = now;
            
            this.runSubs(dt);
            
            next();
        };
        
        tick(startTime);
    }
    ticker(fn) {
        this.subs.push(fn);
    }
    runSubs(dt) {
        for (const sub of this.subs) {
            try {
                sub(dt);
            } catch (err) {
                console.error(err);
            }
        }
    }
}

const getTime = () => {
    return performance.now();
};

const frameDuration = framerate => framerate / 60;

// getAnimationFrame
// setTimeout(0) to eliminate fn callstack
// delta time (dt)
// limit to framerate
// set max dt
// start & stop

export default Looper;
