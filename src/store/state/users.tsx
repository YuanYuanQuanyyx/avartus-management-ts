export interface RootState {
    authentication: {
        loggedIn: boolean,
        authorizedIn: boolean,
        user: string,
    }
}
