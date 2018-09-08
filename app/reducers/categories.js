const initialState = {
	categories:[],
	games:[],
	tv:[],
	radio:[]
}

const categories = (state = initialState, action) => {
	switch(action.type){			

		case 'LOAD_ALL_CATEGORIES' :
			return {
				...state,
				categories:action.categories
			}

		case 'LOAD_GAMES' :
			return {
				...state,
				games:action.games
			}

		case 'LOAD_TV' :
			return {
				...state,
				tv:action.tv
			}

		case 'LOAD_RADIO' :
			return {
				...state,
				radio:action.radio
			}

		default :
			return state	

	}
}

export default categories