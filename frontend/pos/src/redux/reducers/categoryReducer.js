const INITIAL_STATE = {
  categories: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      const categories = action.payload;


      return {...state, categories: [...categories]};

    default:
      return state;
  }
};