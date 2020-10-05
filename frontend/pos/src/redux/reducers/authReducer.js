const INITIAL_STATE = {
    token: '',
    user: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            const token = action.payload;

            return { ...state, token };
        case 'SET_USER':
            const user = action.payload;

            return { ...state, user };
        default:
            return state;
    }
};