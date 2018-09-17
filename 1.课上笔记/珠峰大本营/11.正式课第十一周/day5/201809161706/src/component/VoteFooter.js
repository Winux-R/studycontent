import React from 'react';
import PropTypes from 'prop-types';
import action from '../store/action';

export default class VoteFooter extends React.Component {
    static contextTypes = {
        store: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {store} = this.context,
            {supportAction, againstAction} = action.vote;
        return <footer className='panel-footer'>
            <button className='btn-success'
                    onClick={() => {
                        store.dispatch(supportAction());
                    }}>支持
            </button>
            &nbsp;&nbsp;
            <button className='btn-danger'
                    onClick={() => {
                        store.dispatch(againstAction());
                    }}>反对
            </button>
        </footer>;
    }
}