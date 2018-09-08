import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers/index'
import { persistStore, autoRehydrate } from 'redux-persist'

import {
	AsyncStorage
} from 'react-native'

const getStore = (navReducers) => {

	const store = createStore(reducers(navReducers), undefined, compose(applyMiddleware(thunk), autoRehydrate()))

	persistStore(store, {
		blacklist:['nav', 'loading', 'categories', 'radio'],
		whitelist:['toolTips', 'config', 'likeds'],
		storage:AsyncStorage
	})

	return store

}

export default getStore