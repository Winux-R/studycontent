
Array.prototype.pushJin = function (item) {
  this[this.length] = item;
  return this.length;
};
// const arr = [1, 2, 3, 4, 5];
// const backData = arr.pushJin(8);
// console.log(backData, arr);

Array.prototype.popJin = function () {
  if (this.length !== 0) {
    const popValue = this[this.length - 1];
    this.length = this.length - 1;
    return popValue;
  }
};
// const arr = [1, 2, 3, 4, 5, 6, 7];
// const backData = arr.popJin();
// console.log(backData, arr);

Array.prototype.unshiftJin = function (item) {
  if (this.length !== 0) {
    for (let i = this.length - 1; i >= 0; i--) {
      this[i + 1] = this[i];
    }
    this[0] = item;
    return this.length;
  }
};
// const arr = [1, 2, 3, 4, 5, 6, 7];
// const backData = arr.unshiftJin(8);
// console.log(backData, arr);

Array.prototype.shiftJin = function () {
  if (this.length !== 0) {
    const shiftVaule = this[0];
    for (let i = 0; i < this.length - 1; i++) {
      this[i] = this[i + 1];
    }
    this.length--;
    return shiftVaule;
  }
};
// const arr = [1, 2, 3, 4, 5, 6, 7];
// const backData = arr.shiftJin();
// console.log(backData, arr);

Array.prototype.sliceJin = function (from, to) {
  let arr = [];
  for (let i = from; i < to; i++) {
    arr.push(this[i]);
  }
  return arr;
};
// const arr = [1, 2, 3, 4, 5, 6, 7];
// const backData = arr.sliceJin(2,5);
// console.log(backData, arr);
Array.prototype.spliceJin = function (from, quantity) {
  let arr = [];
  for (let index = from; index < (isNaN(quantity) ? this.length : from + quantity); index++) {
    arr.push(this[index]);
    this[index] = '';
  }
    for (let index = 0; index < this.length; index++) {
      if (this[index] === '') {
        if (arguments[2] === undefined) {
          for (let moveIndex = index; moveIndex < this.length - 1; moveIndex++) {
            this[moveIndex] = this[moveIndex + 1];
          }
          this.length--;
        } else {
          let temporaryArr = [];
          for (let moveIndex = index; moveIndex < this.length; moveIndex++ ) {
            if (this[moveIndex] !== '') {
              temporaryArr.push(this[moveIndex]);
            }
            this[moveIndex] = undefined;
          }
          this.length = index;
          for (let i = 2; i < arguments.length; i++) {
            this.push(arguments[i]);
          }
          for (let j = 0; j < temporaryArr.length; j++) {
            this.push(temporaryArr[j]);
          }
        }
        index--;
      }
    }
  return arr;
};
// const arr = [1, 2, 3, 4, 5, 6, 7];
// const backData = arr.spliceJin(2, 2, 6, 7, 8);
// console.log(backData, arr);

Array.prototype.indexOfJin = function (str) {
  for(var i = 0; i < this.length; i++) {
    if (str === this[i]) {
      return i;
    }
  }
  return -1;
};
// const arr = [1, 2, 3, 4, 5, 6, 7];
// const backData = arr.indexOfJin(5);
// console.log(backData, arr);

Array.prototype.laseIndexOfJin = function (str) {
  for (var i = this.length - 1; i >= 0; i--) {
    if (str === this[i]) {
      return i;
    }
  }
  return -1;
};
// const arr = [1, 2, 3, 4, 5, 6, 7];
// const backData = arr.laseIndexOfJin(5);
// console.log(backData, arr);

Array.prototype.joinJin = function (symbol) {
  var string = '';
  for (var i = 0; i < this.length; i++) {
    if (i === this.length - 1) {
      string += this[i];
    } else {
      string += this[i] + symbol;
    }
  }
  return string;
};
// const arr = [1, 2, 3, 4, 5, 6, 7];
// const backData = arr.joinJin('+');
// console.log(backData, arr);

Array.prototype.concatJin = function (ary) {
  var string = [];
  for (var j = 0 ; j < this.length; j++) {
    string.push(this[j])
  }
  if (typeof ary === 'object' && ary.length !== undefined) {
    for (var i = 0; i < ary.length; i++ ) {
      string.push(ary[i]);
    }
  } else {
    string.push(ary);
  }
  return string;
};
// const arr = [1, 2, 3, 4, 5, 6, 7];
// const backData = arr.concatJin([1, 2 ,5]);
// console.log(backData, arr);

Array.prototype.toStringJin= function () {
  var string = '';
  for (var i = 0; i < this.length; i++) {
    string += this[i];
  }
  return string;
};
// const arr = [1, 2, 3, 4, 5, 6, 7];
// const backData = arr.toStringJin();
// console.log(backData, arr);

Array.prototype.mapJin = function (fun) {
  var returnData = [];
  for (var i = 0; i < this.length; i++) {
    returnData.push(fun(this[i]));
  }
  return returnData;
};
// const arr = [1, 2, 3, 4, 5, 6, 7];
// const backData = arr.mapJin(function(item) {
//   return item;
// });
// console.log(backData, arr);

Array.prototype.forEachJin = function (fun) {
  for (var i = 0; i < this.length; i++) {
    fun(i);
  }
};
// const arr = [1, 2, 3, 4, 5, 6, 7];
// const backData = arr.forEachJin(function(item) {
//   item++;
// });
// console.log(backData, arr);

// Array.prototype.sortJin = function (fun) {
//   for (var i = 0; i < this.length -1; i++) {
//     fun(this[i], this[i + 1]);
//   }
//   fun();
// };

Array.prototype.reverseJin= function () {
  if (this.length % 2 === 0) {
    for (var i = 0, j = this.length - 1; i <= Math.floor((this.length - 1) / 2); i++, j--) {
      [this[i], this[j]] = [this[j], this[i]];
    }
  }
};
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
const backData = arr.reverseJin();
console.log(backData, arr);