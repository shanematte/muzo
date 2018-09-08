import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet
} from 'react-native'

class Header extends Component {
	render(){

		return(
			<View>
				<View style={styles.headerContent}>
					<Text style={styles.headerTitle}>{ this.props.headerTitle }</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	headerContent:{
		width:'100%',
		height:50,
		backgroundColor:'#251e28',
		justifyContent:'center',
		alignItems:'flex-end',
		paddingRight:15,
		paddingLeft:15
	},
	headerTitle:{
		color:'rgba(255,255,255,0.6)',
		fontSize:18
	}
})


export default Header