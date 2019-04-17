import React from "react";
import { View, Text, Button } from "react-native";
import {Alert, StyleSheet, ScrollView, TouchableOpacity, Vibration,TextInput,Dimensions, KeyboardAvoidingView} from 'react-native';
import Swipeout from 'react-native-swipeout';
import TrialListRow from './TrialListRow';

import { Component } from 'react';
import axios from 'axios';

import { Accelerometer } from 'expo';
//import AccelerometerSensor from "../components/AcceloData.js";

//import { connect } from 'react-redux';
const speedPeak = 0.47
const VIBRATIONDURATION = 1000;
const VIBRATIONPATTERN = [1000, 2000, 3000];

var slowspeeddata =[];
var fastpeeddata =[];
let AVGSlowspeed;
var AVGFastspeed;
var allSpeedData = [];
var maxSpeed;
var minSpeed;

var jerkVals = [];
var jerkValX = [];
var jerkValY = [];
var jerkValZ = [];
//var xData= [];
//var yData = [];
//var zData = [];

var JerkdataAvg = [];

const k = 0.4;// Kfiltrering factor  is calculated as t / (t + dT)
          // with t, the low-pass filter's time-constant
          // and dT, the event delivery rate


class RunTestScreen extends React.Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            currentTest: this.props.navigation.getParam('currentTest','chet'),
			
            stopwatchOn: false,

            secs:0, 
            mins:0,
            time_string:'00:00',
            intervalObj:0,
			
			accelerometerData: {},
			jerkData: {},
			slowavg:[],
			fastavg:[],
			allspeed:[],
			jerkArray:[],
			
			jerkXArray:[],
			jerkYArray:[],
			jerkZArray:[],
			
			
			avgslowspeedval:0,
			avgfastspeedval:0,
			maxspeedval: 0,
			minspeedval: 0,
			
			message: '',
			 
		     magnitude: [],
      avgAcc: [],
      stateOfUser: {},
      clrs: {
        clrWalk: '',
        clrRun: '',
        clrFaster: '',
		momentum: []
      },
	
			
            
        }

        this.incrementTime = this.incrementTime.bind(this)
        this.updateStopwatchDisplay = this.updateStopwatchDisplay.bind(this)
		//this.updateslowavg = this.updateslowavg.bind(this)
        
    }
	
    //adds a title and styling to header
    static navigationOptions = ({navigation}) => (
    {
        //title: navigation.state.params.testName,//`${navigation.state.params.title}`
        headerStyle:
        {
            backgroundColor:'#bd4440',
            paddingBottom: 20,
        },
        headerTitle: (<View style={styles.header_view}>
                        <Text style={styles.header_text}>
                            {navigation.state.params.currentTest.testName}
                        </Text>
                     </View>),
        //headerTitleStyle: {ma 40}

        
    })
    

	
	 componentDidMount() {
    this._toggle();
  }

  
	//suscribe to Accelerometer
	 _subscribe = () => {
   this._subscription = Accelerometer.addListener(accelerometerData => {
      let length = this.state.magnitude.length;
	  //console.log(length)
      if (length === 3) {
        let i;
        let aX; let bY; let cZ;
        let accResults = [];
        let momentum = [];
        let magnitude = this.state.magnitude;
		
		
        for (i = 0; i < this.state.magnitude.length; i++){

          {/*
           setting X, Y, Z axis variables 
          */}
          const x = magnitude[i].x;
          const y = magnitude[i].y;
          const z = magnitude[i].z;
          {/*
             Calculating average acceleration 
          */}
		  
		// console.log(this.state.currentTest.tesMaxSpeed )
          let avgRes = Math.sqrt(( Math.pow(x, 2) ) + ( Math.pow(z, 2) ) + (Math.pow(y, 2)));
			
          {/*
           combine results 
          */}
          accResults = accResults.concat(avgRes);
          // console.log(accResults)
		 
        }


        if( accResults.length === 3){
          for (i = 0; i < accResults.length; i++){

              momentum.push(Math.abs(accResults[i] * 0.50 - 0.50) * 3.6) ;
			 

          }     

          for (i = 0 ; i < momentum.length; i++){
            if (i === 0) {
              aX = momentum[i];
            }
            else if (i === 1) {
              bY = momentum[i];
            }
            else if (i === 2) {
              cZ = momentum[i];
            }
          }

          {/* Calculating users speed */}
          const momentumUser = (aX + bY + cZ) / 3;
			//console.log(momentumUser)
			allSpeedData.push(momentumUser)
			
          if ( momentumUser < this.state.currentTest.tesMaxSpeed ){
			 
			   slowspeeddata.push(momentumUser);
			 
				
			 
            this.setState({
              stateOfUser: {runOrWalk: 'Slow Move'},
              clrs: {clrWalk: '#c9feff'},
			  
            });

          } else if ( momentumUser > this.state.currentTest.tesMaxSpeed ){
            Vibration.vibrate(VIBRATIONDURATION);
			fastpeeddata.push(momentumUser);
			//console.log(fastpeeddata);
            this.setState({
              stateOfUser: {runOrWalk: 'Fast Move'},
              clrs: {clrRun: '#98fb98'},
            });
          }
        }

        {/* 
          saving data accelerometer data to state
        */}
      
        this.setState({
          magnitude: this.state.magnitude.slice(1),
          accelerometerData: accelerometerData,
         // jerkData: currentJerkData,
          avgAcc: accResults
        });
		//JerkdataAvg.push(jerkData);
		//console.log(JerkdataAvg);
		

      } else if (length < 3) {
        this.setState({
          accelerometerData: accelerometerData,
          magnitude: this.state.magnitude.concat(
              [accelerometerData]
          )
		  
        });
		 //Accelerometer.setUpdateInterval(100) // 100ms is  probably the default value
		 
	
		
		// new jerk calculation
		/*let aceleration = Math.sqrt(( Math.pow(this.state.accelerometerData.x, 2) ) + ( Math.pow(this.state.accelerometerData.x, 2) ) + (Math.pow(this.state.accelerometerData.x, 2)));
		//console.log(aceleration)
		let jerks
		let a1;
		let a2;
		a1 = 0
		a2 = aceleration;
	
		jerks = a2 - a1 / 0.001
		console.log(jerks)
		*/
		
		// first metod used to calculate the jerkArray
		//References for sensor calculation
        // https://developer.android.com/reference/android/hardware/SensorEvent.html

		let px ;
		let py;
		let pz;
		px = 0;
		py = 0;
		pz = 0;
		
		let pax = px;
		let pay = py;
		let paz = pz;
		
		px = this.state.accelerometerData.x - ((this.state.accelerometerData.x * k) + (px * (1.0 - k)));
		py = this.state.accelerometerData.y - ((this.state.accelerometerData.y * k) + (py * (1.0 - k)));
		pz = this.state.accelerometerData.z - ((this.state.accelerometerData.z * k) + (pz * (1.0 - k)) );
		
		let X = Math.abs(round(px - pax));
		let Y = Math.abs(round(py - pay));
		let Z = round(pz - paz);
	
		let currentJerkData = {X, Y, Z}
		this.setState({jerkData: currentJerkData })
		
		jerkVals.push(currentJerkData)
			//console.log(currentJerkData)
			//console.log(jerkVals)
		jerkValX.push(X)
		jerkValY.push(Y)
		jerkValZ.push(Z)
		
			// new jerk calculation	// new jerk calculation
		let aceleration2 = Math.sqrt(( Math.pow(X, 2) ) + ( Math.pow(Y, 2) ) + (Math.pow(Z, 2)));
		//console.log(aceleration2)
		//console.log(sum([1,2,3]))
      }
    });
  }
  
 
	getAverageSlowVal() 
	{
		let sum= 0;
		//console.log(slowspeeddata);
		for(let i = 0; i < slowspeeddata.length; i++)
		{
			sum += slowspeeddata[i];
		    
		}
		AVGSlowspeed = sum / slowspeeddata.length;
					//console.log( AVGSlowspeed);
		
    }
	
	getAverageFastVal = ()=> 
	{
		let sum= 0;
		//console.log(fastpeeddata[0]);
		
		for(let i = 0; i < fastpeeddata.length; i++)
		{
			sum += fastpeeddata[i];
		    
		}
		AVGFastspeed = sum / fastpeeddata.length;
					//console.log( AVGFastspeed);
		
    }
	
	getMaxSpeed()
	{
		//console.log(allSpeedData[0]);
		let max = allSpeedData[0]
		for(let i = 1; i < allSpeedData.length; i++)
		{
			if (allSpeedData[i] > max)
			{
				max = allSpeedData[i]
			}
		}
		maxSpeed = max
	}
	
	
	getMinSpeed()
	{
		//console.log(allSpeedData[0]);
		let min = fastpeeddata[0]
		for(let i = 1; i < fastpeeddata.length; i++)
		{
			if (fastpeeddata[i] < min)
			{
				min = fastpeeddata[i]
			}
		}
		minSpeed = min
	}



	
  componentWillUnmount() {
    this._unsubscribe();
  }
  
   _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  }
 
	
	//unsuscribe the Accelerometer
	
	 _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }
  
   
    //turns on and off the stopwatch
    toggleStopwatch  = () =>
    {
    
        if (this.state.stopwatchOn)
        {
			
            
            this.setState(
            {
                intervalObj: clearInterval(this.state.intervalObj),
                stopwatchOn: false
            })
        }
        else
        {
            this.setState(
            { 
                intervalObj: setInterval(this.incrementTime, 1000),
                stopwatchOn: true
            })
        }
        
    }
    
    //increments the time if stopwatch is on
    incrementTime()
    {
		if (this.state.stopwatchOn) 
		{
			
			this.setState({secs: this.state.secs + 1})
           
            if (this.state.secs == 60)
            {
                this.setState({secs: 0, mins: this.state.mins + 1, })
                
            }
            this.updateStopwatchDisplay()

		}
    }
    
    
    //changes  state of time display after increment
	updateStopwatchDisplay()
	{
		
       //this.setState({slowavg: slowspeeddata})
	    this.getAverageSlowVal()
		this.getAverageFastVal()
		this.getMaxSpeed()
		this.getMinSpeed()
	   //console.log(allSpeedData)
	   //console.log(AVGFastspeed)
	   //console.log(maxSpeed)
	    this.setState({avgslowspeedval: round(AVGSlowspeed)})
		this.setState({avgfastspeedval: AVGFastspeed})
		
	   this.setState({slowavg: slowspeeddata})
	   this.setState({fastavg: fastpeeddata})
	   this.setState({allspeed: allSpeedData})
	   this.setState({jerkArray: jerkVals})
	   this.setState({jerkXArray: jerkValX})
	   this.setState({jerkYArray: jerkValY})
	   this.setState({jerkZArray: jerkValZ})
	   

	   this.setState({minspeedval: round(minSpeed)})
	   this.setState({maxspeedval: round(maxSpeed)})
	   
        secs = this.state.secs > 9 ? "" + this.state.secs : "0" + this.state.secs
        mins = this.state.mins > 9 ? "" + this.state.mins : "0" + this.state.mins
        this.setState({time_string: (mins + ':' + secs) })
		
		if (this.state.maxspeedval < this.state.currentTest.tesMaxSpeed  )
		{
			this.setState({message: 'Trial fail speed is less than '+ this.state.currentTest.tesMaxSpeed })
		}
		else if (this.state.maxspeedval > this.state.currentTest.tesMaxSpeed)
		{
			this.setState({message: ' Trial pass speed is over ' +this.state.currentTest.tesMaxSpeed })
		}
		else if (this.state.time_string === "00:00"  )
		{
			this.setState({message: ' Trial pfail'})
		}
		else
		{
			this.setState({message: ' Trial succeed'})
		}
    }
	
	
	/*updateslowavg(){
		if (this.state.currentTest){
			this.setState({slowavg: slowspeeddata})
		}
	}*/
    
    //submits trial to specified test, saves to master list for that test
    completeTest = () =>
    {
        
		
		
			//console.log(maxSpeed)
        this.props.screenProps.addTrial(this.state.currentTest.testID,
		this.state.time_string, this.state.message, this.state.avgslowspeedval,
		this.state.avgfastspeedval, this.state.allspeed, this.state.maxspeedval,
		this.state.minspeedval,this.state.jerkArray,this.state.jerkXArray, this.state.jerkYArray, this.state.jerkZArray)
        //add trial to list 
        // increment trial count 
        // zero timer
		
		
		//this.updateslowavg()
		
        this.setState({
			
            intervalObj: clearInterval(this.state.intervalObj),
            stopwatchOn: false,
            secs: 0,
            mins: 0,
            time_string: '00:00',
			slowavg:[],
			fastavg:[],
			allspeed:[],
			jerkArray:[],
			
			jerkXArray:[],
			jerkYArray:[],
			jerkZArray:[],
			
			
			avgslowspeedval:0,
			avgfastspeedval:0,
			maxspeedval: 0,
			minspeedval: 0,
			
            
        })
		allSpeedData = [];
		slowspeeddata =[];
        fastpeeddata =[];
		jerkVals = [];
		AVGSlowspeed = 0;
        AVGFastspeed = 0;
		console.log(this.state.maxspeedval)
        Alert.alert('Trial Completed')
		//this.clickPost.bind(this)
			
		
			
		
        this.props.navigation.goBack()
        
    }
	
	clickPostintervalle(){
		setInterval(this.clickPost(),300000)
	}
	
     //methods to post data to a server

     //I have divided it into three post for each test
		// will need to make a forloop that will post data for all the test  already created 
		//and for the new test
		//the actual version only store data for the three test already created
					
	clickPost(){
	
		var url = 'http://192.168.0.235:3210/getdata';
		
			axios.post(url, {
			  currenttest: this.state.currentTest.testID,
			  trialNumber: this.state.currentTest.trialList.length+1,
			  x: this.state.accelerometerData.x,
			  y: this.state.accelerometerData.y,
			  z: this.state.accelerometerData.z,
			  //slowSpeedArray: this.state.slowavg,
			  //slowSpeedAVG: AVGSlowspeed,
			  //fastSpeedArray: this.state.fastavg,
			  //fastSpeedAVG: AVGFastspeed,
			  //allSpeedArray: this.state.allspeed,
			})
			.then(function (response) {
			  //console.log(response);
			})
			.catch(function (error) {
			  //console.log(error);
			});
			this.state.input0 = this.state.currentTest;
			this.state.inputi = this.state.currentTest.trialList.length +1
			this.state.input1 = this.state.accelerometerData.x;
			this.state.input2 = this.state.accelerometerData.y;
			this.state.input3 = this.state.accelerometerData.z;
			this.state.input4 = this.state.slowavg;
			
	};
		
	
	
	
	
	clickPost2(){
	
		var url = 'http://192.168.0.235:3210/getdata2';
			axios.post(url, {
			  currenttest: this.state.currentTest.testID,	
			  trialNumber: this.state.currentTest.trialList.length+1,
			  x: this.state.accelerometerData.x,
			  y: this.state.accelerometerData.y,
			  z: this.state.accelerometerData.z
			})
			.then(function (response) {
			// console.log(response);
			})
			.catch(function (error) {
			 // console.log(error);
			});
			this.state.input0 = this.state.currentTest;
			this.state.inputi = this.state.currentTest.trialList.length +1
			this.state.input1 = this.state.accelerometerData.x;
			this.state.input2 = this.state.accelerometerData.y;
			this.state.input3 = this.state.accelerometerData.z;
	};
	
	clickPost3(){
	
		var url = 'http://192.168.0.235:3210/getdata3';
			axios.post(url, {
			  currenttest: this.state.currentTest.testID,
			  trialNumber: this.state.currentTest.trialList.length+1,
			  x: this.state.jerkData.x,
			  y: this.state.jerkData.y,
			  z: this.state.jerkData.z
			})
			.then(function (response) {
			 // console.log(response);
			})
			.catch(function (error) {
			  //console.log(error);
			});
			this.state.input0 = this.state.currentTest;
			this.state.inputi = this.state.currentTest.trialList.length +1
			this.state.input1 = this.state.jerkData.x;
			this.state.input2 = this.state.jerkData.y;
			this.state.input3 = this.state.jerkData.z;
	};
    
    
	
	
	
	render() 
	{
	
	
		
		
		 let { x, y, z } = this.state.accelerometerData;
		 
		 
		 let { runOrWalk } = this.state.stateOfUser;
		 
		 let totalAcc = x + y + z;
		 
		
		 if (this.state.stopwatchOn)
		 {
			
			if((this.state.currentTest.testID ===1) && (this.state.currentTest.trialList.length <= this.state.currentTest.maxTrials))
				{this.clickPost();}
				else if (this.state.currentTest.testID ===2){ this.clickPost2();}
			else{ this.clickPost3();}
	
			
			
			//console.log("in render state", JSON.stringify(this.state.jerkData.x))
			//console.log("in render testID state ",this.state.maxspeedval)
			//console.log("in render testID state ",this.state.currentTest.testList.length+1)
			
			//console.log("in render state ",this.state.currentTest.trialList.length+1)
			//console.log(JSON.stringify(this.state.accelerometerData));
			 
			 if (this.state.time_string === this.state.currentTest.testDuration){
				this.completeTest()
				/* Alert.alert('reach end time');
				    this.setState({
				intervalObj: clearInterval(this.state.intervalObj),
				stopwatchOn: false,
				secs: 0,
				mins: 0,
				time_string: '00:00'
				
			})*/
				 
			 }
			 
			
			 
			 return (
			   <View style={styles.container}>
			        
				   
		
				   
				    <View style={{margin: 20, margin: 10, textAlign: 'center', fontSize: 20, paddingTop: 70,
						backgroundColor: this.state.clrs.clrRun || this.state.clrs.clrWalk }}>
				      
						<View style={styles.runContainer}>
							<Text style={styles.momentumText}>{runOrWalk}</Text>
						</View>
						<View style={styles.sensorContainer}>
						
							<Text style={styles.sensorText}>x: {round(x)} y: {round(y)} z: {round(z)}</Text>
						</View>
						
				   
					</View>
			   
	
			
			        <TouchableOpacity onPress={this._toggle} style={styles.button}>
			 
			          <View style = {styles.stopwatch_view}>
                       <Text style = {styles.stopwatch_text}>
                         {this.state.time_string}
                       </Text>
                       </View>
			 
                     
                    </TouchableOpacity>
		  
		   <View style={styles.run_test_button_view}>
                    <TouchableOpacity
                    onPress={this.toggleStopwatch}
                    style={this.state.stopwatchOn ? styles.stop_button : styles.start_button}
                    activeOpacity={1}
                    >

                    <Text style={styles.trials_title_text}>{this.state.stopwatchOn ? 'Stop': 'Start'}</Text>

                    </TouchableOpacity>
                </View>
                <View style={styles.complete_test_view}>
                    <TouchableOpacity
                    onPress={this.completeTest}
                    style={styles.complete_test_button}
                    activeOpacity={1}
                    >

                    <Text style={styles.trials_title_text}>Complete Test</Text>

                    </TouchableOpacity>
                </View>
		    
		  </View>
		  
			
			 )
			 
			 
			 
			 
		 }
		 else{
		 	 
		return (
			
			  <View style={styles.container}>
			
                <View style = {styles.stopwatch_view}>
                    <Text style = {styles.stopwatch_text}>
                        {this.state.time_string}
                    </Text>
                </View>
                <View style={styles.run_test_button_view}>
                    <TouchableOpacity
                    onPress={this.toggleStopwatch}
                    style={this.state.stopwatchOn ? styles.stop_button : styles.start_button}
                    activeOpacity={1}
                    >

                    <Text style={styles.trials_title_text}>{this.state.stopwatchOn ? 'Stop': 'Start'}</Text>

                    </TouchableOpacity>
                </View>
                <View style={styles.complete_test_view}>
                    <TouchableOpacity
                    onPress={this.completeTest}
                    style={styles.complete_test_button}
                    activeOpacity={1}
                    >

                    <Text style={styles.trials_title_text}>Complete Test</Text>

                    </TouchableOpacity>
                </View>
			</View>
		);
	}
	}
	//chet
	}




