const box = document.getElementById('box');

function fn() {
  console.log(1);
  box.removeEventListener('click', fn1, true);
}
function fn1() {
  console.log(1);
}
box.addEventListener('click', fn, true);
box.addEventListener('click', fn1, true);

