import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class VoteBody extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {n, m} = this.props,
            rate = n + m === 0 ? '100%' : (n / (n + m) * 100).toFixed(2) + '%';
        return <main className='panel-body'>
            支持人数：{n}人 <br/>
            反对人数：{m}人 <br/>
            支持比率：{rate}
        </main>;
    }
}

/*
 * 删除的代码：
 *   1.获取上下文中的STORE
 *   2.事件池追加方法，保证状态改变组件重新渲染
 *   3.基于GET-STATE获取状态
 *
 * CONNECT高阶组件
 *   CONNECT([MAP-STATE-TO-PROPS],[MAP-DISPATCH-TO-PROPS])([组件])
 *     [MAP-STATE-TO-PROPS]:把REDUX容器中的状态基于属性传递给组件
 *     [MAP-DISPATCH-TO-PROPS]:把需要派发的方法基于属性传递给组件
 *
 *     组件想用状态或者方法直接基于属性获取即可(没必要自己GET-STATE)，而且当REDUX中状态改变，会自动基于属性把状态传递给组件，组件重新渲染（没必要自己向事件池加方法了）
 */
/*let mapStateToProps = (state) => {
    //=>STATE就是REDUX容器中的状态信息：返回的是哪些信息，就相当于把谁基于属性传递给组件
    return state.vote;
};
export default connect(mapStateToProps)(VoteBody);*/

export default connect(state => state.vote)(VoteBody);
