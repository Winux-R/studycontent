class mypromise {
  constructor(fn) {
    this.fulfilledEvent = [];
    this.rejectEvent = [];
    this.state = 'pending';
    this.value = null;
    let resolve = (result) => {
      if (this.state !== 'pending')  return;
      this.state = 'fulfilled';
      this.value = result;
      setTimeout(() => {
        this.fulfilledEvent.forEach((item, index) => {
          if (typeof item === 'function') {
            item(this.value);
          }
        })
      })
    };
    let reject = (result) => {
      if (this.state !== 'pending')  return;
      this.state = 'rejected';
      this.value = result;
      setTimeout(() => {
        this.rejectEvent.forEach((item, index) => {
          if(typeof item === 'function') {
            item(this.value);
          }
        })
      });
    };
    fn(resolve, reject)
  }
  then(resolve, reject) {
    this.fulfilledEvent.push(resolve);
    this.rejectEvent.push(reject);
  }
}

new mypromise((resolve,reject)=>{
  console.log(1);
  reject();
}).then(function () {
  console.log(2);
},function () {
  console.log(3);
});
console.log(4);