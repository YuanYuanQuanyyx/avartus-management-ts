import { combineReducers, Reducer } from 'redux'

import authReducer from '../../slices/auth'
import { RootState } from '../state/users'

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  authState: authReducer,
})

export default rootReducer
