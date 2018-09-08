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
	FlatList,
	PixelRatio,
	StatusBar,
	BackHandler,
	Share
} from 'react-native'
import _ from 'underscore'
import Spinner from 'react-native-spinkit'
import { AppEventsLogger } from 'react-native-fbsdk'
import Video from 'react-native-video'
import { ShareDialog } from 'react-native-fbsdk'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'

//ad
//ad
import { Appodeal } from 'react-native-appodeal'
Appodeal.initialize("a9e4912676723f4fcf95077c1344f47f6983af1f480729c3", Appodeal.BANNER_BOTTOM)

const { width, height } = Dimensions.get('window')


/*AppEventsLogger.logEvent( 'user_watch_tv', 0, {
	channel_name:'Пользователь смотрит канал '+channel.title
} )*/

class WatchTv extends Component {
	constructor(props){
		super(props)

		this.state = {
			channel:{},
			index:0,
			fadeAnim:new Animated.Value(0),
			fullscreen:false,
			load:true,
			pause:false,
			mute:false
		}

		this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
	}

	componentWillMount() {
	    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
	}

	componentWillUnmount() {
	    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
	}

	handleBackButtonClick() {
	    Appodeal.hide(Appodeal.BANNER_BOTTOM)
	    Orientation.lockToPortrait()
	    this.props.navigation.goBack()
	    return true
	}

