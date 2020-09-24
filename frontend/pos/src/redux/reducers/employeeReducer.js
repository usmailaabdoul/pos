const INITIAL_STATE = {
  employees: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_EMPLOYEES':
      const employees = action.payload;


      return {...state, employees: [...employees]};

    default:
      return state;
  }
};