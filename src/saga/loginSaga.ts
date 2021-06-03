
import axios, { AxiosResponse } from 'axios';
import { put, takeLatest, select, call } from 'redux-saga/effects';
import { getAuth } from '../selectors';
import { authenticateRequest, authenticateFailure, authenticateSuccess, loginFailure, loginRequest, loginSuccess } from '../slices/auth';
import { history } from '../utils/history'

function* regularLogin(): Generator<any, any, any> {
    try {

        const { userInfo } = yield select(getAuth);
        const { username, password, remember } = userInfo

        var data = remember ? {
            "args":{
                "email": username,
                "password": password,
                "expire": "<2592000 seconds>"
            }
        } :
        {
            "args":{
                "email": username,
                "password": password,
            }
        }

        const getResponse = (): Promise<AxiosResponse<any>> => {
            const promise = new Promise<AxiosResponse<any>>(resolve => {
                let res = axios.post('https://avartus.cmu.edu.au/api/v1/auth', data)
                resolve(res);
            });
            return promise
        }

        const res = yield call(getResponse)
        if(res.status === 200) {
            if (res.data.result.token) {
                localStorage.setItem('token', res.data.result.token)
                yield put (loginSuccess(username))
                //console.log(res.data)
                history.push('/user/regular')
            } else if (res.data.result.otp_uuid) {
                localStorage.setItem('otp_uuid', res.data.result.otp_uuid)
                history.push('/user/admin')
            }
        }
    } catch (error) {
        yield put(loginFailure())
        }
}

function* adminLogin(): Generator<any, any, any> {
    try {
        const { userInfo } = yield select(getAuth);
        const { user } = yield select(getAuth);
        const { pin } = userInfo
        const otp_uuid = localStorage.getItem('otp_uuid')

        var data = {
            "args":{
                "otp_uuid": otp_uuid,
                "otp": pin
            }
        }

        const getResponse = (): Promise<AxiosResponse<any>> => {
            const promise = new Promise<AxiosResponse<any>>(resolve => {
                let res = axios.post('https://avartus.cmu.edu.au/api/v1/auth', data)
                resolve(res);
            });
            return promise
        }

        const res = yield call(getResponse)

        if(res.status === 200) {
            if (res.data.result.token) {
                localStorage.setItem('token', res.data.result.token)
                yield put (authenticateSuccess(user))
                history.push('/user/regular')
            }
        }
    } catch (error) {
        yield put(authenticateFailure())
    }
}

export function* loginSaga() {
    console.log("loginSaga");
    yield takeLatest(loginRequest, regularLogin);
    yield takeLatest(authenticateRequest, adminLogin);
}

