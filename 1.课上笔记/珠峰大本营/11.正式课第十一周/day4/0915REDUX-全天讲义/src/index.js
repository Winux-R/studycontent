import React from './jsx渲染源原理复习/jsx_react';
import ReactDOM from './jsx渲染源原理复习/jsx_reactdom';

ReactDOM.render(<div>
    <h2 className='title'>2018年第六期就业成绩</h2>
    <ol className='clearfix'>
        <li><em style={{color: 'red'}}>01</em><span>柯金珠同学入职腾讯，斩获￥20000月薪</span></li>
        <li><em>02</em><span>任保森同学成功留级</span></li>
    </ol>
    GOOD GOOD STUDY!
</div>, window.root);