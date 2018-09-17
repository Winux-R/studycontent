/*
 * 1.创建一个REDUX容器（附带了一个事件池）:CTEATE-STORE
 *   STORE:{
 *      DISPATCH：派发任务给REDUCER
 *      SUBSCRIBE：向事件池中追加方法
 *      GET-STATE：获取REDUX状态池中的状态信息
 *   }
 *
 *   执行CTEATE-STORE必须指定一个管理员REDUCER（函数），在REDUCER中完成状态信息的更新和管理
 */
//=>开始创建容器的时候，容器没有状态信息，那么第一次执行REDUCER（只有DISPATCH才会通知REDUCER执行），此时STATE是没有信息的，为了防止报错，我们给其一个初始状态信息值即可
import {createStore} from "redux";

function reducer(state = {
    n: 0,
    m: 0
}, action) {
    //=>REDUCER默认就会有一个STATE参数：存储的是当前REDUX容器中的状态信息
    //=>第二个参数ACTION是派发任务（DISPATCH）时候传递的行为对象：store.dispatch({ type:'XXX' }) TYPE行为标识是ACTION中必须具备的属性，这个是语法规范，只有这样REDUCER才能根据不同标识做不同的事情
    state = JSON.parse(JSON.stringify(state));//=>进来后先进行原始状态的深度拷贝，防止STATE的操作直接修改原始状态信息，我们需要最后RETURN的时候才修改
    return state;//=>RETURN的是什么，相当于把原有的状态信息修改成为什么
}

let store = createStore(reducer);