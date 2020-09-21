const INITIAL_STATE = {
  token: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      const token = action.payload;
      console.log('reducer', token);

      return {...state, token};

    default:
      return state;
  }
};