/**
 * Created by VictorJin on 2018/7/22.
 */
let box = document.getElementById('box');
let uls = box.getElementsByTagName('ul');

uls = [...uls];
let bodyH = "";
let imgs= document.getElementsByTagName('img');
function bind(n) {
  for (let i = 0; i < n; i++) {
    uls.sort(function(a, b) {
      return utils.css(a, 'height') - utils.css(b, 'height');
    });
    uls[0].innerHTML += `
        <li style="height: ${utils.getRandom(280, 350)}">
            <img photo="img/${utils.getRandom(1, 27)}.jpg" alt="" />
            <a href="javascript:;">点击查看详情</a>
        </li>`;
  }
  bodyH = uls[0].offsetHeight;
}
bind(20);
fn();
window.onscroll = fn;
function fn() {
  let winScroll = utils.win('scrollTop');
  let winH = utils.win('clientHeight');
  if (winScroll + winH > bodyH) {
    bind(20);
  }
  for (let i = 0; i < imgs.length; i++) {
    lazyImg(imgs[i]);
  }
}
function lazyImg(ele) {
  let winScroll = utils.win('scrollTop');
  let winH = utils.win('clientHeight');
  let imgH = utils.css(ele, 'height');
  let imgT = utils.offset(ele).top;
  if (winScroll + winH > imgH + imgT) {
    let newImg = new Image();
    let url = ele.getAttribute('photo');
    newImg.src = url;
    newImg.onload = function () {
      ele.src = this.src;
    }
    
  }
};