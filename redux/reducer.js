import {combineReducers} from 'redux'



let initialState = {
  currentId: 1,
  data: [
    {
      id: 1,
      time: new Date().getTime(),
      accelerometerData: {x: 0, y: 0, z: 0},
      
    },
  ],
  lastAccel: {
    id: 1,
    time: new Date().getTime(),
    accelerometerData: {x: 0, y: 0, z: 0}
  },
  current:[],
  
};


export default (state = initialState, action) => {
  let {type, payload} = action;
  switch(type){
    case "SAVE_LOCAL_ACCEL":
      let newId = state.currentId + 1;

      const newEntry = {
        id: newId,
        time: new Date().getTime(),
        accelerometerData: payload,
        
      }

      const newState = {
        ...state,
        currentId: newId,
        data: [...state.data, newEntry],
        lastAccel: newEntry,
      };
       return newState;
	
	
	 case "'ADD_DATA":
	    return [...state, payload]
		
	
	 default:
      return state;
   }
};










/*import {combineReducers} from 'redux'



const INITIAL_STATE = {
	accelerometerData: {x:0,y:0,z:0},
  current: [],
  possible: [
    'Allie',
    'Gator',
    'Lizzie',
    'Reptar',
  ],
};

const friendReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
	  case 'ADD_FRIEND':
	  
	    const {
        current,
        possible,
      } = state;
	  
	  const addedFriend = possible.splice(action.payload, 1);
	  
	  current.push(addedFriend);
	  
	  const newState = { current, possible };
      return newState;
	  
    default:
      return state
  }
};

const acceleroReducer = ( state = INITIAL_STATE, action) => {
	if (action.type === 'ADD_DATA'){
		return Object.assign({},state,{
			curennt: state.current.concat(action.payload)
		})
		
	}
	return state;
}



const reducer = combineReducers({
 friends: friendReducer,
 data: acceleroReducer ,
 
})
*/
/*export default combineReducers({
  friends: friendReducer,
});*/
//export default reducer


/*const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return merge(state, action.payload)
    case UPDATE_CONTACT:
      return merge(state, {prevContact: action.payload})
    default:
      return state
  }
}
*/
/*const reducer = combineReducers({
  user: userReducer,
  contacts: contactReducer,
})

export default reducer
*/