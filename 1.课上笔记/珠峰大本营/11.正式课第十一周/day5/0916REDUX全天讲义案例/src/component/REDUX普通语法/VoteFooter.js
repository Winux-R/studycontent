import React from 'react';
import PropTypes from 'prop-types';

export default class VoteFooter extends React.Component {
    static contextTypes = {
        store: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {store} = this.context;
        return <footer className='panel-footer'>
            <button className='btn-success'
                    onClick={() => {
                        store.dispatch({type: 'A'});
                    }}>支持
            </button>
            &nbsp;&nbsp;
            <button className='btn-danger'
                    onClick={() => {
                        store.dispatch({type: 'B'});
                    }}>反对
            </button>
        </footer>;
    }
}