export interface RootState {
    authentication: {
        loggingIn: boolean,
        loggedIn: boolean,
        authorizingIn: boolean,
        authorizedIn: boolean,
        user: string,
        error: string
    }
}
