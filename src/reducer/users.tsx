
 import { userConstants } from '../constants/users';

 export const authentication = (state = {}, action: any) => {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {
                loggedIn: false,
                error: action.error
            };
        case userConstants.AUTHORIZE_REQUEST:
            return {
                authorizingIn: true,
                user: action.user
            };
        case userConstants.AUTHORIZE_SUCCESS:
            return {
                authorizedIn: true,
                user: action.user
            };
        case userConstants.AUTHORIZE_FAILURE:
            return {
                authorizedIn: false,
                error: action.error
            };
        case userConstants.LOGOUT:
            return {
                loggedIn: false,
                user: {}
            };
        default:
            return state
    }
 }