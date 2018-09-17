var testString = ' S tr  in g ';

String.prototype.charAtJin = function (index) {
  for (var i = 0; i < this.length; i++) {
    if (index === i) {
      return this[i];
    }
  }
};
// var returnString = testString.charAtJin(3);
// console.log(returnString);

String.prototype.chartCodeAtJin= function () {

};

String.prototype.toUpperCaseJin = function () {

};

String.prototype.toLowerCaseJin = function () {

};

String.prototype.substrJin = function (position, count) {
  var string = '';
  for (var i = 0; i < this.length; i++) {
    if (i >= position && i < position + count) {
      string += this[i];
    }
  }
  return string;
};
// var returnData = testString.substrJin(2, 2);
// console.log(returnData);

String.prototype.substringJin = function (from, to) {
  var string = '';
  var start = 0;
  var end = 0;
  if (from > to) {
    start = to === -1 ? 0 : to;
    end = start;
  } else {
    start = from;
    end = to;
  }
  for (var i = 0; i < this.length; i++) {
    if (start <= i && i < end) {
      string += this[i]
    }
  }
  return string;
};
// var returnData = testString.substringJin(2, 5);
// console.log(returnData);

String.prototype.sliceJin = function (from, to) {
  var string = ''
  for (var i = 0; i < this.length; i++) {
    if (from <= i && i < (to > 0 ? to : this.length + to)) {
      string += this[i];
    }
  }
  return string;
};
// var returnData = testString.sliceJin(2, -1);
// console.log(returnData);

String.prototype.indexOfJin = function (str) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === str) {
      return i;
    }
  }
};
// var returnData = testString.indexOfJin('i');
// console.log(returnData);

String.prototype.lastIndexOfJin = function (str) {
  for (var i = this.length; i >= 0; i--) {
    if (this[i] === str) {
      return i;
    }
  }
};
// var returnData = testString.lastIndexOfJin('i');
// console.log(returnData);

String.prototype.replaceJin = function (str, newStr) {
  var string = '';
  for (var i = 0; i < this.length; i++) {
    if (this[i] === str) {
      string += newStr;
    } else {
      string += this[i]
    }
  }
  return string;
};
// var returnData = testString.replaceJin('i', 'w');
// console.log(returnData);

String.prototype.splitJin = function (symbel) {
  var ary = [];
  var miniAry = '';
  for (var i = 0; i < this.length; i++) {
    if (symbel === '') {
      ary.push(this[i]);
    } else if (this[i] !== symbel) {
      miniAry += this[i];
    } else {
      ary.push(miniAry);
      miniAry = '';
    }
  }
  if (symbel !== '') {
    ary.push(miniAry);
  }
  return ary;
};
// var returnData = testString.splitJin(' ');
// console.log(returnData);

String.prototype.trimJin = function () {
  var string = '';
  for (var i = 0; i < this.length; i++) {
    if (this[i] !== ' ') {
      string += this[i];
    }
  }
  return string;
};
// var returnData = testString.trimJin(' ');
// console.log(returnData);

String.prototype.matchJin = function (str) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === str) {
    }
  }
};
String.prototype.searchJin = function (str) {
  for(var i = 0; i < this.length; i++) {
    if (this[i] === str) {
      return i;
    }
  }
};
// var returnData = testString.searchJin('t');
// console.log(returnData);

