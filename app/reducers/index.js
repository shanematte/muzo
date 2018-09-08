import { combineReducers } from 'redux'

import loading from './loading'
import categories from './categories'
import toolTips from './tooltips'
import config from './config'
import likeds from './likeds'
import radio from './radio'

const reducers = (navReducers) => {
	return combineReducers({
		loading:loading,
		categories:categories,
		toolTips:toolTips,
		config:config,
		likeds:likeds,
		radio:radio,
		nav:navReducers
	})
}

export default reducers