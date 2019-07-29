const SPromise = require('./index');

const echoer = (name) => new SPromise((resolve, reject) => {
    resolve('Hello '+name);
}, { name });

(async() => {
    for (let i=0; i<1000; i++) {
        let result = await echoer('Fred');
        console.log(i, result);
    }
    process.exit(0);
})();