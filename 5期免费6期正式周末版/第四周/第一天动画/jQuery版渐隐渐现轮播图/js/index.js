// 1.获取元素
var  $outer = $("#outer");
var  outer = $("#outer")[0];// document.getElementById()
var  $focus = $("#focus");
var  $swiper = $("#swiper");
var  $oImgs;
// 通过jQuery获取的元素没有映射机制；

// 2.ajax获取数据；
$.ajax({
    url:"data.json",// 路径
    async:false,// Jquery 默认是异步请求；true：异步；false：同步；
    type:"get",// type: 请求方式；get/post/delete/put
    //data:{
    //      username:"张三",
    //      password:11111,
    //      code : ""
    // },参数
    success:function (data) {
        // data : 请求到的数据；
        //console.log(data);
        bindData(data)
    }
});

// 3.绑定数据

function bindData(data) {
    // $.each : 遍历；
    // param1:遍历的数据
    // param2:回调函数
    var imgStr = ``;
    var liStr = ``;
    $.each(data,function (index) {// index: 当前数据的索引；
        // console.log(this);// this---> 每一条具体的数据；
        imgStr+=`<img data-src="${this.img}">`;
        liStr +=`<li></li>`;
    });
    // 把数据放回页面；innerHTML
    $swiper.html(imgStr);
    $focus.html(liStr);
    $("#focus li").eq(0).addClass("select");
    $oImgs = $("#outer img");
    delayImg();
}
function delayImg() {
    $oImgs.each(function (index) {// 当前图片的索引；
        // this-->每一张图片
        var that  = this;
        var trueAddress = $(this).attr("data-src");
        var newImg = new Image;// 原生JS对象；
        newImg.src = trueAddress;
        // 路径存在
        $(newImg).load(function () {
            that.src = trueAddress;
            // 索引为0的显示；
            index===0?$(that).fadeIn():null;
            newImg = null;
        })
    })
}





