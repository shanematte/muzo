import React, { Component } from 'react'

import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	ScrollView,
	Alert,
	Image,
	TouchableOpacity,
	Animated,
	Easing,
	FlatList
} from 'react-native'

import { AppEventsLogger } from 'react-native-fbsdk'

import { connect } from 'react-redux'

//ad
import { Appodeal } from 'react-native-appodeal'
Appodeal.initialize("a9e4912676723f4fcf95077c1344f47f6983af1f480729c3", Appodeal.INTERSTITIAL)
Appodeal.setAutoCache(Appodeal.INTERSTITIAL, true)

//adjust
import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust'

const { width, height } = Dimensions.get('window')

class TV extends Component {
	constructor(props){
		super(props)

		this.state = {
			tv:[],
			fadeAnim:new Animated.Value(0)
		}
	}
	componentWillMount() {

		let adjustConfig = new AdjustConfig('j60kc0gnzrb4', AdjustConfig.EnvironmentProduction)

		Adjust.create(adjustConfig)

	}
	componentDidMount(){

		let that = this
	
		this.animationStatus()

		Appodeal.isLoaded(Appodeal.INTERSTITIAL, (isLoaded) => {

			if(isLoaded){
				Appodeal.show(Appodeal.INTERSTITIAL, "initial_screen", (result) => console.log(result))

				let adjustEvent = new AdjustEvent("f9ougv")
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
	animationStatus(){

		Animated.sequence([
		    Animated.timing(this.state.fadeAnim, {
		      toValue: 1,
		      duration: 400,
		      delay: 300,
		      easing: Easing.linear
		    }),
		    Animated.timing(this.state.fadeAnim, {
		      toValue: 0,
		      duration: 300,
		      easing: Easing.linear
		    })
		  ]).start(() => {
		    this.animationStatus()
		}) 

	}

	openChannel(channel, index){

		AppEventsLogger.logEvent( 'user_watch_tv', 0, {
			channel_name:'Пользователь смотрит канал '+channel.title
		} )

		let { navigate } = this.props.navigation
		return navigate('WatchTv', {
			channel:channel,
			index:index
		})

	}

	render(){

		let { fadeAnim } = this.state
		let tv = this.props.categories.tv

		return(
			<View style={styles.contentView}>

				<FlatList
					showsVerticalScrollIndicator={false}
				  	data={tv}
				  	renderItem={(channel) => {
				  		return(
							<TouchableOpacity key={channel.index} onPress={this.openChannel.bind(this, channel.item, channel.index)} style={styles.buttonMain}>
								{<Image source={{uri:channel.item.urlImage}} style={styles.imageChannal}/>}
								<View  style={styles.titleAndStatus}>
									<Text style={styles.textChannels}>{ channel.item.title }</Text>
									{/*<Animated.Image style={[styles.statusImage, {opacity: fadeAnim}]} source={require('../media/online.png')}/>*/}
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
	contentView:{
		backgroundColor:'#fff',
		height:'100%'
	},
	textChannels:{
		fontSize:21,
		marginRight:8
	},
	buttonMain:{
		width:'100%',
		padding:10,
		height:height/4.5,
		flexDirection:'row',
		alignItems:'center',
		marginBottom:3,
		backgroundColor:'rgba(0,0,0,0.04)'
	},
	imageChannal:{
		width:75,
		height:75,
		resizeMode:'contain',
		marginRight:20
	},
	titleAndStatus:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center'
	},
	statusImage:{
		width:10,
		height:10,
		resizeMode:'contain'
	}
})

const mapStateToProps = (state) => {
	return {
		loading:state.loading,
		categories:state.categories
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TV)
