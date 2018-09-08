const initialState = {
	likedsTv:[],
	likedsRadio:[],
	likedsGames:[]
}

const likeds = (state = initialState, action) => {
	switch(action.type){			

		case 'ADD_LIKE_TV' :
			return {
				...state,
				likedsTv:[...state.likedsTv, action.likeTv]
			}

		case 'CLEAN_TV' :
			return {
				...state,
				likedsTv:[],
			}

		case 'ADD_LIKE_RADIO' :
			return {
				...state,
				likedsRadio:[...state.likedsRadio, action.likeRadio]
			}

		case 'ADD_LIKE_GAME' :
			return {
				...state,
				likedsGames:[...state.likedsGames, action.likeGame]
			}

		case 'REMOVE_GAME' :

			state.likedsGames.splice(action.index, 1)

			return {
				...state
			}

		case 'REMOVE_RADIO' :

			state.likedsRadio.splice(action.index, 1)

			return {
				...state
			}

		case 'REMOVE_TV' :

			state.likedsTv.splice(action.index, 1)

			return {
				...state
			}

		default :
			return state	

	}
}

export default likeds