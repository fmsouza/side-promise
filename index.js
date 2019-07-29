const { fork } = require('child_process');

class SPromise {

    constructor(fn, context) {
        return new Promise((resolve, reject) => {
            const child = fork('./worker.js');
            child.send({ type: 'start', payload: { operation: fn+"", context } }, e => e && reject(e));
            child.on('message', ({ type, payload }) => {
                child.unref();
                if (type === 'resolve') resolve(payload);
                else reject(payload);
            });
        });
    }
}

module.exports = SPromise;