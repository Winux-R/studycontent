import React from 'react';
import PropTypes from 'prop-types';

export default class VoteFooter extends React.Component {
    constructor(props, context) {
        super(props, context);
        //=>this.props.change：父组件传递过来的方法（方法是父组件的）
    }

    render() {
        return <footer className='panel-footer'>
            <button className='btn-success' onClick={ev => {
                //=>点击的时候把父组件的方法执行，并且根据点击按钮的不同，传递不同的信息过去
                this.props.change(true);
            }}>支持
            </button>
            &nbsp;&nbsp;
            <button className='btn-danger' onClick={ev => {
                this.props.change(false);
            }}>反对
            </button>
        </footer>;
    }
}