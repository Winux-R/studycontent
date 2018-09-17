import React from 'react';
import PropTypes from 'prop-types';
import VoteHeader from "./VoteHeader";
import VoteBody from "./VoteBody";
import VoteFooter from "./VoteFooter";

export default class Vote extends React.Component {
    static defaultProps = {
        title: '珠峰培训教学很棒！'
    };
    static propTypes = {
        title: PropTypes.string
    };

    /*祖先元素设置上下文信息*/
    static childContextTypes = {
        //=>设置后代元素中需要的上下文信息的类型：在CONSTRUCTOR执行前执行
        tt: PropTypes.string,
        n: PropTypes.number,
        m: PropTypes.number,
        change: PropTypes.func
    };

    getChildContext() {
        //=>生命周期函数：设置后代需要使用上下文的具体值，并且此生命周期函数会在每一次RENDER执行之前执行（第一次加载或者组件重新渲染，它都会执行）；并且它RETURN的是什么，后代能用的上下文信息就是什么
        return {
            tt: this.props.title,
            n: this.n,
            m: this.m,
            change: flag => {
                flag ? this.n++ : this.m++;
                this.forceUpdate();
            }
        };
    }

    constructor(props, context) {
        super(props, context);
        this.n = 0;
        this.m = 0;
    }

    render() {
        let styleOBJ = {
            width: '60%',
            margin: '20px auto'
        };

        return <section style={styleOBJ} className='panel panel-default'>
            <VoteHeader/>
            <VoteBody/>
            <VoteFooter/>
        </section>;
    }
}