const styles = StyleSheet.create({
	container:
	{
		flex:1,
	},
    stopwatch_view:	{
		flex:5,
        justifyContent: 'center',
        alignItems: 'center'
        //backgroundColor:'gray'
	},
	sensorContainer: {
    alignItems:'center',
    padding: 10
  },
	sensorText: {
    fontSize: 10
  },
    run_test_button_view:{
        flex:2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    complete_test_view: {
        
        flex:2,
        justifyContent: 'center',
        alignItems: 'center'
    },

	title_view:
	{
		flex:1,
        backgroundColor:'#5b9095',
        justifyContent: 'center',
        alignItems: 'center'
	},
    list_view:
	{
		flex:6
	},
    info_title_view:
    {
        flex:1,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    info_description_view:
    {
        
        flex:4,
        padding:5
    },
    stopwatch_text:
    {
        color:'black',
		fontWeight: '600',
		fontSize: 60,
        
    },
    trials_title_text:
    {
        color:'white',
		fontWeight: '600',
		fontSize: 26,
        
    },
    paragraph_text:
    {
        color:'black',
		fontWeight: '200',
		fontSize: 12,    
    },
    divider: {
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1,
    },
    header_view:
    {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection: 'row',
        height: 25,
        
    },
    header_text:
    {
        color:'white',
        alignSelf: 'center',
		fontWeight: '600',
		fontSize: 22,
        paddingBottom:5
    },
  start_button: {
    height: '60%',
    width: '80%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 40,
    zIndex: 100,
    backgroundColor: '#97cc8c'
  },
  stop_button: {
    height: '60%',
    width: '80%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 40,
    zIndex: 100,
    backgroundColor: '#bd4440'
  },
  complete_test_button: {
    height: '60%',
    width: '80%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 40,
    zIndex: 100,
    backgroundColor: '#3c6989'
  },
   runContainer: {
    alignItems:'center'
  },
  momentumText: {
    fontSize: 50,
    fontFamily: 'monospace',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25
  }
})

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

export default RunTestScreen;