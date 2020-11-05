import { combineReducers } from 'redux';
import authReducer from './authentification/authReducer'
import postsReducer from './posts/postsReducer'

const RootReducer = combineReducers({
  authentification: authReducer,
  posts: postsReducer
});

export default RootReducer;