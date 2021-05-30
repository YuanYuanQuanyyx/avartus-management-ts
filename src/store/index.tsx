import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';
//import initState from './state/users';

const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware
    )
);

export default store;