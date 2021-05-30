
 import { userConstants } from '../../constants/users';

 export const authentication = (state = {}, action: any) => {
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
                ...state,
                loggedIn: false,
                user: {}
            };
        default:
            return state
    }
 }