import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import DataReducer from "./reducer.js";

let reducers = combineReducers({
  dataStore: DataReducer
});

const store = () =>
  createStore(reducers, composeWithDevTools(applyMiddleware()));

export default store;






/*import {createStore} from 'redux'

import {addFriend} from './actions'
import reducer from './reducer'


const store = createStore(reducer)




//store.dispatch(addFriend({name: 'david m', phone: '5050505050'}))

//store.dispatch(addFriend({'mnh'}))
//console.log(store.getState())

export default store*/
