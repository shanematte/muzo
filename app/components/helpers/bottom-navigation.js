import React, { Component } from 'react'
import{
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	Image,
	Share
} from 'react-native'

import { connect } from 'react-redux'

const { width, height } = Dimensions.get('window')
import { ShareDialog } from 'react-native-fbsdk'

import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust'

class NavigationBottomHome extends Component {
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

  	componentWillUnmount() {
    	Adjust.componentWillUnmount()

  	}	

	goToPage(pageTitle){

		let { navigate } = this.props

		this.randomUserName()

		return navigate(pageTitle)

	}

	shareAppFacebook(){
		ShareDialog.show({
         	contentType: 'link',
          	contentUrl: "https://play.google.com/store/apps/details?id=com.muzo",
  			contentDescription: 'MuZo',
		})

		let adjustEvent = new AdjustEvent("9rc1pf")
		Adjust.trackEvent(adjustEvent)

	}

	shareApp(){
		Share.share({
		    	message: 'https://play.google.com/store/apps/details?id=com.muzo',
		    	url: 'https://play.google.com/store/apps/details?id=com.muzo',
		    	title: 'MuZo application'
			},{
		    	dialogTitle: 'แชร์แอปพลิเคชัน muzo',
		})

		let adjustEvent = new AdjustEvent("bhnoo0")
		Adjust.trackEvent(adjustEvent)

	}	

	randomUserName(){

		let randomName = String(Math.random())

		let { firstname } = this.props.config

		if(firstname == ''){

			this.props.updateUserFirstName(randomName.replace('0.', ''))

		}

	}

	render(){
		return(
			<View style={styles.viewNavigation}>
				<View style={styles.bgOverlowNav}>
					<Image style={styles.bgOverlowNavImage} source={require('../../media/line-navigation.jpg')}/>
				</View>
				<View style={styles.contentNavigation}>
					<TouchableOpacity onPress={this.goToPage.bind(this, 'Like')} style={styles.buttonMenuPage}>
						<Image style={styles.iconNav} source={require('../../media/icons/like.png')}/>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.shareApp.bind(this)} style={styles.buttonMenuPage}>
						<Image style={styles.iconNav} source={require('../../media/icons/share.png')}/>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.shareAppFacebook.bind(this)} style={styles.buttonMenuPage}>
						<Image style={styles.iconNav} source={require('../../media/icons/facebook-logo.png')}/>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	viewNavigation:{
		width:width,
		height:50,
		position:'relative',
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center'
	},
	bgOverlowNav:{
		position:'absolute',
		top:0,
		left:0,
		width:'100%',
		height:'100%',
		zIndex:10
	},
	bgOverlowNavImage:{
		width:'100%',
		height:50,
		resizeMode:'cover'
	},
	contentNavigation:{
		width:'100%',
		height:'100%',
		position:'absolute',
		top:0,
		left:0,
		zIndex:11,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center'
	},
	buttonMenuPage:{
		flex:1,
		width:width/2,
		height:'100%',
		justifyContent:'center',
		alignItems:'center'
	},
	iconNav:{
		width:30,
		height:30,
		resizeMode:'contain',
		opacity:0.54,
		tintColor:'#fff'
	}
})

const mapStateToProps = (state) => {
	return {
		config:state.config
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateUserFirstName:(firstname)=>{
			const updateUserName = ()=>{
				return dispatch({
					type:'UPDATE_USER_FIRSTNAME',
					firstname:firstname
				})
			}

			updateUserName()
		}	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBottomHome)