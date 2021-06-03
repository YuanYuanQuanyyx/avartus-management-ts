import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../saga';
import { configureStore } from '@reduxjs/toolkit'

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: reducer,
    middleware: [sagaMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
  })

sagaMiddleware.run(rootSaga);

export default store;