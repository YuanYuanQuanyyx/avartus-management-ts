import { userConstants } from '../../constants/users';

const initState = {
    loggingIn: false,
    loggedIn: false,
    authorizingIn: false,
    authorizedIn: false,
    user: "",
    error: ""
}

 export const authentication = (state = initState, action: any) => {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                loggedIn: false,
                error: action.error
            };
        case userConstants.AUTHORIZE_REQUEST:
            return {
                ...state,
                authorizingIn: true,
                user: action.user
            };
        case userConstants.AUTHORIZE_SUCCESS:
            return {
                ...state,
                authorizedIn: true,
                user: action.user
            };
        case userConstants.AUTHORIZE_FAILURE:
            return {
                ...state,
                authorizedIn: false,
                error: action.error
            };
        case userConstants.LOGOUT:
            return {
                loggedIn: false,
                user: {}
            };
        case userConstants.CHANGE_USER_NAME:
            return {
                ...state,
                user: action.user
            }
        default:
            return {
                ...state
            }
    }
 }