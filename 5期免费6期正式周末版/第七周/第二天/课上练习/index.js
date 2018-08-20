// async function async1() {
//   console.log('async1 start');// 2
//   await async2();
//   console.log('async1 end'); // 6
// }
// async function async2() {
//   console.log('async2'); // 3
// }
// console.log('script start');// 1
// setTimeout(() => {
//   console.log('setTimeout');// 8
// }, 0);
// async1();
// new Promise(resolve => {
//   console.log('promise1');// 4
//   resolve();
// }).then(() => {
//   console.log('promise2'); // 7
// });
// console.log('script end');/**
//  * Created by VictorJin on 2018/8/19.
//  */

console.log('1');
setTimeout(function () {
  console.log('2');
  new Promise(function (resolve) {
    console.log('4');
    resolve();
  }).then(function () {
    console.log('5');
  });
});
new Promise(function (resolve) {
  console.log('7');
  resolve();
}).then(function () {
  console.log('8');
});
setTimeout(function () {
  console.log('9');
  new Promise(function (resolve) {
    console.log('11');
    resolve();
  }).then(function () {
    console.log('12');
  });
});