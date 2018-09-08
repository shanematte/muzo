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
import Video from 'react-native-video'
import { connect } from 'react-redux'
import { AppEventsLogger } from 'react-native-fbsdk'

//ad
import { Appodeal } from 'react-native-appodeal'
Appodeal.initialize("a9e4912676723f4fcf95077c1344f47f6983af1f480729c3", Appodeal.INTERSTITIAL)
Appodeal.setAutoCache(Appodeal.INTERSTITIAL, true)

//adjust
import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust'

const { width, height } = Dimensions.get('window')

class Radio extends Component {
	constructor(props){
		super(props)

		this.state = {
			fadeAnim:new Animated.Value(0)
		}
	}
	componentWillMount() {

		let adjustConfig = new AdjustConfig('j60kc0gnzrb4', AdjustConfig.EnvironmentProduction)

		Adjust.create(adjustConfig)

	}
	componentDidMount(){

		this.animationStatus()

		Appodeal.isLoaded(Appodeal.INTERSTITIAL, (isLoaded) => {

			if(isLoaded){
				Appodeal.show(Appodeal.INTERSTITIAL, "initial_screen", (result) => console.log(result))

				let adjustEvent = new AdjustEvent("gu4f1k")
				Adjust.trackEvent(adjustEvent)
				
			}

		})

		Appodeal.addEventListener('onInterstitialClicked', () => {
			
			let adjustEvent = new AdjustEvent("tljs1j")
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

		let { navigate } = this.props.navigation

		AppEventsLogger.logEvent( 'user_listen_radio', 0, {
			radio_name:'Пользователь слушает радио '+channel.title
		})

		return navigate('ListenRadio', {
			channel:channel,
			index:index
		})

	}

	render(){

		let { fadeAnim } = this.state

		let radio = this.props.categories.radio

		return(
			<View style={styles.contentView}>

				<FlatList
					showsVerticalScrollIndicator={false}
				  	data={radio}
				  	renderItem={(channel, index) => {
				  		return(
							<TouchableOpacity onPress={this.openChannel.bind(this, channel.item, channel.index)} key={index} style={styles.buttonMain}>
								<Image source={{uri:channel.item.urlImage}} style={styles.imageChannal}/>

								<View  style={styles.titleAndStatus}>
									<Text style={styles.textChannels} key={index}>{ channel.item.title }</Text>
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
	playerView:{
		width:width,
		height:70,
		backgroundColor:'red',
		position:'absolute',
		left:0
	},
	contentView:{
		backgroundColor:'#fff',
		width:width,
		height:height
	},
	textChannels:{
		fontSize:21,
		marginRight:8
	},
	buttonMain:{
		width:'100%',
		padding:10,
		flexDirection:'row',
		alignItems:'center'
	},
	imageChannal:{
		width:50,
		height:50,
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

export default connect(mapStateToProps, mapDispatchToProps)(Radio)
