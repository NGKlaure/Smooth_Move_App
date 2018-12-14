import React from "react";
import { View, Text, Button } from "react-native";
import {Alert, StyleSheet, TouchableHighlight, ScrollView, TouchableOpacity, Dimensions, KeyboardAvoidingView} from 'react-native';

const PADDING = 20
const MARGIN = 60
const DEVICE_WIDTH = Dimensions.get('window').width



class TrialInfoScreen extends React.Component 
{

	render() 
	{
		return (
			 <View behavior='padding' style={styles.container}>

				<Text style={styles.title_text}>CHET TRIAL</Text>


			 </View>
		);
	}

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

})


export default TrialInfoScreen