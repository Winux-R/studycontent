import React from './jsx_react';
import ReactDOM from './jsx_reactdom';

ReactDOM.render(<div>
    <h2 className='title'>2018年第六期就业成绩</h2>
    <ol className='clearfix'>
        <li><em style={{color: 'red'}}>01</em><span>柯金珠同学入职腾讯，斩获￥20000月薪</span></li>
        <li><em>02</em><span>任保森同学成功留级</span></li>
    </ol>
    GOOD GOOD STUDY!
</div>, window.root);


//1.基于BABEL（BABEL-PRESET-REACT）把JSX语法转换为CREATE-ELEMENT
//特点：CREATE-ELEMENT至少传递两个参数
// PARAM1: TYPE（标签名或者是组件等）
// PARAM2：PROPS（属性集合，没有属性是NULL，有属性可能是CLASS-NAME\STYLE\REF\KEY...）
// PARAMS：子元素内容（元素标签或者是文本注释等），每当遇到一个HTML标签都要CREATE-ELEMENT

//2.CREATE-ELEMENT方法执行，最后生成一个JSX虚拟DOM对象
//3.基于REACT-DOM中的RENDER方法把生成的对象转换为真实的DOM结构，并且插入到页面指定的容器中


/*let obj = React.createElement(
    'div',
    {ref: 'AA', key: 'BB'},
    React.createElement(
        'h2',
        {className: 'title'},
        '2018\u5E74\u7B2C\u516D\u671F\u5C31\u4E1A\u6210\u7EE9'
    ),
    React.createElement(
        'ol',
        {className: 'clearfix'},
        React.createElement(
            'li',
            null,
            React.createElement(
                'em',
                {style: {color: 'red'}},
                '01'
            ),
            React.createElement(
                'span',
                null,
                '\u67EF\u91D1\u73E0\u540C\u5B66\u5165\u804C\u817E\u8BAF\uFF0C\u65A9\u83B7\uFFE520000\u6708\u85AA'
            )
        ),
        React.createElement(
            'li',
            null,
            React.createElement('em', null),
            React.createElement(
                'span',
                null,
                '\u4EFB\u4FDD\u68EE\u540C\u5B66\u6210\u529F\u7559\u7EA7'
            )
        )
    ),
    'GOOD GOOD STUDY!'
);

console.log(obj,JSON.stringify(obj));*/










