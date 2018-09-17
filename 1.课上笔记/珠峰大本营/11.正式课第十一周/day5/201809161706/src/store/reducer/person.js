import * as TYPES from '../action-types';

export default function person_reducer(state = {
    n: 0,
    baseInfo: null
}, action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case TYPES.PERSON_BASE:
            state.baseInfo = {
                name: '珠峰培训',
                age: 10
            };
            break;
    }
    return state;
}