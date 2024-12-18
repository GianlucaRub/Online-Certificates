const timeout_fun = (timeout, resolve, reject) => {
  setTimeout(() => {
    resolve(`Promise resolved, timeout: ${timeout}`);
  }, timeout);
};

let myPromise = new Promise((resolve, reject) => {
  first_timeout = new Promise((resolve, reject) => {
    timeout_fun(6000, resolve, reject);
  });
  first_timeout.then((successMessage) => {
    console.log('From Callback ' + successMessage);
    timeout_fun(3000, resolve, reject);
  });
});

//Console log before calling the promise
console.log('Before calling promise');

//Call the promise and wait for it to be resolved and then print a message.
myPromise.then((successMessage) => {
  console.log('From Callback ' + successMessage);
});

//Console log after calling the promise
console.log('After calling promise');
