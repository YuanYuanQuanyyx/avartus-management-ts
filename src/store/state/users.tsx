export interface AuthState {
    loggedIn: boolean,
    authenticatedIn: boolean,
    user: any
    userInfo?: UserInfo
}

export interface UserInfo {
    username?: string,
    password?: string,
    remember?: boolean,
    otp_uuid?: string
    pin?: number
}

export interface RootState {
    authState: AuthState
  }