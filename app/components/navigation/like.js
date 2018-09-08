import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	TouchableOpacity,
	ScrollView
} from 'react-native'
import { AppEventsLogger } from 'react-native-fbsdk'
import Header from '../helpers/header'

const { width, height } = Dimensions.get('window')

class Like extends Component {

	constructor(props){
		super(props)
		this.state = {
			clickButton:true
		}
	}

	openChannel(channel){

		AppEventsLogger.logEvent( 'user_watch_tv', 0, {
			channel_name:'Пользователь смотрит канал '+channel.title
		} )

		let { navigate } = this.props.navigation
		return navigate('WatchTv', {
			channel:channel,
			index:channel.index
		})

	}

	openRadio(channel, index){

		let { navigate } = this.props.navigation

		AppEventsLogger.logEvent( 'user_listen_radio', 0, {
			radio_name:'Пользователь слушает радио '+channel.title
		})

		return navigate('ListenRadio', {
			channel:channel,
			index:index
		})

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

	removeItem(index, type){

		let that = this

		switch(type){
			case 'GAME' :
				that.props.removeGame(index)
				return
			case 'RADIO' :
				that.props.removeRadio(index)
				return
			case 'TV' :
				that.props.removeTv(index)
				return
			default :
				return false
		}

	}

	render(){

		let { likedsTv, likedsRadio, likedsGames } = this.props.likeds

		return(
			<View style={styles.mainView}>
				<Header headerTitle="รายการโปรด" />

				<View style={styles.contentLikeScroll}>
					<ScrollView>

						<View style={styles.sectionView}>

							<View style={styles.titleSection}>
								<Image style={styles.titleSectionOverlay} source={require('../../media/line-navigation.jpg')}/>
								<Text style={styles.titleSectionTitle}>{/*Tv online*/}ทีวีออนไลน์</Text>
							</View>

							<View style={styles.listItems}>
								{
									likedsTv.length > 0 ?
										likedsTv.map((item, index)=>{
											return(

												<View style={styles.mainViewItemContent}>
													<TouchableOpacity key={index} onPress={this.openChannel.bind(this, item)} style={styles.buttonMain}>
														<View style={styles.imageChannalView}>
															<Image source={{uri:item.urlImage}} style={styles.imageChannal}/>
														</View>
														<View  style={styles.titleAndStatus}>
															<Text style={styles.textChannels} >{ item.title }</Text>
														</View>

													</TouchableOpacity>
													<TouchableOpacity onPress={this.removeItem.bind(this, index, 'TV')} style={styles.buttonRemove}>
														<Image style={styles.buttonRemoveImage} source={require('../../media/icons/trash.png')}/>
													</TouchableOpacity>
												</View>

											)
										})
									: <Text>ไม่มีอะไรพบ</Text>
								}
							</View>

						</View>

						<View style={styles.sectionView}>

							<View style={styles.titleSection}>
								<Image style={styles.titleSectionOverlay} source={require('../../media/line-navigation.jpg')}/>
								<Text style={styles.titleSectionTitle}>{/*Radio*/}วิทยุ</Text>
							</View>

							<View style={styles.listItems}>
								{
									likedsRadio.length > 0 ?
										likedsRadio.map((item, index)=>{
											return(

												<View style={styles.mainViewItemContent}>
													<TouchableOpacity key={index} onPress={this.openRadio.bind(this, item, index)} style={styles.buttonMain}>
														<View style={styles.imageChannalView}>
															<Image source={{uri:item.urlImage}} style={styles.imageChannal}/>
														</View>
														<View  style={styles.titleAndStatus}>
															<Text style={styles.textChannels} >{ item.title }</Text>
														</View>

													</TouchableOpacity>
													<TouchableOpacity onPress={this.removeItem.bind(this, index, 'RADIO')} style={styles.buttonRemove}>
														<Image style={styles.buttonRemoveImage} source={require('../../media/icons/trash.png')}/>
													</TouchableOpacity>
												</View>

											)
										})
									: <Text>ไม่มีอะไรพบ</Text>
								}
							</View>

						</View>

						<View style={styles.sectionView}>

							<View style={styles.titleSection}>
								<Image style={styles.titleSectionOverlay} source={require('../../media/line-navigation.jpg')}/>
								<Text style={styles.titleSectionTitle}>{/*Games*/}เกม</Text>
							</View>

							<View style={styles.listItems}>
								{
									likedsGames.length > 0 ?
										likedsGames.map((item, index)=>{
											return(
												<View style={styles.mainViewItemContent}>
													<TouchableOpacity key={index} onPress={this.openGame.bind(this, item)} style={styles.buttonMain}>
														<View style={styles.imageChannalView}>
															<Image source={{uri:`http://91.228.153.70:5554/media/games/${item.thumbnail}`}} style={styles.imageChannal}/>
														</View>
														<View  style={styles.titleAndStatus}>
															<Text style={styles.textChannels} >{ item.title }</Text>
														</View>

													</TouchableOpacity>
													<TouchableOpacity onPress={this.removeItem.bind(this, index, 'GAME')} style={styles.buttonRemove}>
														<Image style={styles.buttonRemoveImage} source={require('../../media/icons/trash.png')}/>
													</TouchableOpacity>
												</View>
											)
										})
									: <Text>ไม่มีอะไรพบ</Text>
								}
							</View>

						</View>

					</ScrollView>
				</View>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	buttonRemoveImage:{
		width:25,
		height:25,
		resizeMode:'contain'
	},
	mainViewItemContent:{
		flexDirection:'row',
		width:'100%',
		height:50,
		marginBottom:5
	},
	contentLikeScroll:{
		width:'100%',
		height:height-50
	},
	mainView:{
		width:'100%'
	},
	sectionView:{
		width:'100%'
	},
	buttonMain:{
		width:'100%',
		flex:5,
		flexDirection:'row',
		alignItems:'center',
		marginBottom:5,
		position:'relative'
	},
	buttonRemove:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},	
	imageChannal:{
		width:50,
		height:50,
		resizeMode:'contain'
	},
	imageChannalView:{
		width:50,
		height:50,
		marginRight:20,
		overflow:'hidden',
		borderRadius:170
	},
	titleAndStatus:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center'
	},
	textChannels:{
		fontSize:21,
		marginRight:8
	},
	titleSection:{
		paddingLeft:10,
		paddingRight:10,
		height:40,
		width:'100%',
		position:'relative',
		flexDirection:'row',
		alignItems:'center'
	},
	titleSectionTitle:{
		fontSize:22,
		color:'rgba(255,255,255,0.66)',
		position:'relative',
		zIndex:10
	},
	titleSectionOverlay:{
		position:'absolute',
		width:width,
		height:40,
		top:0,
		left:0,
		bottom:0,
		right:0,
		zIndex:1,
		resizeMode:'cover'
	},
	listItems:{
		width:'100%',
		padding:10
	}	
})

const mapStateToProps = (state) => {
	return {
		likeds:state.likeds
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		removeGame: (index) => {
			dispatch({
				type:'REMOVE_GAME',
				index:index
			})
		},
		removeRadio: (index) => {
			dispatch({
				type:'REMOVE_RADIO',
				index:index
			})
		},
		removeTv: (index) => {
			dispatch({
				type:'REMOVE_TV',
				index:index
			})
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Like)