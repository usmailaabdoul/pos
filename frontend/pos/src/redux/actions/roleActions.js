export const setRoles = (roles) => {
    console.log('set roles')
    return {
        type: 'SET_ROLES',
        payload: roles,
    }
}