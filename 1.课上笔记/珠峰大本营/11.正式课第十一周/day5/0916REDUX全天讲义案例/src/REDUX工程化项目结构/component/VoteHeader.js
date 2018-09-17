import React from 'react';
import PropTypes from 'prop-types';

export default class VoteHeader extends React.Component {
    /*需要用到哪一个上下文信息，就指定哪一个的类型即可（类型和之前设定的类型一致才可以），它也是在CONSTRUCTOR执行之前执行*/
    static contextTypes = {
        tt: PropTypes.string
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <header className='panel-heading'>
            <h2 className='panel-title'>
                {this.context.tt}
            </h2>
        </header>;
    }
}