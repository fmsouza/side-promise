# side-promise

Run Promises in a side process.

There are some cases where you have a CPU-intensive operation and need to sideload it so the main thread won't get blocked. There are a few solutions based on Workers coming up, but they require Node.js v10.5+. This alternative is backwards compatible.

## Installation

> npm i side-promise

## Usage

```javascript
const SidePromise = require('side-promise');

const operationResult = (baseNumber) => new SidePromise((resolve, reject) => {
  if (isNaN(baseNumber)) return reject(new Error('The argument must be a number.')); // core JS resources are good to be used
	let result = 0;
	for (var i = Math.pow(baseNumber, 7); i >= 0; i--) {		
		result += Math.atan(i) * Math.tan(i);
	};
  resolve(result);
}, { baseNumber });

operationResult(10)
  .then(result => console.log('The result is:', result))
  .catch(console.error)
  .then(() => process.exit());
```

The only difference between `SidePromise` and the `Promise` API is the context as the second argument, which takes all the variables which must be known in the offloaded function, so they can be executed correctly in the child process.
