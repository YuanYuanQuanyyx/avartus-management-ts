export interface AuthState {
    loggedIn: boolean,
    authenticatedIn: boolean,
    user: GithubUser,
}

export interface GithubUser {
    [anyProp: string]: any
}

export interface RootState {
    authState: AuthState
  }