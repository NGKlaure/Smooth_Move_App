import React from "react";
import { View, Text, Button } from "react-native";
import {Alert, StyleSheet, TouchableHighlight, ScrollView, TouchableOpacity, Dimensions, KeyboardAvoidingView} from 'react-native';

const PADDING = 20
const MARGIN = 60
const DEVICE_WIDTH = Dimensions.get('window').width



class TrialInfoScreen extends React.Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            
            currentTrial: this.props.navigation.getParam('currentTrial', 'chet')
        }
         
    }
    //adds title and styling to header
	static navigationOptions = ({navigation}) => {
		return {
			headerTitle: (
            <View style={styles.header_view}>
                <Text style={styles.header_text}>
                    {navigation.state.params.currentTrial.trialID} 
                </Text>
                <Text style={styles.header_text}>
                    {navigation.state.params.currentTrial.trialDate}
                </Text>
            </View>),
            headerStyle: { height: 35 },
			
			
		};
	};

	render() 
	{
		return (
			 <View behavior='padding' style={styles.container}>

				<Text style={styles.title_text}>put result Here; succeed or echec</Text>


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
  header_view: {
      flexDirection:'row',
      padding: 15,
      //alignItems:'center',
      justifyContent:'space-evenly'
      
  },

  title_text: {
    fontWeight: '600',
    fontSize: 26,
  },
  header_text: {
    fontWeight: '600',
    fontSize: 18,
    margin:20
  },
})


export default TrialInfoScreen