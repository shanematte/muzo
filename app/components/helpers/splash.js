import React, { Component } from 'react'

import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Alert,
	Image
} from 'react-native'

import { connect } from 'react-redux'

const { width, height } = Dimensions.get('window')

class Splash extends Component {
	render(){

		let { splash } = this.props.loading

		return(
			<View style={splash ? styles.viewLoader : styles.viewLoaderNot}>
				<Image source={require('../../media/splash-logo.png')} style={styles.logoStyle} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	logoStyle:{
		width:width/2,
		height:width/2
	},
	viewLoader:{
		width:'100%',
		height:height,
		flex:1,
		position:'absolute',
		top:0,
		left:0,
		zIndex:99999999,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#fff'
	},
	viewLoaderNot:{
		width:0,
		height:0,
		zIndex:-1,
		opacity:0
	},
	loaderTitle:{
		color:'#fff'
	}
})

const mapStateToProps = (state) => {
	return {
		loading:state.loading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
