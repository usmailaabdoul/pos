const INITIAL_STATE = {
    items: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            const items = action.payload;
            return { ...state, items: [...items] };

        default:
            return state;
    }
};