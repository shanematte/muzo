import React, { Component } from 'react'

import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Alert
} from 'react-native'

import { connect } from 'react-redux'
import Spinner from 'react-native-spinkit'

const { width, height } = Dimensions.get('window')

//spinners
//types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],

class Loader extends Component {
	render(){

		let { loading } = this.props.loading

		return(
			<View style={loading ? styles.viewLoader : styles.viewLoaderNot}>
				<Spinner style={styles.spinner} isVisible={true} size={35} type="FadingCircleAlt" color="#373737" />
				<Text  style={styles.loaderTitle}>ЗАГРУЖАЕМ</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	spinner:{
		marginBottom:15
	},
	viewLoader:{
		width:'100%',
		height:height,
		flex:1,
		position:'absolute',
		top:0,
		left:0,
		zIndex:999999,
		flexDirection:'column',
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'rgba(255,255,255,0.92)'
	},
	viewLoaderNot:{
		width:0,
		height:0,
		zIndex:-1,
		opacity:0
	},
	loaderTitle:{
		color:'rgba(0,0,0,0.56)',
		fontSize:16
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

export default connect(mapStateToProps, mapDispatchToProps)(Loader)
