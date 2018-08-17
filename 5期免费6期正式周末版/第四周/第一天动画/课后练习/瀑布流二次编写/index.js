const div = document.getElementById('box');
const uls = document.getElementsByTagName('ul');
const imgs = document.getElementsByTagName('img');

const newUls = [...uls];
let minUlHeight = '';

function bind(number) {
  for (let i = 0; i < number; i++){
    newUls.sort(function (a, b) {
      return utils.css(a, 'height') - utils.css(b, 'height');
    });
    newUls[0].innerHTML += `<li style="height: ${Math.round(Math.random() * (350 - 290) + 290)}px"><img picture="img/${Math.round(Math.random() * (number - 1) + 1)}.jpg" alt=""><a href="javascript:;">点击查看详情</a></li>`;
  }
  minUlHeight = uls[1].offsetHeight;
}
addImg(20);

window.onscroll = function () {
  addImg();
}
function addImg() {
  const winHeight = document.documentElement.clientHeight;
  const scrollTop = document.documentElement.scrollTop;
  if (winHeight + scrollTop > minUlHeight) {
    bind(20);
  }
  for (let i = 0; i < imgs.length; i++) {
    lazyLoad(winHeight, scrollTop, imgs[i])
  }
}

function lazyLoad(winHeight, scrollTop, img) {
  if (winHeight + scrollTop > img.offsetTop + utils.css(img,'height')) {
    const picture = img.getAttribute('picture');
    let newImg = new Image();
    newImg.src = picture;
    newImg.onload = function () {
      img.src = this.src;
    }
  }
}