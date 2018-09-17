import React from 'react';
import PropTypes from 'prop-types';

export default class VoteBody extends React.Component {
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