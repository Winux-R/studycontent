import * as TYPES from '../action-types';

export default function vote_reducer(state = {
    n: 0,
    m: 0
}, action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case TYPES.VOTE_SUPPORT:
            state.n++;
            break;
        case TYPES.VOTE_AGAINST:
            state.m++;
            break;
    }
    return state;
}