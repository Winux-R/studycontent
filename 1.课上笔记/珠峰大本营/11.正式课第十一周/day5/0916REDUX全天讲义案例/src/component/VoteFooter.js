import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as TYPES from '../redux/action-types';
import action from '../redux/actions';

class VoteFooter extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {supportAction, againstAction} = this.props;
        return <footer className='panel-footer'>
            <button className='btn-success' onClick={supportAction}>支持</button>
            &nbsp;&nbsp;
            <button className='btn-danger' onClick={againstAction}>反对</button>
        </footer>;
    }
}

/*
let mapDispatchToProps = (dispatch) => {
    //=>DISPATCH:就是STORE中派发任务的方法
    let {supportAction, againstAction} = action.vote;
    return {
        support() {
            dispatch(supportAction());
        },
        against() {
            dispatch(againstAction());
        }
    };
};
export default connect(null, mapDispatchToProps)(VoteFooter);
*/

export default connect(null, action.vote)(VoteFooter);
