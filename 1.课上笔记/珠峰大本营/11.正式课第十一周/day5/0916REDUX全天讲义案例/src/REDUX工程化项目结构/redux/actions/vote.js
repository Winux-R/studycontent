import * as TYPES from "../action-types";

let vote_action = {
    supportAction() {
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