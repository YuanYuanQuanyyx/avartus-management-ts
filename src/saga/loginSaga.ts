
import axios, { AxiosResponse } from 'axios';
import { put, takeLatest, select, call } from 'redux-saga/effects';
import { callbackify } from 'util';
import { getAuth } from '../selectors';
import { loginFailure, loginRequest, loginSuccess } from '../slices/auth';


export function* loginSaga() {
    console.log("loginSaga");
    yield takeLatest(loginRequest, function*(): Generator<any, any, any> {
        try {

            const {user} = yield select(getAuth);
            const { username, password, remember } = user
            console.log("state:", user);
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

            let res
            const getResponse = (): Promise<AxiosResponse<any>> => {
                const promise = new Promise<AxiosResponse<any>>(resolve => {
                  setTimeout(() => {
                    res = axios.post('https://avartus.cmu.edu.au/api/v1/auth', data)
                    resolve(res);
                  }, 500);
                });
                return promise;
            };

            const response = yield call(getResponse)

            console.log(response)

            yield put (loginSuccess(username))

        } catch (error) {
            yield put(loginFailure())
          }
    });
}