	componentDidMount(){

		let { channel, index } = this.props.navigation.state.params

		this.setState({
			channel:channel,
			index:index
		})

		Appodeal.show(Appodeal.BANNER_BOTTOM, "initial_screen", (result) => console.log(result))
		
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

	fullScreenToggle(){
		this.setState({
			fullscreen:!this.state.fullscreen
		})

		if(!this.state.fullscreen){
			Orientation.lockToLandscape()
		}else{
			Orientation.lockToPortrait()
		}

		if(!this.state.fullscreen){
			Appodeal.hide(Appodeal.BANNER_BOTTOM)
		}else{
			Appodeal.show(Appodeal.BANNER_BOTTOM, "initial_screen", (result) => console.log(result))
		}
	}

	likeItem(channel){

		let { likedsTv } = this.props.likeds
		let { index } = this.state

		let searchChannel = _.where(likedsTv, {
			title:channel.title
		})

		if(searchChannel.length > 0){
			Alert.alert('ข้อความ', 'มีช่องอยู่ในรายการโปรดอยู่แล้ว')
		}else{
			channel.index = index
			this.props.addLike(channel)
			Alert.alert('ข้อความ', 'เพิ่มช่องในรายการโปรดแล้ว')
		}

	}

	prevChannel(){

		let that = this

		let { channel, index } = this.state
		let { tv } = this.props.categories
		let searchNewChannel = {}

		index--

		if(index < 0){

			index = tv.length-1

			searchNewChannel = tv[index]

			that.setState({
				index:index,
				channel:searchNewChannel
			})

		}else{

			searchNewChannel = tv[index]

			that.setState({
				index:index,
				channel:searchNewChannel,
				load:true
			})

		}

	}

	nextChannel(){

		let that = this

		let { channel, index } = this.state
		let { tv } = this.props.categories
		let searchNewChannel = {}

		index++

		if(index > tv.length-1){

			index = 0

			searchNewChannel = tv[index]

			that.setState({
				index:index,
				channel:searchNewChannel
			})

		}else{

			searchNewChannel = tv[index]

			that.setState({
				index:index,
				channel:searchNewChannel
			})

		}

	}

	loadedChannel(){
		this.setState({
			load:false
		})
	}

	loadStartChannel(){
		this.setState({
			load:true
		})	
	}

	shareFacebook(){
		ShareDialog.show({
         	contentType: 'link',
          	contentUrl: 'https://play.google.com/store/apps/details?id=com.muzo',
  			contentDescription: 'MuZo - watch tv',
		})
	}

	shareApp(){
		Share.share({
		    	message: 'https://play.google.com/store/apps/details?id=com.muzo MuZo - watch tv',
		    	url: 'https://play.google.com/store/apps/details?id=com.muzo',
		    	title: 'MuZo application'
			},{
		    	dialogTitle: 'Share MuZo application',
		})
	}

	onPaused(){
		this.setState({
			pause:!this.state.pause
		})
	}

	onMute(){
		this.setState({
			mute:!this.state.mute
		})
	}

	render(){

		let { fadeAnim, channel, fullscreen, load } = this.state
		let { likedsTv } = this.props.likeds
		let { tv } = this.props.categories

		return(

			<View style={styles.contentView}>

				<View style={fullscreen ? styles.watchPlayerFullScreen : styles.watchPlayer}>

					{
						load ?
					      	<View style={styles.loadVideo}>
					      		<Spinner isVisible={true} size={75} type="Wave" color="rgba(255, 255, 255, 0.86)" />
					      		<Text style={styles.loadVideoText}>โหลด</Text>
					      	</View>	
						: <View></View>
					}

					<Video
						onLoadStart={this.loadStartChannel.bind(this)}
						muted={this.state.mute} 
						paused={this.state.pause}
						source={{uri: channel.url}}
						onLoad={this.loadedChannel.bind(this)}
						playInBackground={false} 
						playWhenInactive={false} 
					    resizeMode={fullscreen ? "contain" : "cover"}
					    style={fullscreen ? styles.backgroundVideoFullscreen : styles.backgroundVideo}
					/>
					{ 
						fullscreen ? 
							<TouchableOpacity style={fullscreen ? styles.iconFullScreenButtonFull : styles.iconFullScreenButton} onPress={this.fullScreenToggle.bind(this)}>
								<Image source={require('../media/icons/reverse-screen.png')} style={styles.iconFullScreen}/>
							</TouchableOpacity>
						:
							<TouchableOpacity style={styles.iconFullScreenButton} onPress={this.fullScreenToggle.bind(this)}>
								<Image source={require('../media/icons/full-screen.png')} style={styles.iconFullScreen}/>
							</TouchableOpacity>
					}

					{
						this.state.pause ?
							<TouchableOpacity style={fullscreen ? styles.mutedButtonFull : styles.mutedButton} onPress={this.onPaused.bind(this)}>
								<Image style={styles.mutedButtonImage} source={require('../media/icons/play.png')}/>
							</TouchableOpacity>
						: 
							<TouchableOpacity style={fullscreen ? styles.mutedButtonFull : styles.mutedButton} onPress={this.onPaused.bind(this)}>
								<Image style={styles.mutedButtonImage} source={require('../media/icons/pause.png')}/>
							</TouchableOpacity>
					}

					{
						this.state.mute ?
							<TouchableOpacity style={fullscreen ? styles.mutedButtonSecondFull : styles.mutedButtonSecond} onPress={this.onMute.bind(this)}>
								<Image style={styles.mutedButtonImage} source={require('../media/icons/speaker.png')}/>
							</TouchableOpacity>
						: 
							<TouchableOpacity style={fullscreen ? styles.mutedButtonSecondFull : styles.mutedButtonSecond} onPress={this.onMute.bind(this)}>
								<Image style={styles.mutedButtonImage} source={require('../media/icons/mute.png')}/>
							</TouchableOpacity>
					}

				</View>	

				{
					fullscreen ? 
						<View></View>
					:
						<View style={styles.contentPageChannel}>
							<ScrollView>
								<View style={styles.itemInfo}>
									<Text style={styles.itemInfoTitle}>{ channel.title }</Text>
									<TouchableOpacity onPress={this.likeItem.bind(this, channel)} style={styles.buttonToFavorite}>
										<Text style={styles.buttonToFavoriteTitle}>รายการโปรด</Text>
									</TouchableOpacity>
								</View>

								<View style={styles.buttonChannels}>
									<TouchableOpacity onPress={this.prevChannel.bind(this)} style={styles.buttonChannelMain}>
										<Text>ก่อนหน้า</Text>
									</TouchableOpacity>
									<TouchableOpacity style={styles.buttonChannelMain} onPress={this.nextChannel.bind(this)}>
										<Text>ถัดไป</Text>
									</TouchableOpacity>
								</View>

								<View style={styles.shareButtons}>
									<View style={styles.shareButtonsContent}>
								      	<TouchableOpacity onPress={this.shareFacebook.bind(this)} style={styles.addLikeButtonFacebook} >
								      		<Image source={require('../media/icons/facebook-logo.png')} style={[styles.addLikeButtonImage, {tingColor:'#fff'}]}/>
								      	</TouchableOpacity>

								      	<TouchableOpacity onPress={this.shareApp.bind(this)} style={styles.addLikeButtonFacebook} >
								      		<Image source={require('../media/icons/share.png')} style={[styles.addLikeButtonImage, {tingColor:'#fff'}]}/>
								      	</TouchableOpacity>
							      	</View>
								</View>

								<View style={styles.descriptionChannel}>
									
									<Text>{ channel.description != '' ? channel.description : '...' }</Text>
									
								</View>
							</ScrollView>
							<View style={styles.adView}>
							</View>
						</View>
				}

			</View>

		)
	}
}

const styles = StyleSheet.create({
	mutedButton:{
		position:'absolute',
		bottom:5,
		width:50,
		height:50,
		left:5,
		zIndex:10000,
		justifyContent:'center',
		alignItems:'center'
	},
	mutedButtonFull:{
		position:'absolute',
		top:width-45,
		width:50,
		height:50,
		left:5,
		zIndex:10000,
		justifyContent:'center',
		alignItems:'center'
	},
	mutedButtonSecond:{
		position:'absolute',
		bottom:5,
		width:50,
		height:50,
		left:55,
		zIndex:10000,
		justifyContent:'center',
		alignItems:'center'
	},
	mutedButtonSecondFull:{
		position:'absolute',
		top:width-45,
		width:50,
		height:50,
		left:55,
		zIndex:10000,
		justifyContent:'center',
		alignItems:'center'
	},
	mutedButtonImage:{
		width:25,
		height:25,
		tintColor:'#fff',
		resizeMode:'contain'
	},
	addLikeButtonFacebook:{
		width:45,
		height:45,
		marginLeft:10,
		backgroundColor:'#e8a60b',
		borderRadius:100,
		justifyContent:'center',
		alignItems:'center',
		zIndex:500
	},
	addLikeButtonImage:{
		width:27,
		height:27,
		resizeMode:'contain'
	},
	shareButtons:{
		width:width,
		height:55,
		marginTop:5,
		marginBottom:5,
		paddingRight:15,
		paddingLeft:15,
		flexDirection:'row',
		justifyContent:'flex-end',
		alignItems:'center'
	},
	shareButtonsContent:{
		flexDirection:'row',
	},
	buttonChannelMain:{
		flex:width-40,
		height:50,
		backgroundColor:'rgba(0,0,0,0.08)',
		justifyContent:'center',
		alignItems:'center'
	},
	buttonChannels:{
		width:'100%',
		height:50,
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center'
	},
	loadVideoText:{
		color:'#fff',
		fontSize:19
	},
	loadVideo:{
		position:'absolute',
		top:0,
		left:0,
		width:'100%',
		height:'100%',
		zIndex:2000000,
		backgroundColor:'#000',
		justifyContent:'center',
		alignItems:'center',
		flexDirection:'column'
	},
	buttonChannelMain:{
		flex:width-40,
		height:50,
		backgroundColor:'rgba(0,0,0,0.08)',
		justifyContent:'center',
		alignItems:'center'
	},
	buttonChannels:{
		width:'100%',
		height:50,
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center'
	},
	iconFullScreenButton:{
		width:30,
		height:30,
		position:'absolute',
		bottom:15,
		right:15,
		zIndex:99999
	},
	iconFullScreenButtonFull:{
		width:30,
		height:30,
		position:'absolute',
		top:width-35,
		right:15,
		zIndex:99999
	},
	iconFullScreen:{
		width:'100%',
		tintColor:'#fff',
		opacity:0.5,
		height:'100%',
		resizeMode:'contain'
	},
	adViewTitle:{
		color:'#fff',
		textAlign:'center'
	},
	adView:{
		width:'100%',
		height:60,
		backgroundColor:'#fff',
		justifyContent:'center',
		alignItems:'center'
	},
	contentPageChannel:{
		width:'100%',
		height:height-(height/3)
	},
	descriptionChannel:{
		width:'100%',
		padding:10
	},
	contentView:{
		backgroundColor:'#fff',
		height:height
	},
	watchPlayer:{
		width:width,
		height:height/3,
		position: 'relative',
		backgroundColor:'#000'
	},
	watchPlayerFullScreen:{
        flex: 1,
	    position: 'relative',
	    zIndex:99999,
	    backgroundColor:'#000',
        height: width,
        width: height
	},
	backgroundVideo:{
		width:width,
		height:height/3,
		position:'absolute'
	},
	backgroundVideoFullscreen:{
        height: width,
        width: height,
        position:'absolute'
	},
	buttonToggleFullscreen:{
		position:'absolute',
		bottom:10,
		right:10,
		fontSize:22,
		color:'rgba(0,0,0,0.7)',
		zIndex:999999
	},
	itemInfo:{
		width:'100%',
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		padding:10
	},
	itemInfoTitle:{
		fontSize:19,
		fontWeight:'bold'
	},
	buttonToFavorite:{
		padding:10,
		backgroundColor:'#7ede21'
	},
	buttonToFavoriteTitle:{
		color:'#fff'
	}
})

const mapStateToProps = (state) => {
	return {
		loading:state.loading,
		likeds:state.likeds,
		categories:state.categories
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addLike:(channel)=>{

			return dispatch({
				type:'ADD_LIKE_TV',
				likeTv:channel
			})

		},
		cleanTV:()=>{

			return dispatch({
				type:'CLEAN_TV'
			})

		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchTv)
