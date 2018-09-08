const initialState = {
	home:true,
	games:true,
	tv:true,
	radio:true
}

const toolTips = (state = initialState, action) => {
	switch(action.type){			

		case 'HOME_TOOLTIP' :
			return {
				...state,
				home:action.homeTollTipStatus
			}

		case 'GAMES_TOOLTIP' :
			return {
				...state,
				games:action.gamesTollTipStatus
			}

		case 'TV_TOOLTIP' :
			return {
				...state,
				tv:action.tvTollTipStatus
			}

		case 'RADIO_TOOLTIP' :
			return {
				...state,
				radio:action.radioTollTipStatus
			}

		default :
			return state	

	}
}

export default toolTips