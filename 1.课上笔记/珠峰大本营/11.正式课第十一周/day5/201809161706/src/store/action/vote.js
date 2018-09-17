import * as TYPES from '../action-types';

let vote_action = {
    supportAction() {
        //=>每一个方法返回的都是DISPATCH派发时候传递的ACTION对象
        return {
            type: TYPES.VOTE_SUPPORT
        }
    },
    againstAction() {
        return {
            type: TYPES.VOTE_AGAINST
        }
    }
};
export default vote_action;