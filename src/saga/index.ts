import { all } from 'redux-saga/effects'
import { loginSaga } from './loginSaga'

export function* rootSaga() {
    yield all([loginSaga()]);
}