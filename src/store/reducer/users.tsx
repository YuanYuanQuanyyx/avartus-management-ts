import { userConstants } from '../../constants/users';

const initState = {
    loggedIn: false,
    authorizedIn: false,
    user: {}
}

 export const authentication = (state = initState, action: any) => {
    switch (action.type) {
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