export const setEmployees = (employees) => {
  return {
    type: 'SET_EMPLOYEES',
    payload: employees,
  }
}