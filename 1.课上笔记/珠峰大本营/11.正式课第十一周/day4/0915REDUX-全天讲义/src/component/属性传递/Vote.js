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

    constructor(props, context) {
        super(props, context);

        // this.state = {n: 0, m: 0};
        this.n = 0;
        this.m = 0;
    }

    render() {
        let styleOBJ = {
            width: '60%',
            margin: '20px auto'
        };

        // let {n, m} = this.state;
        let {n, m} = this;

        return <section style={styleOBJ} className='panel panel-default'>
            {/*父组件VOTE把接收到的标题基于TT属性传递给子组件HEADER*/}
            <VoteHeader tt={this.props.title}/>

            <VoteBody n={n} m={m}/>

            {/*把父组件的某一个方法当做属性传递给子组件*/}
            <VoteFooter change={this.changeCount}/>
        </section>;
    }

    //=>父组件设置一个方法：CHANGE-COUNT
    changeCount = (flag) => {
        //=>在FOOTER点击的时候才执行
        //=>FLAG：TRUE支持 FALSE反对
        /*if (flag) {
            this.setState({
                n: this.state.n + 1
            });
            return;
        }
        this.setState({
            m: this.state.m + 1
        });*/

        flag ? this.n++ : this.m++;
        this.forceUpdate();
    }
}