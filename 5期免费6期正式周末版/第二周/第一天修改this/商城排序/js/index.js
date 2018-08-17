/**
 * Created by VictorJin on 2018/7/14.
 */
let header = document.getElementById('header');
let button = header.getElementsByTagName('a');
let ul = document.getElementById('shopList');

let xhr = new XMLHttpRequest();
xhr.open('get', './data/product.json', false);
let data = [];
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    data = JSON.parse(xhr.responseText);
  }
};
xhr.send();

function bindHTML() {
  let str = '';
  data.forEach(function (item) {
    str += `<li>
                <img src="${item.img}" alt="">
                <p>${item.title}</p>
                <p class="hot">热度：${item.hot}</p>
                <del>$9999</del>
                <span>￥${item.price}</span>
                <p class="time">上架时间：${item.time}</p>
            </li>`;
  });
  ul.innerHTML = str;
}
bindHTML();

for (let i = 0; i < button.length; i++) {
  button[i].flg = -1;
  button[i].onclick = function () {
    this.flg *= -1;
    let val = this.getAttribute('attrName');
    sort.call(this, val);
    arrowColor.call(this);
    clearArrow.call(this);
  };
}

function sort(value) {
  let that = this;
  if (value === 'time') {
    data.sort(function (a, b) {
      return (new Date(a.time) - new Date(b.time)) * that.flg;
    })
  } else {
    data.sort(function (a, b) {
      return (a[value] - b[value]) * that.flg;
    });
  }
  bindHTML();
}

function arrowColor() {
  console.log(this.flg);
  let up = this.children[0];
  let down = this.children[1];
  if (this.flg > 0) {
    up.classList.add('bg');
    down.classList.remove('bg');
  } else {
    down.classList.add('bg');
    up.classList.remove('bg');
  }
}

function clearArrow() {
  for (let i = 0; i < button.length; i++) {
    if (button[i] !== this) {
      button[i].children[0].classList.remove('bg');
      button[i].children[1].classList.remove('bg');
      button[i].flg = -1;
    }
  }
}
















