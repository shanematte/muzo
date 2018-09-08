import React, { Component } from 'react'

import {
	View,
	Text,
	ScrollView,
	Alert,
	StyleSheet,
	Dimensions,
	Image,
	TouchableOpacity,
	StatusBar,
	requireNativeComponent,
	NativeModules
} from 'react-native'

import { connect } from 'react-redux'
import axios from 'axios'
import _ from 'underscore'
import { AppEventsLogger } from 'react-native-fbsdk'

//components
import Loader from './helpers/loader'
import Splash from './helpers/splash'
import NavigationBottomHome from './helpers/bottom-navigation'
import Orientation from 'react-native-orientation'

//ad
import { Appodeal } from 'react-native-appodeal'
Appodeal.initialize("a9e4912676723f4fcf95077c1344f47f6983af1f480729c3", Appodeal.INTERSTITIAL)
Appodeal.setAutoCache(Appodeal.INTERSTITIAL, true)

//adjust
import { configuration } from '../config/config'
import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust'

const { width, height } = Dimensions.get('window')

class Home extends Component {

	constructor(props){
		super(props)

		this.state = {
			clickButton:true,
			sprite:1,
			status:true
		}

	}

	componentWillMount() {

		this.checkBanner = this.checkBanner.bind(this)

		let adjustConfig = new AdjustConfig('j60kc0gnzrb4', AdjustConfig.EnvironmentProduction)

		Adjust.create(adjustConfig)

	}

	componentDidMount(){

		let that = this

		setTimeout(()=>{
			that.props.splashStatus(false)
		}, 3500)

		this.loadCategories()

		Appodeal.addEventListener('onInterstitialClicked', () => {
			
			let adjustEvent = new AdjustEvent("my95w8")
			Adjust.trackEvent(adjustEvent)

		})		

	}

	checkBanner(){

		Appodeal.isLoaded(Appodeal.INTERSTITIAL, (isLoaded) => {

			if(isLoaded){
				Appodeal.show(Appodeal.INTERSTITIAL, "initial_screen", (result) => console.log(result))

				let adjustEvent = new AdjustEvent("hdt1no")
				Adjust.trackEvent(adjustEvent)

			}

		})

	}

	loadCategories(){

		let that = this

		that.props.loadingStatus(true)

		axios
		.post('http://91.228.153.70:5554/get/links')
		.then((cats)=>{

			that.props.loadingStatus(false)

			that.props.loadAllCategories(cats.data)

			that.props.loadGames(cats.data.gamelist)
			that.props.loadTv(cats.data.tvlist)
			that.props.loadRadio(cats.data.radiolist)


		})
		.catch(()=>{
			Alert.alert('Error', 'Error on server')
			that.props.loadingStatus(false)
		})

	}

  	componentWillUnmount() {
    	Adjust.componentWillUnmount()

  	}

	goToTV(){

		let { clickButton } = this.state
		let that = this

		if(clickButton){

			this.setState({
				clickButton:false
			})

			AppEventsLogger.logEvent( 'user_go_to_tv', 0, {
				eventName:'Пользователь перешел в категорию TV'
			} )

			let adjustEvent = new AdjustEvent("f9ougv")
			Adjust.trackEvent(adjustEvent)

			setTimeout(()=>{
				that.setState({
					clickButton:true
				})
			}, 900)

			let { navigate } = this.props.navigation
			return navigate('TV')

		}

	}

	goToRadio(){

		let { clickButton } = this.state
		let that = this

		if(clickButton){

			this.setState({
				clickButton:false
			})

			let adjustEvent = new AdjustEvent("gu4f1k")
			Adjust.trackEvent(adjustEvent)

			AppEventsLogger.logEvent( 'user_go_to_radio', 0, {
				eventName:'Пользователь перешел в категорию RADIO'
			} )

			setTimeout(()=>{
				that.setState({
					clickButton:true
				})
			}, 900)

			let { navigate } = this.props.navigation
			return navigate('Radio')

		}

	}

	goToGames(){

		let { clickButton } = this.state
		let that = this

		if(clickButton){

			this.setState({
				clickButton:false
			})

			AppEventsLogger.logEvent( 'user_go_to_games_list', 0, {
				eventName:'Пользователь перешел в категорию GAMES'
			} )

			let adjustEvent = new AdjustEvent("nu0wx9")
			Adjust.trackEvent(adjustEvent)

			setTimeout(()=>{
				that.setState({
					clickButton:true
				})
			}, 900)

			let { navigate } = this.props.navigation
			return navigate('GamesList')

		}

	}

