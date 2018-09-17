import React from 'react';
import PropTypes from 'prop-types';

/*
 * PROVIDER：项目的根组件
 *   1. 接收传递给组件的STORE
 *   2. 把STORE挂载到上下文中
 */
class Provider extends React.Component {
    //=>把基于属性传递进来的STORE挂载到上下文中
    static childContextTypes = {
        store: PropTypes.object
    };

    getChildContext() {
        return {
            store: this.props.store
        };
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        //=>把根组件包含的所有的内容(项目中的组件)渲染即可
        return this.props.children;
    }
}

/*
 * CONNECT：高阶组件
 *   @PARAMS
 *      MAP-STATE：回调函数，我们需要把回调函数执行的结果（执行的时候把总的STATE传递给他，返回的结果是当前组件需要的STATE）基于属性传递给组件
 *      MAP-DISPATCH：回调函数，我们需要把回调函数执行的结果（执行的时候把DISPATCH传递给他，返回的结果是当前组件需要派发的方法）基于属性传递给组件
 *   @RETURN
 *      返回一个高阶函数（项目中紧着这会把这个函数执行）
 */
function connect(mapStateToProps, mapDispatchToProps) {
    //=>让REACT-REDUX支持传递的MAP-DISPATCH是ACTION-CREATOR中的对象
    if (mapDispatchToProps != null && typeof mapDispatchToProps !== 'function') {
        let actionOBJ = mapDispatchToProps;
        mapDispatchToProps = function mapDispatchToProps(dispatch) {
            let res = {};
            for (let attr in actionOBJ) {
                if (!actionOBJ.hasOwnProperty(attr)) break;
                res[attr] = function () {
                    dispatch(actionOBJ[attr]());
                };
            }
            return res;
        }
    }

    /*
     * HIGHER-ORDER：返回的高阶函数
     *   @PARAMS
     *      COMPONENT：最终需要处理的组件（我们就是把容器中的状态和DISPATCH派发方法当做属性传递给这个组件的）
     *   @RETURN
     *      需要是一个组件（代理组件：基于代理组件我们可以完成CONNECT需要实现的功能）
     */
    return function higherOrder(Component) {
        /*
         * PROXY需要实现的功能
         *   1.从上下文中获取到STORE
         *   2.把执行方法返回的值当做属性传递组件
         *   3.容器中状态改变，需要通知组件重新渲染
         */
        return class Proxy extends React.Component {
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
                //=>PROPS-PASS：执行两个方法得到的需要传递给组件的属性
                //=>THIS.PROPS：调取PROXY组件的时候传递给PROXY的属性，但是这些属性本身就是为了传递给对应组件的
                let propsPass = this.queryProps();
                return <Component {...propsPass} {...this.props}/>;
            }

            //=>执行两个回调函数获取需要传给递组件的属性信息
            queryProps = () => {
                let store = this.context.store,
                    state = store.getState(),
                    dispatch = store.dispatch;

                state = typeof mapStateToProps === 'function' ? mapStateToProps(state) : null;
                dispatch = typeof mapDispatchToProps === 'function' ? mapDispatchToProps(dispatch) : null;

                return {
                    ...state,
                    ...dispatch
                };
            };
        }
    }
}

export {
    Provider,
    connect
};