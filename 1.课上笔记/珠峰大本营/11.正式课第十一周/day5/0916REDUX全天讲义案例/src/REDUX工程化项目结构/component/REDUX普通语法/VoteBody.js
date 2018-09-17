import React from 'react';
import PropTypes from 'prop-types';

export default class VoteBody extends React.Component {
    static contextTypes = {
        store: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        //=>第一次渲染完成后，我们向REDUX事件池中追加一个方法（方法用来重新渲染当前组件），当REDUX状态改变，组件会重新渲染
        //=>subscribe向事件池追加方法，返回的一个函数，这个返回的函数执行就是把当前追加的方法从事件池移除
        let unscbscribe = this.context.store.subscribe(() => {
            this.forceUpdate();
            // unscbscribe();
        });
    }

    render() {
        let {n, m} = this.context.store.getState(),
            rate = n + m === 0 ? '100%' : (n / (n + m) * 100).toFixed(2) + '%';
        return <main className='panel-body'>
            支持人数：{n}人 <br/>
            反对人数：{m}人 <br/>
            支持比率：{rate}
        </main>;
    }
}