/*
 * 把多个REDUCER合并成为一个REDUCER
 *   COMBINE-REDUCERS({
 *      [KEY]:[VALUE是某一个需要合并的REDUCER],
 *      ...
 *   })
 *
 *  导致的影响
 *    1.REDUX容器中的状态也是按照合并REDUCER时候指定的KEY值分开存储管理的，列举当前案例合并的结果：
 *     STATE={
 *        VOTE:{
 *           n:0,
 *           m:0
 *        },
 *        PERSON:{
 *          n:0,
 *          baseInfo:null
 *        }
 *     }
 */
import {combineReducers} from 'redux';
import vote_reducer from './vote';
import person_reducer from './person';

let reducer = combineReducers({
    vote: vote_reducer,
    person: person_reducer
});
export default reducer;


/*
function combineReducers(reducers = {}) {
    //=>COMBINATION:合并后大的REDUCER(DISPATCH派发执行的就是这个方法)
    return function combination(state = {}, action) {
        //=>在大的REDUCER中把每一个小的REDUCER执行一遍
        for (const key in reducers) {
            if (!reducers.hasOwnProperty(key)) break;
            let reducer = reducers[key];//=>每一次遍历的小REDUCER(每一个板块对应的REDUCER)
            //=>state[key]:每一个板块对应的STATE
            state[key] = reducer(state[key], action);
        }
        return state;
    }
}
*/
