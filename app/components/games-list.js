import React, { Component } from 'react'
import {
	View,
	Text,
	ScrollView,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Image,
	FlatList
} from 'react-native'
import { connect } from 'react-redux'
import { AppEventsLogger } from 'react-native-fbsdk'

//ad
import { Appodeal } from 'react-native-appodeal'
Appodeal.initialize("a9e4912676723f4fcf95077c1344f47f6983af1f480729c3", Appodeal.INTERSTITIAL)
Appodeal.setAutoCache(Appodeal.INTERSTITIAL, true)

//adjust
import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust'

const { width, height } = Dimensions.get('window')

class GamesList extends Component {

	constructor(props){
		super(props)

		this.state = {
			clickButton:true
		}

	}
	
	componentWillMount() {

		let adjustConfig = new AdjustConfig('j60kc0gnzrb4', AdjustConfig.EnvironmentProduction)

		Adjust.create(adjustConfig)

	}

	componentDidMount(){
		Appodeal.isLoaded(Appodeal.INTERSTITIAL, (isLoaded) => {

			if(isLoaded){
				Appodeal.show(Appodeal.INTERSTITIAL, "initial_screen", (result) => console.log(result))

				let adjustEvent = new AdjustEvent("nu0wx9")
				Adjust.trackEvent(adjustEvent)
				
			}

		})

		Appodeal.addEventListener('onInterstitialClicked', () => {
			
			let adjustEvent = new AdjustEvent("ej4dl1")
			Adjust.trackEvent(adjustEvent)

		})

	}
  	componentWillUnmount() {
    	Adjust.componentWillUnmount()

  	}
	openGame(game){

		let { clickButton } = this.state
		let that = this

		if(clickButton){

			this.setState({
				clickButton:false
			})

			AppEventsLogger.logEvent( 'user_go_to_games_play', 0, {
				eventName:`Пользователь играет в игру ${game.title}`
			} )

			setTimeout(()=>{
				that.setState({
					clickButton:true
				})
			}, 900)

			let { navigate } = this.props.navigation
			return navigate('GamePlay', {
				game:game
			})

		}

	}

	render(){

		let { games } = this.props.categories

		return(
			<View style={styles.mainViewGames}>

				<FlatList
					showsVerticalScrollIndicator={false}
				  	data={games}
				  	numColumns={2}
				  	renderItem={(game, index) => {

						let gameTitle = game.item.title.replace(' ', '')

						return(
							<TouchableOpacity onPress={this.openGame.bind(this, game.item)} activeOpacity={0.55}>
								<View style={styles.viewGameItem}>
									<Image style={styles.viewGameItemCover} source={{uri:`http://91.228.153.70:5554/media/games/${game.item.thumbnail}`}}/>
									<View style={styles.viewGameItemTitle}>
										<Text  style={styles.viewGameItemTitleColor}>{ game.item.title }</Text>
									</View>
								</View>
							</TouchableOpacity>
						)

				  	}}
				/>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	flatListStyle:{
		width:'100%',
		flexDirection:'row',
		flexWrap:'wrap'
	},
	mainViewGamesList:{
		width:width,
		flexDirection:'row',
		flexWrap:'wrap'
	},
	viewGameItemTitleColor:{
		color:'#fff',
		fontWeight:'bold',
		fontSize:18
	},
	viewGameItemTitle:{
		position:'absolute',
		paddingRight:10,
		paddingLeft:10,
		bottom:0,
		left:0,
		width:width/2,
		height:60,
		backgroundColor:'rgba(0,0,0,0.8)',
		zIndex:10,
		flexDirection:'row',
		alignItems:'center'
	},
	viewGameItemCover:{
		position:'absolute',
		transform:[{
			scaleY:1.1
		},{
			scaleX:1.1
		}],
		top:0,
		left:0,
		resizeMode:'cover',
		width:(width/2)-20,
		height:'100%',
		zIndex:1
	},
	viewGameItem:{
		width:(width/2)-20,
		height:height/3,
		overflow:'hidden',
		marginLeft:10,
		marginRight:10,
		marginBottom:8,
		marginTop:8,
		position:'relative',
		borderWidth:7,
		borderColor:'#fff'
	},
	mainViewGames:{
		width:width,
		height:height
	}
})

const mapStateToProps = (state) => {
	return {
		categories:state.categories
	}
}

const mapDispatchToProps = (Dispatch) => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesList)