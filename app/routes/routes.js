import React from 'react'

import { StackNavigator } from 'react-navigation'

//Components
import Home from '../components/home'
import TV from '../components/tv'
import Radio from '../components/radio'
import WatchTv from '../components/watch-tv'
import Like from '../components/navigation/like'
import Settings from '../components/navigation/settings'
import GamesList from '../components/games-list'
import GamePlay from '../components/play-game'
import ListenRadio from '../components/listen-radio'

const MainRoute = StackNavigator({
	'Home':{
		screen:Home
	},
	'TV':{
		screen:TV
	},
	'Radio':{
		screen:Radio
	},
	'WatchTv':{
		screen:WatchTv
	},
	'Like':{
		screen:Like
	},
	'Settings':{
		screen:Settings
	},
	'GamesList':{
		screen:GamesList
	},
	'GamePlay':{
		screen:GamePlay
	},
	'ListenRadio':{
		screen:ListenRadio
	}
},{
	headerMode:'none'  
})

export default MainRoute


