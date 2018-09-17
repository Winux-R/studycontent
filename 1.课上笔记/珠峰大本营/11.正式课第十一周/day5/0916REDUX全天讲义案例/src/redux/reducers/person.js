import * as TYPES from '../action-types';

export default function person_reducer(state = {
    n: 0,
    baseInfo: null
}, action) {
    state = JSON.parse(JSON.stringify(state));
    //...
    return state;
}