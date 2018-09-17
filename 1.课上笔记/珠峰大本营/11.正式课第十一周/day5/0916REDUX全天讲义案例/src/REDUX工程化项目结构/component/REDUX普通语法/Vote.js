import React from 'react';
import PropTypes from 'prop-types';
import VoteHeader from "./VoteHeader";
import VoteBody from "./VoteBody";
import VoteFooter from "./VoteFooter";
import {createStore} from '../redux';

let store = createStore(function reducer(state = {
    n: 0,
    m: 0
}, action) {
    state = JSON.parse(JSON.stringify(state));
    if (action.type === 'A') {
        state.n++;
    }
    if (action.type === 'B') {
        state.m++;
    }
    return state;
});

export default class Vote extends React.Component {
    static defaultProps = {
        title: '珠峰培训教学很棒！'
    };
    static propTypes = {
        title: PropTypes.string
    };

    //=>把创建的STORE放到上下文中，这样后期哪一个后代组件需要使用STORE直接基于上下文获取到即可（属性传递也可以，但是操作比较麻烦）
    static childContextTypes = {
        store: PropTypes.object
    };

    getChildContext() {
        return {
            store: store
        };
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let styleOBJ = {
            width: '60%',
            margin: '20px auto'
        };

        return <section style={styleOBJ} className='panel panel-default'>
            <VoteHeader/>
            <VoteBody/>
            <VoteFooter/>
        </section>;
    }
}


/*
//=>思考题：JS高阶编程的三大技巧

//=>惰性函数
let obj=(function () {

    return {

    }
})();

//=>柯理化函数
Function.prototype.bind=function bind(context,...params) {
    //=>this:fn
    let _this=this;
    return function (...innerParams) {
        _this.apply(context,params.concat(innerParams));
    }
}

//=>compose
fn(fn1(fn2()))
*/













