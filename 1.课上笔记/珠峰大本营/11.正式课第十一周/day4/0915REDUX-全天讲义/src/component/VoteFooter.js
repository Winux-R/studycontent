import React from 'react';
import PropTypes from 'prop-types';

export default class VoteFooter extends React.Component {
    static contextTypes = {
        change: PropTypes.func
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {change} = this.context;
        return <footer className='panel-footer'>
            <button className='btn-success'
                    onClick={change.bind(null, true)}>支持
            </button>
            &nbsp;&nbsp;
            <button className='btn-danger'
                    onClick={change.bind(null, false)}>反对
            </button>
        </footer>;
    }
}