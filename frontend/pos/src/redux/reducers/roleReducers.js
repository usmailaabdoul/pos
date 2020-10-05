const INITIAL_STATE = {
    roles: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_ROLES':
            return { ...state, roles: [...action.payload] }
        default:
            return state
    }
};