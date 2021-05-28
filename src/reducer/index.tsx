import { combineReducers } from 'redux';
import { authentication } from './users'

const reducer = combineReducers({
    authentication
});

export default reducer;