import React from "react";
import { View, Text, Button } from "react-native";
import {Alert, StyleSheet, TouchableHighlight, ScrollView, TouchableOpacity, Dimensions, KeyboardAvoidingView} from 'react-native';

const PADDING = 20
const MARGIN = 60
const DEVICE_WIDTH = Dimensions.get('window').width



class SelectUserScreen extends React.Component 
{
	
    //navigates to admin side of application
	loginAdmin = () => {
		this.props.navigation.navigate('AdminTabs', )
	}	
    //navigates to user side of application
	loginUser = () => {
		this.props.navigation.navigate('UserTabs')
	}	
	
	render() 
	{
		return (
			 <View behavior='padding' style={styles.container}>
				<View style = {{marginBottom: 40, alignItems:'center'}}>
					<Text style = {styles.title_text}>Smooth Move</Text>
				</View>
				<View style = {{width: '100%', alignItems:'center'}}>
					<TouchableOpacity
						onPress={this.loginUser}
						style={styles.user_button}
						activeOpacity={1}
						>

					<Text style={styles.button_text}>User</Text>

					</TouchableOpacity>
					
					<TouchableOpacity
						onPress={this.loginAdmin}
						style={styles.user_button}
						activeOpacity={1}
						>

					<Text style={styles.button_text}>Admin</Text>

					</TouchableOpacity>
				</View>
			 </View>
		);
	}
	
	//chet
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: PADDING,
  },

  title_text: {
    fontWeight: '600',
    fontSize: 26,
  },
  user_button: {
    height: MARGIN,
    width: '100%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    zIndex: 100,
    backgroundColor: '#3c6989'
  },
  button_text: {
    fontWeight: '600',
    color: 'white'
  },
})

/*
  studentsWorkingImage: {
    width: 100,
    height: 100,
  },

  input: {
    padding: 10,
    height: 60,
    width: '100%',
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    textAlign: 'left',
    fontWeight: '600',
  },



  button_text: {
    fontWeight: '600',
    color: 'white'
  },

  loading: {
    width: 45,
    height: 45,
  },

  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#38d39f',
  },

  newUser: {
    zIndex: -100,
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },

  signup: {
    marginLeft: 5,
    fontWeight: '800',
    color: '#38d39f',
  },
});
*/

export default SelectUserScreen