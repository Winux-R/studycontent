import React from 'react';
import PropTypes from 'prop-types';

export default class VoteHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <header className='panel-heading'>
            <h2 className='panel-title'>
                {this.props.tt}
            </h2>
        </header>;
    }
}