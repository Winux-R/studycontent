import {combineReducers} from 'redux';
import vote_reducer from './vote';
import person_reducer from './person';
import product_reducer from './product';

let reducer = combineReducers({
    vote: vote_reducer,
    person: person_reducer,
    product: product_reducer
});
export default reducer;

/*
 * REDUX中的STATE={
 *    VOTE:{n,m},
 *    PERSON:{n,baseInfo},
 *    PRODUCT:{}
 * }
 */