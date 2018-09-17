import * as TYPES from '../action-types';

export default function product_reducer(state = {}, action) {
    state = JSON.parse(JSON.stringify(state));
    //...
    return state;
}