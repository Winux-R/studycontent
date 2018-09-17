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
        this.context.store.subscribe(() => {
            this.forceUpdate();
        });
    }

    render() {
        let {n, m} = this.context.store.getState().vote,
            rate = n + m === 0 ? '100%' : (n / (n + m) * 100).toFixed(2) + '%';
        return <main className='panel-body'>
            支持人数：{n}人 <br/>
            反对人数：{m}人 <br/>
            支持比率：{rate}
        </main>;
    }
}