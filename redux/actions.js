// action types
//export const UPDATE_USER = 'UPDATE_USER'
//export const UPDATE_CONTACT = 'UPDATE_CONTACT'


//export const ADD_FRIEND = 'ADD_FRIEND'



export const saveAcc = payload => {
  return {
    type: 'SAVE_LOCAL_ACCEL',
    payload,
  };
};





export const saveLoc = payload => {

  return {
    type: 'SAVE_LOCAL_LOCATION',
    payload,
  };
};


export const addData = payload => (
  {
    type: 'ADD_DATA',
    payload,
  }
);


/*

export const addFriend = friendIndex => (
  {
    type: ADD_FRIEND,
    payload: friendIndex,
  }
);



export const addData = data => (
  {
    type: 'ADD_DATA',
    payload: data,
  }
);



export const displayData = () => (
{
	type: 'DISPLAY_DATA',
	payload: index,
}
)





// action creators
export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
})

export const addContact = newContact => ({
  type: UPDATE_CONTACT,
  payload: newContact,
})*/
