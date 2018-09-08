import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	Image,
	ScrollView,
	TouchableOpacity,
	Alert,
	BackHandler,
	Share
} from 'react-native'
import Video from 'react-native-video'
import Spinner from 'react-native-spinkit'
import _ from 'underscore'
import { ShareDialog } from 'react-native-fbsdk'
//ad
import { Appodeal } from 'react-native-appodeal'
Appodeal.initialize("a9e4912676723f4fcf95077c1344f47f6983af1f480729c3", Appodeal.BANNER_BOTTOM)

const { width, height } = Dimensions.get('window')

class ListenRadio extends Component {
	constructor(props){
		super(props)

		this.state = {
			channel:{},
			index:0
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

		let { channel, index } = this.props.navigation.state.params

		console.log(index)

		this.setState({
			channel:channel,
			index:index
		})

		Appodeal.show(Appodeal.BANNER_BOTTOM, "initial_screen", (result) => console.log(result))
	}
	likeItem(channel){

		let { likedsRadio } = this.props.likeds

		let searchChannel = _.where(likedsRadio, {
			title:channel.title
		})

		if(searchChannel.length > 0){
			Alert.alert('ข้อความ', 'มีวิทยุในรายการโปรดอยู่แล้ว')
		}else{
			this.props.addLike(channel)
			Alert.alert('ข้อความ', 'เพิ่มวิทยุในรายการโปรดแล้ว')
		}

	}

	prevChannel(){

		let that = this

		let { channel, index } = this.state
		let { radio } = this.props.categories
		let searchNewChannel = {}

		index--

		if(index < 0){

			index = radio.length-1

			searchNewChannel = radio[index]

			that.setState({
				index:index,
				channel:searchNewChannel
			})

		}else{

			searchNewChannel = radio[index]

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
		let { radio } = this.props.categories
		let searchNewChannel = {}

		index++

		if(index > radio.length-1){

			index = 0

			searchNewChannel = radio[index]

			that.setState({
				index:index,
				channel:searchNewChannel
			})

		}else{

			searchNewChannel = radio[index]

			that.setState({
				index:index,
				channel:searchNewChannel
			})

		}

	}

	shareFacebook(){
		ShareDialog.show({
         	contentType: 'link',
          	contentUrl: 'https://play.google.com/store/apps/details?id=com.muzo',
  			contentDescription: 'MuZo - listen radio',
		})
	}

	shareApp(){
		Share.share({
		    	message: 'https://play.google.com/store/apps/details?id=com.muzo MuZo - listen radio',
		    	url: 'https://play.google.com/store/apps/details?id=com.muzo',
		    	title: 'MuZo application'
			},{
		    	dialogTitle: 'แชร์แอปพลิเคชัน muzo',
		})
	}	

	render(){

		let { index, channel } = this.state
		let { likedsRadio } = this.props.likeds

		return(
			<View style={styles.mainView}>
				<View style={styles.mainViewPlayer}>

					<Video
						source={{uri: channel.url}} 
						playInBackground={true} 
						playWhenInactive={false} 
					    resizeMode={"contain"}
					    style={{width:0,height:0}}
					/>

					<View style={styles.mainViewPlayerAnimation}>
						<Spinner isVisible={true} size={175} type="Pulse" color="rgba(117, 38, 97, 0.76)" />
					</View>
					<View style={styles.mainViewPlayerOverflow}>
						<Image source={{uri:channel.urlImage}} style={styles.mainViewPlayerImage} />
					</View>
				</View>
				<View style={styles.viewContentRadio}>
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
				</View>
				<View style={styles.adView}></View>
				
			</View>
		)
	}
}

const styles = StyleSheet.create({
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
	adViewText:{
		color:'#fff',
		fontSize:22
	},
	descriptionChannel:{
		width:'100%',
		padding:10
	},
	adView:{
		width:'100%',
		height:60,
		backgroundColor:'#fff',
		justifyContent:'center',
		alignItems:'center'
	},
	viewContentRadio:{
		width:'100%',
		height:height-300,
		backgroundColor:'#fff'
	},
	mainViewPlayerAnimation:{
		width:170,
		height:170,
		zIndex:100,
		position:'absolute',
		justifyContent:'center',
		alignItems:'center'
	},
	mainViewPlayerOverflow:{
		width:170,
		height:170,
		overflow:'hidden',
		borderRadius:100
	},
	mainViewPlayerImage:{
		width:170,
		height:170,
		resizeMode:'contain'
	},
	mainView:{
		width:'100%',
		backgroundColor:'#fff'
	},
	mainViewPlayer:{
		width:'100%',
		height:240,
		backgroundColor:'#000',
		justifyContent:'center',
		alignItems:'center',
		position:'relative'
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
	return{
		likeds:state.likeds,
		categories:state.categories
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addLike:(channel)=>{

			return dispatch({
				type:'ADD_LIKE_RADIO',
				likeRadio:channel
			})

		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListenRadio)