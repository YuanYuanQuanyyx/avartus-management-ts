export interface RootState {
    loggingIn: boolean,
    loggedIn: boolean,
    authorizingIn: boolean,
    authorizedIn: boolean,
    user: any,
    error: any
}

const initState: RootState = {
    loggingIn: false,
    loggedIn: false,
    authorizingIn: false,
    authorizedIn: false,
    user: {},
    error:{}
}

export default initState