import { createStore , compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import RootReducer from './rootReducer';

let store = createStore (
  RootReducer,
  compose(applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;