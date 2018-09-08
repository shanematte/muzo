const initialState = {
	loading:false,
	splash:true
}

const loading = (state = initialState, action) => {
	switch(action.type){			

		case 'LOADING' :
			return {
				...state,
				loading:action.loading
			}

		case 'SPASHSCREEN' :
			return {
				...state,
				splash:action.splashStatus
			}

		default :
			return state	

	}
}

export default loading