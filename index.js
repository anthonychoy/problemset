// Solution #1 START 
doAsync = (input) => {
  if (isValidDoAsyncInput(input)) {
    for (arr of input) {
      asyncOp(arr);
    }
  } else {
    throw new Error('Input parameter is not valid.');
  }
}

asyncOp = async (arr) => {
  if (Array.isArray(arr)) {
    await arrAsyncOp(arr);
  } else {
    logStart(arr).then(x => console.log(x));
    logFinish(arr).then(x => console.log(x));
  }
}

arrAsyncOp = (arr) => {
  return new Promise(resolve => {
    arr.forEach(async x => {
      console.log(await logStart(x));
      console.log(await logFinish(x));
    });

    resolve();
  });
}

// Log START Promise
logStart = (val) => {
  return new Promise(resolve => {
    resolve('START: ' + val);
  });
}

// Log Finish Promise
logFinish = (val) => {
  return new Promise(resolve => {
    resolve('FINISH: ' + val);
  });
}

// Checks if the input array elements is either a string of array of strings
isValidDoAsyncInput = (input) => {
  if (!Array.isArray(input)) {
    return false;
  }

  for (val of input) {
    if (Array.isArray(val)) {
      if (!checkArray(val)) {
        return false;
      }
    } else {
      if (typeof val !== 'string') {
        return false;
      }
    }
  }

  return true;
}

// Checks if each element in an array is a string
checkArray = (arr) => {
  for (val of arr) {
    if (typeof val !== 'string') {
      return false;
    }
  }

  return true;
}

// Solution #1 END

// Solution #2 START
const events = require('events');

class RandStringSource extends events.EventEmitter {

  constructor(randStream) {
    super();

    randStream.on('data', (data) => {
      let splitData = data.split('.');

      if (splitData.length > 1) {
        splitData.forEach(sd => {
          if (sd !== '') {
            this.emit('data', sd);
          }
        });
      }
    });
  }
}

// const RandStream = require('./lib/lib').RandStream;
// let source = new RandStringSource(new RandStream());

// source.on('data', (data) => {
//   console.log(data);
// });

// Solution #2 END

// Solution #3 START

class ResourceManager {
  constructor(count) {
    this.resources = [];
    this.count = count;
  }

  borrow(cb) {
    if (this.resources.length < this.count) {
      this.resources.push(cb);

      cb(this);
    } else {
      setTimeout(() => { this.borrow(cb) }, 100);
    }
  }

  release() {
    this.resources.pop();
  }
}

let pool = new ResourceManager(2);
console.log('START');

let timestamp = Date.now();

pool.borrow((res) => {
  console.log('RES: 1');

  setTimeout(() => {
    res.release();
  }, 500);
});

pool.borrow((res) => {
  console.log('RES: 2');
});

pool.borrow((res) => {
  console.log('RES: 3');
  console.log('DURATION: ' + (Date.now() - timestamp));
});

// Solution #3 END

module.exports = {
  doAsync
};
