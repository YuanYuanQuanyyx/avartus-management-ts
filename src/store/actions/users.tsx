import { userConstants } from '../../constants/users';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { message } from 'antd';


const login = (email: any, password: any, remember: boolean) => {

    const loginRequest = (user: any) => {
        return { type: userConstants.LOGIN_REQUEST, user }
    }
    const loginSuccess = (user: any) => {
        return { type: userConstants.LOGIN_SUCCESS, user }
    }
    const loginFailure = (error: any) => {
        return { type: userConstants.LOGIN_FAILURE, error }
    }
    const authorizeRequest = (user: any) => {
        return { type: userConstants.AUTHORIZE_REQUEST, user }
    }

    return (dispatch: any) => {
        dispatch(loginRequest(email));

        var data = remember ? {
            "args":{
                "email": email,
                "password": password,
                "expire": "<2592000 seconds>"
            }
        } :
        {
            "args":{
                "email": email,
                "password": password,
            }
        }

        axios.post('https://avartus.cmu.edu.au/api/v1/auth', data)
        .then( res => {
            if (res.status === 200) {
                //console.log(res);
                if (res.data.result.token) {
                    //console.log("Received token from backend:", res.data.result.token);
                    localStorage.setItem('token', res.data.result.token);
                    var decodedToken:any = jwt_decode(res.data.result.token);
                    dispatch(loginSuccess(decodedToken.email));
                } else if (res.data.result.otp_uuid) {
                    localStorage.setItem('otp_uuid', res.data.result.otp_uuid);
                    dispatch(authorizeRequest(email));
                }
            }
        })
        .catch( error => {
            message.error("Incorrect username or password!")
            dispatch(loginFailure(error.message));
        });
    };
}

const authorize = (otp_uuid: any, pin: number) => {

    const authorizeSuccess = (user: any) => {
        return { type: userConstants.AUTHORIZE_SUCCESS, user }
    }
    const authorizeFailure = (error: any) => {
        return { type: userConstants.AUTHORIZE_FAILURE, error }
    }
    const loginSuccess = (user: any) => {
        return { type: userConstants.LOGIN_SUCCESS, user }
    }
    const loginFailure = (error: any) => {
        return { type: userConstants.LOGIN_FAILURE, error }
    }

    return (dispatch: any) => {

        var data = {
            "args":{
                "otp_uuid": otp_uuid,
                "otp": pin
            }
        }

        axios.post('https://avartus.cmu.edu.au/api/v1/auth', data)
        .then( res => {
            if (res.status === 200) {
                if (res.data.result.token) {
                    localStorage.setItem('token', res.data.result.token)
                    var decodedToken:any = jwt_decode(res.data.result.token);
                    dispatch(authorizeSuccess(decodedToken.email));
                    dispatch(loginSuccess(decodedToken.email));
                }
            }
        })
        .catch( error => {
            message.error("Incorrect pin!");
            dispatch(authorizeFailure(error.message));
            dispatch(loginFailure(error.message));
        });
    };
}

const logout = () => {
    return { type: userConstants.LOGOUT };
}

export const userActions = {
    login,
    authorize,
    logout
};