import { userConstants } from '../../constants/users';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { message } from 'antd';
import {history} from '../../utils/history';


const login = (email: any, password: any, remember: boolean) => {

    const loginSuccess = (user: any) => {
        return { type: userConstants.LOGIN_SUCCESS, user }
    }
    const loginFailure = () => {
        return { type: userConstants.LOGIN_FAILURE }
    }

    return (dispatch: any) => {

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
                    dispatch(loginSuccess(email));
                    history.push('/user/regular');
                } else if (res.data.result.otp_uuid) {
                    localStorage.setItem('otp_uuid', res.data.result.otp_uuid);
                    history.push('/user/admin');
                }
            }
        })
        .catch( () => {
            message.error("Incorrect username or password!")
            dispatch(loginFailure());
        });
    };
}

const authorize = (otp_uuid: any, pin: number) => {

    const authorizeSuccess = (user: any) => {
        return { type: userConstants.AUTHORIZE_SUCCESS, user }
    }
    const authorizeFailure = () => {
        return { type: userConstants.AUTHORIZE_FAILURE }
    }
    const loginSuccess = (user: any) => {
        return { type: userConstants.LOGIN_SUCCESS, user }
    }
    const loginFailure = () => {
        return { type: userConstants.LOGIN_FAILURE }
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
                    history.push('/user/regular');
                }
            }
        })
        .catch( () => {
            message.error("Incorrect pin!");
            dispatch(authorizeFailure());
            dispatch(loginFailure());
        });
    };
}

const logout = () => {
    return { type: userConstants.LOGOUT };
}

const changeName = (user:string) => {
    return {type: userConstants.CHANGE_USER_NAME, user}
}

export const userActions = {
    login,
    authorize,
    logout,
    changeName
};