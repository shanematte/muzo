import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	View,
	Text,
	StyleSheet,
	Alert,
	Image,
	TouchableOpacity,
	Dimensions
} from 'react-native'

import Header from '../helpers/header'

const { width, height } = Dimensions.get('window')

class Settings extends Component {
	render(){

		let { firstname } = this.props.config
		let { likedsTv, likedsRadio, likedsGames } = this.props.likeds

		return(
			<View style={styles.mainView}>
				<Header headerTitle="Settings" />

				<View style={styles.titleSection}>
					<Image style={styles.titleSectionOverlay} source={require('../../media/line-navigation.jpg')}/>
					<Text style={styles.titleSectionTitle}>Likeds</Text>
				</View>

				<View style={styles.likedsView}>
					
					<View style={styles.sectionLike}>
						<TouchableOpacity activeOpacity={0.82} style={styles.sectionLike}>
							<Image style={styles.sectionLikeImage} source={require('../../media/tv.jpg')}/>
							<View style={styles.sectionLikeInfo}>
								<Image style={styles.sectionLikeIcon} source={require('../../media/icons/tv.png')}/>
								<Text style={styles.sectionLikeText}>{ likedsTv.length }</Text>
							</View>
						</TouchableOpacity>
					</View>

					<View style={styles.sectionLike}>
						<TouchableOpacity activeOpacity={0.82} style={styles.sectionLike}>
							<Image style={styles.sectionLikeImage} source={require('../../media/radio.jpg')}/>
							<View style={styles.sectionLikeInfo}>
								<Image style={styles.sectionLikeIcon} source={require('../../media/icons/radio.png')}/>
								<Text style={styles.sectionLikeText}>{ likedsRadio.length }</Text>
							</View>
						</TouchableOpacity>
					</View>

					<View style={styles.sectionLike}>
						<TouchableOpacity activeOpacity={0.82} style={styles.sectionLike}>
							<Image style={styles.sectionLikeImage} source={require('../../media/games.jpg')}/>
							<View style={styles.sectionLikeInfo}>
								<Image style={styles.sectionLikeIcon} source={require('../../media/icons/games.png')}/>
								<Text style={styles.sectionLikeText}>{ likedsGames.length }</Text>
							</View>
						</TouchableOpacity>
					</View>

				</View>

				<View style={styles.titleSection}>
					<Image style={styles.titleSectionOverlay} source={require('../../media/line-navigation.jpg')}/>
					<Text style={styles.titleSectionTitle}>Id</Text>
				</View>

				<View style={styles.likedsViewOthers}>
					<Text>{ firstname }</Text>
				</View>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	mainView:{
		width:'100%'
	},
	likedsView:{
		width:'100%',
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center'
	},
	sectionLike:{
		flex:1,
		height:100,
		position:'relative'
	},
	sectionLikeImage:{
		width:'100%',
		height:'100%',
		position:'absolute',
		top:0,
		left:0,
		zIndex:1,
		resizeMode:'cover'
	},
	sectionLikeInfo:{
		width:'100%',
		height:'100%',
		position:'absolute',
		top:0,
		left:0,
		zIndex:2,
		flexDirection:'column',
		justifyContent:'center',
		alignItems:'center'	
	},
	sectionLikeIcon:{
		width:40,
		height:40,
		marginBottom:10,
		resizeMode:'contain'
	},
	sectionLikeText:{
		color:'rgba(255,255,255,0.95)',
		fontSize:20,
		fontWeight:'bold'
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
	likedsViewOthers:{
		padding:10,
		width:'100%'
	}
})

const mapStateToProps = (state) => {
	return {
		config:state.config,
		likeds:state.likeds
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Settings)