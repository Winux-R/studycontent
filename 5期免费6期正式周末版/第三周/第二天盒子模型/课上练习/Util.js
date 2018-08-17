/**
 * Created by VictorJin on 2018/7/22.
 */
let utils = (function () {
  function win(attr, value) {
    if (value === undefined) {
      return document.documentElement[attr] || document.body[attr];
    }
    document.documentElement[attr] = value;
    document.body[attr] = value;
  }
  function offset(ele) {
    let L = ele.offsetLeft;
    let T = ele.offsetTop;
    let parent = ele.offsetParent;
    while (parent) {
      L += parent.clientLeft;
      T += parent.clientTop;
      L += parent.offsetLeft;
      T += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return {left: L, top: T};
  }
  function getCss(ele, attr) {
    let val = window.getComputedStyle(ele)[attr];
    let reg = /^-?(\d|[1-9]\d+)(\.\d+)?(px|rem|em|pt)?$/gi;
    if (reg.test(val)) {
      return parseFloat(val);
    }
    return val;
  }
  function setCss(ele, attr, value) {
    var reg = /^(width|height|fontSize)|(margin|padding)(left|right|top|bottom)?$/gi;
    if(reg.test(attr)) {
      if (value.indexOf('px') === -1) {
        ele.style[attr] = value + 'px';
      } else {
        ele.style[attr] = value
      }
    } else {
      ele.style[attr] = value
    }
  }
  function setGroupCss(ele, obj) {
    if (obj instanceof Object) {
      for (let attr in obj) {
        setCss(ele, attr, obj[attr]);
      }
    }
  }
  function css(...arg) {
    if (arg.length === 3) {
      setCss(...arg);
    } else {
      if (arg[1] instanceof Object) {
        setGroupCss(...arg);
      } else {
        return getCss(...arg);
      }
    }
  }
  function getRandom(n, m) {
    n = Number(n);
    m = Number(m);
    if (!isNaN(n) && !isNaN(m)) {
      if (n > m) {
        [n, m] = [m, n];
      }
      return Math.round(Math.random()*(m - n) + n);
    }
  }
  return {
    win,
    offset,
    css,
    getRandom
  };
})()