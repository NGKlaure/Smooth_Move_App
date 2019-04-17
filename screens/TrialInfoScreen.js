import React from "react";
import { View, Text, Button } from "react-native";
import {Alert, StyleSheet,TextInput, TouchableHighlight, ScrollView, TouchableOpacity, Dimensions, KeyboardAvoidingView} from 'react-native';
import { Component } from 'react';
import axios from 'axios';
import PureChart from 'react-native-pure-chart';


const PADDING = 20
const MARGIN = 60
const DEVICE_WIDTH = Dimensions.get('window').width



class TrialInfoScreen extends React.Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            currentTrial: this.props.navigation.getParam('currentTrial', 'chet'),
			/*data:[
					 {
					  seriesName: 'series1',
					  data: [
						{x: '2018-02-01', y: 30},
						{x: '2018-02-02', y: 200},
						{x: '2018-02-03', y: 170},
						{x: '2018-02-04', y: 250},
						{x: '2018-02-05', y: 10}
					  ],
					  color: '#297AB1'
					},
					{
					  seriesName: 'series2',
					  data: [
						{x: '2018-02-01', y: 20},
						{x: '2018-02-02', y: 100},
						{x: '2018-02-03', y: 140},
						{x: '2018-02-04', y: 550},
						{x: '2018-02-05', y: 40}
					  ],
					  color: 'yellow'
					}
				],*/
				
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
	
	

	/*clickGet(){
	 
	  var url = 'http://192.168.0.235:3210/getdata';
	  axios.get(url)
	  .then((ambilData) => {
		console.log(ambilData.getdata);
		this.setState({
      datas: ambilData.getdata,
    }) 
  })
};*/
	 //<Text>All speed data {this.state.currentTrial.trialAllSpeed}</Text>
	 // <PureChart data={sampleData1} type='line' />
	 //<PureChart data={sampleData2} type='line' />
	 // <PureChart data={sampleData3} type='line' />

	render() 
	{
		
		let sampleData = this.state.currentTrial.trialAllSpeed;
		let sampleData1 = this.state.currentTrial.trialJerkXData;
		let sampleData2 = this.state.currentTrial.trialJerkYData;
		let sampleData3 = this.state.currentTrial.trialJerkZData;
		console.log(sampleData1);
		//console.log(this.state.data2)
		
		return (
			 <ScrollView>
			   <Text style={styles.title_text}> Trial Summary</Text>
			   <Text >Trial Duration is: {this.state.currentTrial.time_elapsed}</Text>
			   <Text> Trial result:{this.state.currentTrial.trialResult}</Text>
			   <Text>Average slow period speed data is {this.state.currentTrial.trialSPAVG}</Text>
			   <Text>Average fast speed data {this.state.currentTrial.trialFPAVG}</Text>
			   
			    <Text> the maximum speed is: {this.state.currentTrial.trialMaxSpeed}</Text>
				<Text> the lower fast speed is: {this.state.currentTrial.trialMinSpeed}</Text>
				 <Text> speed peak representation: {}</Text>
			     <PureChart data={sampleData}  type='line' />

		
                 <Text>All X Jerk data { }</Text>
				<PureChart data={sampleData1} type='line' />
				 
				 <Text>All Y jerk data {}</Text>
				 
				 
				 <Text>All  Z jerk data {}</Text>
				
				    

				

			 </ScrollView>
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
    fontSize: 15,
  },
  header_text: {
    fontWeight: '600',
    fontSize: 18,
    margin:20
  },
  login_button: {
		justifyContent: "center",
		alignItems: 'center',
		backgroundColor: '#80abd1',
		padding: 20,
		margin: 5,
		width: '80%',
		borderWidth: 1,
		borderColor: '#edefea',
		borderRadius: 40
	},
	sub_title_text: {
		justifyContent: "center",
		fontSize: 24,
		color: '#edefea',
	},
})





export default TrialInfoScreen;