const INITIAL_STATE = {
  customers: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CUSTOMERS':
      const customers = action.payload;


      return {...state, customers: [...customers]};

    default:
      return state;
  }
};