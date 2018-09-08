const initialState = {
	firstname:''
}

const config = (state = initialState, action) => {
	switch(action.type){			

		case 'UPDATE_USER_FIRSTNAME' :
			return {
				...state,
				firstname:action.firstname
			}

		default :
			return state	

	}
}

export default config