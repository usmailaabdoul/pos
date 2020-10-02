export const setToken = (token) => {
  console.log('set token')
  return {
    type: 'SET_TOKEN',
    payload: token,
  }
}

export const setUser = (user) => {
  console.log('set user')
  return {
    type: 'SET_USER',
    payload: user,
  }
}