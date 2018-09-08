import React, { Component } from 'react'
import getStore from './store/store'
import { Provider, connect } from 'react-redux'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'
import MainRoute from './routes/routes'

import {
	View,
	Text,
	Alert,
	AppState,
	BackHandler
} from 'react-native'

const navReducer = (state, action) => {
  	const nextState = MainRoute.router.getStateForAction(action, state)
  	return nextState || state
}

class StartApp extends Component {

	constructor(props){
		super(props)

		this.state = {
			appState: AppState.currentState
		}	

	}

  	componentWillUnmount() {
    	BackHandler.removeEventListener("hardwareBackPress", this.onBackPress.bind(this))

  	}

  	onBackPress(){

    	const { dispatch, nav } = this.props

	    if (nav.index === 0) {

	      	return false

	    }

    	dispatch(NavigationActions.back())
    	return true

  	}

	componentDidMount(){

		let that = this

		BackHandler.addEventListener("hardwareBackPress", this.onBackPress.bind(this))
		
	}

	render(){
		return(

	    	<MainRoute navigation={addNavigationHelpers({
	        	dispatch: this.props.dispatch,
	        	state: this.props.nav
	    	})} />

		)
	}

}

const mapStateToProps = (state) => ({
  	nav: state.nav
})

const AppWithNavigationState = connect(mapStateToProps)(StartApp)

const store = getStore(navReducer)

class Root extends Component {

  	render() {
	    return (
	      	<Provider store={store}>
	        	<AppWithNavigationState />
	      	</Provider>
	    )
  	}

}

export default Root

