/*
 * CREATE-STORE：创建REDUX容器存储公共状态信息（并且要创建事件池）
 *   @PARAM
 *     REDUCER：修改容器状态的管理员（函数）
 *   @RETURN
 *    {
 *      DISPATCH,
 *      GET-STATE,
 *      SUBSCRIBE
 *    }
 */
export function createStore(reducer) {
    //=>STATE存储公共的状态，LISTENERS存储事件池方法
    let state,
        listeners = [];

    //=>GET-STATE:获取公共状态信息
    function getState() {
        //=>返回的STATE深拷贝，这样外面获取到的和本身的STATE不是同一个空间，修改状态只能走DISPATCH（REDUX这里处理的是不完善的）
        state = JSON.parse(JSON.stringify(state));
        return state;
    }

    //=>SUBSCRIBE：向事件池中追加方法
    function subscribe(fn) {
        for (let i = 0; i < listeners.length; i++) {
            let listener = listeners[i];
            if (listener === fn) {
                return new Function();//=>返回空函数，别人执行的时候什么都不处理，但是也不会报错（不重复情况下返回删除的函数）
            }
        }
        listeners.push(fn);

        //=>返回移除方法的操作
        return function unsubscribe() {
            let index = listeners.indexOf(fn);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    }

    //=>DISPATCH：派发任务，通知REDUCER执行
    function dispatch(action) {
        if (!('type' in action)) {
            throw new SyntaxError('ACTION行为对象必须要有TYPE行为标识，请检查你的代码！');
        }
        //=>执行REDUCER,把其返回的最新状态替换现有的状态信息
        try {
            state = reducer(state, action);
            //=>通知事件池中的方法执行：优化处理应该是检测状态是否发生改变，改变我们才会执行方法，否则执行方法没啥意义
            for (let i = 0; i < listeners.length; i++) {
                let listener = listeners[i];
                typeof listener === 'function' ? listener() : null;
            }
        } catch (e) {
            throw new SyntaxError('REDUCER执行发生异常!');
        }
    }

    //=>开始创建REDUX容器的时候，我们默认先执行一遍DISPATCH（给容器设置初始值）
    dispatch({
        type: `@@redux/INIT${Math.random()}`
    });

    return {
        getState,
        subscribe,
        dispatch
    };
}
