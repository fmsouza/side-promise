const SidePromise = require('./index');

const echoer = (name) => new SidePromise((resolve) => {
    resolve('Hello '+name);
}, { name });

(async() => {
    for (let i=0; i<1000; i++) {
        let result = await echoer('Fred');
        console.log(i, result);
    }
    process.exit(0);
})();