	render(){

		let { categories, games, tv, radio } = this.props.categories
		let { sprite } = this.state

		return(
			<View>
				<Splash/>
				<Loader/>
				<View style={styles.viewContent}>

					<TouchableOpacity onPress={this.checkBanner} style={styles.adButton}>
						<Image style={styles.adButtonSprite} source={require('../media/mayk/hendance.gif')}/>
					</TouchableOpacity>

					<TouchableOpacity onPress={this.goToTV.bind(this)} activeOpacity={0.95} style={styles.styleCat}>
						<Image style={styles.styleCatImage} source={require('../media/tv.jpg')}/>
						<View style={styles.styleCatOverlay}></View>

						<View style={styles.countItemsContent}>
							<View style={styles.countItems}>
								<Text style={styles.countItemsText}>{tv.length}</Text>
								<Image source={require('../media/online.png')} style={styles.onlineStatus}/>
							</View>
						</View>

						<View style={styles.styleCatContent}>
							<Image style={styles.iconButtonTV} source={require('../media/icons/tv.png')}/>
							<Text style={styles.styleCatContentTitle}>{/*TV ONLINE*/}ทีวีออนไลน์</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={this.goToGames.bind(this)} activeOpacity={0.95} style={styles.styleCat}>
						<Image style={styles.styleCatImage} source={require('../media/games.jpg')}/>
						<View style={styles.styleCatOverlay}></View>

						<View style={styles.countItemsContent}>
							<View style={styles.countItems}>
								<Text style={styles.countItemsText}>{games.length}</Text>
								<Image source={require('../media/online.png')} style={styles.onlineStatus}/>
							</View>
						</View>

						<View style={styles.styleCatContent}>
							<Image style={styles.iconButtonGames} source={require('../media/icons/games.png')}/>
							<Text style={styles.styleCatContentTitle}>{/*GAMES*/}เกม</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={this.goToRadio.bind(this)} activeOpacity={0.95} style={styles.styleCat}>
						<Image style={styles.styleCatImage} source={require('../media/radio.jpg')}/>
						<View style={styles.styleCatOverlay}></View>

						<View style={styles.countItemsContent}>
							<View style={styles.countItems}>
								<Text style={styles.countItemsText}>{radio.length}</Text>
								<Image source={require('../media/online.png')} style={styles.onlineStatus}/>
							</View>
						</View>

						<View style={styles.styleCatContent}>
						<Image style={styles.iconButtonRadio} source={require('../media/icons/radio.png')}/>
							<Text style={styles.styleCatContentTitle}>{/*RADIO*/}วิทยุ</Text>
						</View>
					</TouchableOpacity>

					<NavigationBottomHome navigate={this.props.navigation.navigate} />

				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	adButtonSprite:{
		width:37,
		height:37,
		resizeMode:'contain'
	},
	adButton:{
		position:'absolute',
		top:5,
		left:5,
		marginTop:5,
		zIndex:999999,
		opacity:0.6,
		borderRadius:100,
		overflow:'hidden'
	},
	viewContent:{
		backgroundColor:'#fff'
	},
	styleCat:{
		width:'100%',
		height:(height-50)/3,
		position:'relative'
	},
	styleCatImage:{
		position:'absolute',
		zIndex:1,
		width:'100%',
		height:'100%',
		resizeMode:'cover'
	},
	styleCatOverlay:{
		position:'absolute',
		zIndex:2,
		width:'100%',
		height:'100%',
		backgroundColor:'rgba(0,0,0,0.1)'	
	},
	styleCatContent:{
		position:'absolute',
		zIndex:3,
		width:'100%',
		height:'100%',
		justifyContent:'center',
		alignItems:'center',
		flexDirection:'row'	
	},
	styleCatContentTitle:{
		color:'rgba(255,255,255,0.7)',
		fontSize:37
	},
	countItems:{
		zIndex:4,
		flexDirection:'row',
		backgroundColor:'rgba(0,0,0,0.7)',
		paddingTop:7,
		paddingBottom:7,
		paddingRight:10,
		paddingLeft:10,
		justifyContent:'center',
		alignItems:'center'
	},
	countItemsContent:{
		position:'absolute',
		zIndex:4,
		flexDirection:'column',
		top:0,
		right:0,
		justifyContent:'center',
		alignItems:'flex-end'
	},
	countItemsText:{
		marginRight:7,
		color:'rgba(255,255,255,0.85)'
	},
	onlineStatus:{
		width:10,
		height:10,
		resizeMode:'contain',
		opacity:0.8
	},
	iconButtonTV:{
		width:40,
		height:40,
		marginRight:15,
		resizeMode:'contain',
		position:'relative',
		top:2,
		opacity:0.8
	},
	iconButtonRadio:{
		width:40,
		height:40,
		marginRight:15,
		resizeMode:'contain',
		position:'relative',
		opacity:0.8
	},
	iconButtonGames:{
		width:50,
		height:50,
		marginRight:15,
		resizeMode:'contain',
		position:'relative',
		opacity:0.8
	}
})

const mapStateToProps = (state) => {
	return {
		categories:state.categories,
		config:state.config
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		splashStatus:(status)=>{
			dispatch({
				type:'SPASHSCREEN',
				splashStatus:status
			})
		},
		loadingStatus:(status)=>{
			dispatch({
				type:'LOADING',
				loading:status
			})
		},
		loadAllCategories:(categories)=>{
			const requestAsync = () => {
				return dispatch({
					type:'LOAD_ALL_CATEGORIES',
					categories:categories
				})	
			}

			requestAsync()

		},
		loadGames:(games)=>{
			
			const requestAsync = () => {
				return dispatch({
					type:'LOAD_GAMES',
					games:games
				})	
			}

			requestAsync()

		},
		loadTv:(tv)=>{
			
			const requestAsync = () => {
				return dispatch({
					type:'LOAD_TV',
					tv:tv
				})	
			}

			requestAsync()

		},
		loadRadio:(radio)=>{
			
			const requestAsync = () => {
				return dispatch({
					type:'LOAD_RADIO',
					radio:radio
				})	
			}

			requestAsync()
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
