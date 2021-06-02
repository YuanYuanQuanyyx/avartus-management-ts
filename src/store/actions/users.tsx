import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { message } from 'antd';
import {history} from '../../utils/history';
import { loginFailure, loginSuccess, authenticateSuccess, authenticateFailure } from '../../slices/auth';


const login = (email: any, password: any, remember: boolean) => {

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
                console.log(res);
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
                    dispatch(authenticateSuccess(decodedToken.email));
                    dispatch(loginSuccess(decodedToken.email));
                    history.push('/user/regular');
                }
            }
        })
        .catch( () => {
            message.error("Incorrect pin!");
            dispatch(authenticateFailure());
            dispatch(loginFailure());
        });
    };
}

export const userActions = {
    login,
    authorize
};