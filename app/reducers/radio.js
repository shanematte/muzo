let initialState = {
	url:'',
	play:false
}

const radio = (state = initialState, action) => {

	switch(action.type){

		case 'SWITCH_URL' :
			return {
				...state,
				url:action.url
			}

		case 'SWITCH_PLAY' :
			return {
				...state,
				play:action.play
			}

		default :
			return state

	}

}

export default radio