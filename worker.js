const util = require('util');
const vm = require('vm');

process.on('message', ({ type, payload }) => {
    if (type !== 'start') return process.send({ type: 'resolve', payload: null });
    const script = new vm.Script(`(${payload.operation})(resolve, reject)`);
    const sandbox = {
        ...payload.context,
        resolve: p => process.send({ type: 'resolve', payload: p }),
        reject: p => process.send({ type: 'reject', payload: p })
    };
    const context = vm.createContext(sandbox);
    script.runInContext(context);
});