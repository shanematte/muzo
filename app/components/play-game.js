import React, { Component } from 'react'
import {
	View,
	Text,
	Alert,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Image,
	WebView,
	BackHandler,
	Share
} from 'react-native'
import { connect } from 'react-redux'
import Spinner from 'react-native-spinkit'
import _ from 'underscore'
import { ShareDialog } from 'react-native-fbsdk'

const { width, height } = Dimensions.get('window')

//ad
import { Appodeal } from 'react-native-appodeal'
Appodeal.initialize("a9e4912676723f4fcf95077c1344f47f6983af1f480729c3", Appodeal.BANNER_BOTTOM)

class GamePlay extends Component {
	constructor(props){
		super(props)

		this.state = {
			load:true
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
	    this.props.navigation.goBack()
	    return true
	}
	componentDidMount(){
		Appodeal.show(Appodeal.BANNER_BOTTOM, "initial_screen", (result) => console.log(result))
	}
	likeItem(channel){

		let { likedsGames } = this.props.likeds

		let searchChannel = _.where(likedsGames, {
			title:channel.title
		})

		if(searchChannel.length > 0){
			Alert.alert('ข้อความ', 'มีเกมในรายการโปรดอยู่แล้ว')
		}else{
			this.props.addLike(channel)
			Alert.alert('ข้อความ', 'เพิ่มเกมในรายการโปรดแล้ว')
		}

	}

	loadGame(){
		
		let that = this

		setTimeout(()=>{
			that.setState({
				load:false
			})
		}, 2000)

	}

	shareFacebook(game){
		ShareDialog.show({
         	contentType: 'link',
          	contentUrl: 'https://play.google.com/store/apps/details?id=com.muzo',
  			contentDescription: 'MuZo - play the game '+game.title,
		})
	}

	shareApp(game){
		Share.share({
		    	message: 'https://play.google.com/store/apps/details?id=com.muzo MuZo - play the game '+game.title,
		    	url: 'https://play.google.com/store/apps/details?id=com.muzo',
		    	title: 'MuZo application'
			},{
		    	dialogTitle: 'แชร์แอปพลิเคชัน muzo',
		})
	}

	render(){

		let { game } = this.props.navigation.state.params
		let { load } = this.state

		return(
			<View style={styles.mainViewGames}>

				<View style={styles.gameViewStyle}>
			      	<WebView
			      		automaticallyAdjustContentInsets={false}
			        	source={{uri: `http://91.228.153.70:5554/media/games/${game.url}`}}
			        	onLoad={this.loadGame.bind(this)}
			      	/>
		      	</View>

		      	<View style={styles.adGameView}></View>

		      	<TouchableOpacity onPress={this.likeItem.bind(this, game)} style={styles.addLikeButton} >
		      		<Image source={require('../media/icons/star.png')} style={styles.addLikeButtonImage}/>
		      	</TouchableOpacity>

		      	<TouchableOpacity onPress={this.shareFacebook.bind(this, game)} style={styles.addLikeButtonFacebook} >
		      		<Image source={require('../media/icons/facebook-logo.png')} style={[styles.addLikeButtonImage, {tingColor:'orange'}]}/>
		      	</TouchableOpacity>

		      	<TouchableOpacity onPress={this.shareApp.bind(this, game)} style={styles.addLikeButtonApp} >
		      		<Image source={require('../media/icons/share.png')} style={[styles.addLikeButtonImage, {tingColor:'orange'}]}/>
		      	</TouchableOpacity>

		      	{
		      		load ?
				      	<View style={styles.loadGame}>
				      		<Spinner isVisible={true} size={75} type="Wave" color="rgba(255, 255, 255, 0.86)" />
				      		<Text style={styles.loadGameText}>โหลด</Text>
				      	</View>	
		      		:
		      			<View></View>

		      	}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	loadGameText:{
		color:'#fff',
		fontSize:19
	},
	addLikeButtonImage:{
		width:21,
		height:21,
		resizeMode:'contain'
	},
	addLikeButton:{
		width:30,
		height:30,
		backgroundColor:'#fff',
		borderRadius:100,
		justifyContent:'center',
		alignItems:'center',
		position:'absolute',
		top:45,
		right:5,
		zIndex:500
	},
	addLikeButtonFacebook:{
		width:30,
		height:30,
		backgroundColor:'#fff',
		borderRadius:100,
		justifyContent:'center',
		alignItems:'center',
		position:'absolute',
		top:80,
		right:5,
		zIndex:500
	},
	addLikeButtonApp:{
		width:30,
		height:30,
		backgroundColor:'#fff',
		borderRadius:100,
		justifyContent:'center',
		alignItems:'center',
		position:'absolute',
		top:115,
		right:5,
		zIndex:500
	},
	loadGame:{
		position:'absolute',
		top:0,
		left:0,
		width:'100%',
		height:height,
		zIndex:2000,
		backgroundColor:'#000',
		justifyContent:'center',
		alignItems:'center',
		flexDirection:'column'
	},
	adGameViewTitle:{
		color:'#fff',
		textAlign:'center'
	},
	adGameView:{
		position:'absolute',
		bottom:0,
		left:0,
		width:'100%',
		height:60,
		backgroundColor:'#000',
		zIndex:10,
		justifyContent:'center',
		alignItems:'center'
	},
	mainViewGames:{
		width:width,
		height:height,
		position:'relative',
		backgroundColor:'red'
	},
	gameViewStyle:{
		width:width,
		height:height-60,
		zIndex:5,
		backgroundColor:'#000'
	}
})

const mapStateToProps = (state) => {
	return {
		likeds:state.likeds
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addLike:(channel)=>{

			return dispatch({
				type:'ADD_LIKE_GAME',
				likeGame:channel
			})

		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePlay)