import { all, put, takeLatest, select } from 'redux-saga/effects'
import { loginSaga } from './loginSaga'

export function* rootSaga() {
    yield all([loginSaga()]);
}