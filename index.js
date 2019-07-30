const { fork } = require('child_process');

module.exports = class SidePromise {

    constructor(fn, context) {
        return new Promise((resolve, reject) => {
            const child = fork('./worker.js');
            child.send({ type: 'start', payload: { operation: fn+"", context } }, e => {
                if (!e) return;
                child.kill();
                reject(e);
            });
            child.on('message', ({ type, payload }) => {
                child.kill();
                if (type === 'resolve') resolve(payload);
                else reject(payload);
            });
        });
    }
}
