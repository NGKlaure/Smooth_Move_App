import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";
import moment from 'moment'
import SelectUserScreen from './screens/SelectUserScreen'
import AdminTestListScreen from './screens/AdminTestListScreen'

import CreateNewTestScreen from './screens/CreateNewTestScreen'
import AdminTestInfoScreen from './screens/AdminTestInfoScreen'
import UserTestInfoScreen from './screens/UserTestInfoScreen'
import TrialInfoScreen from './screens/TrialInfoScreen'
import UserTestListScreen from './screens/UserTestListScreen'
import RunTestScreen from './screens/RunTestScreen'

//import AddPatientScreen from './screens/AddPatientScreen'
import PatientListScreen from './screens/PatientListScreen'

import { Provider } from 'react-redux';

import createStore from './redux/store.js';
const store = createStore();




const styles = StyleSheet.create({
	tab_text: 
	{
		fontWeight: '600',
		color: 'black'
	},
})



const testListNavigator = createStackNavigator(
{
	//'patient_list_tab': PatientListScreen,
	'test_list_tab': AdminTestListScreen,
	'admin_test_info_screen': AdminTestInfoScreen,
    'trial_info_screen':TrialInfoScreen,
	'edit_test_screen': CreateNewTestScreen, //for editing existing tests, tabs are hidden when navigating from this page
	//'AddPatient': AddPatientScreen,
	
},
{
	initialRouteName: 'test_list_tab'
});

testListNavigator.navigationOptions = ({navigation}) => {
	let tabBarVisible = true;

	if (navigation.state.index > 0) 
	{
		tabBarVisible = false;
	}
	
	return {tabBarVisible}
}

/*const addPatientNavigator = createStackNavigator(
{'AddPatient': AddPatientScreen,}
)*/

const adminTabNavigator = createBottomTabNavigator(
{
	'Test List': 
	{
		screen: testListNavigator, //Tests that hold all created tests
		navigationOptions:
		{
			tabBarLabel: (<View style={{alignItems:'center', justifyContent:'center', paddingBottom: 12}}>
							<Text style={styles.tab_text}>Test List</Text></View>),

		}
	},
	'Add Test': 
	{
		screen: CreateNewTestScreen,  //for initially creating tests, tabs are visible
		navigationOptions:
		{
			tabBarLabel: (<View style={{alignItems:'center', justifyContent:'center', paddingBottom: 12}}>
							<Text style={styles.tab_text}>Add Test</Text></View>)
		},


	}
	
},
{
	initialRouteName: 'Test List',
	tabBarOptions: 
	{
		activeBackgroundColor:'#b9b9a4',

		
	}

});


const userStackNavigator = createStackNavigator({
    'user_test_list':UserTestListScreen,
    'user_test_info_screen':UserTestInfoScreen,
    'run_test_screen':RunTestScreen
},
{
    initialRouteName: 'user_test_list'
});
userStackNavigator.navigationOptions = ({navigation}) => {
	let tabBarVisible = true;

	if (navigation.state.index > 0) 
	{
		tabBarVisible = false;
	}
	return {tabBarVisible}
}
const userTabNavigator = createBottomTabNavigator( //one tab currently
{
	'user_test_list_tab': 
	{
		screen: userStackNavigator, //Tests that hold all created tests
		navigationOptions:
		{
			tabBarLabel: (<View style={{alignItems:'center', justifyContent:'center', paddingBottom: 12}}>
							<Text style={styles.tab_text}>Test List</Text></View>),

		}
	},
	
},
{
	initialRouteName: 'user_test_list_tab',
	tabBarOptions: 
	{
		activeBackgroundColor:'#b9b9a4',
	}

});

const selectUserStackNavigator = createStackNavigator(
{
	'Home': SelectUserScreen,
	'AdminTabs':adminTabNavigator,
	'UserTabs':userTabNavigator
	
},
{
	initialRouteName: 'Home'
});


const AppContainer = createAppContainer(selectUserStackNavigator);

export default class App extends React.Component
{
	
	constructor(props)
	{
		super(props)
		this.state = {
			
			testList: 
			[
			{
				testID:1,
				testName:"Speed Test 1",
				testDuration:'00:10',
				testTrials:"default",
				tesMaxSpeed:0.47,
				testDescription:"you have 10 seconds to perform the following task. pick up the phone and move it to a shelf or other location. You have two attempts left you need to reach a maximun speed of 0.47 to succed the test",
                trialList: [
                {
                    trialID:1,
                    trialDate: moment("12-11-2018 12:12",'DD/MM/YYYY HH:mm').format('LLL'),
                    //trialDate:moment("12-11-2018", 'mm-dd-yyyy').format('LLL'),
                    time_elapsed: '00:52',
					trialResult: 'succeed',
					trialSPAVG: 0,
					trialFPAVG: 0,
					trialMaxSpeed:0,
					trialMinSpeed: 0,
					trialAllSpeed:0,
					trialJerkData:0
                },
                {
                    trialID:2,
                    trialDate:"11-25-2018",
                    trialDate: moment("25-11-2018 06:07",'DD/MM/YYYY HH:mm').format('LLL'),
                    time_elapsed: '00:30',
					trialResult: 'succeed',
					trialSPAVG: 0,
					trialFPAVG: 0,
					trialMaxSpeed:0,
					trialMinSpeed: 0,
					trialAllSpeed:0,
					trialJerkData:0
                },
                {
                    trialID:3,
                    trialDate:"11-17-2018",
                    trialDate: moment("17-11-2018 10:15",'DD/MM/YYYY HH:mm').format('LLL'),
                    time_elapsed: '01:12',
					trialResult: 'succeed',
					trialSPAVG: 0,
					trialFPAVG: 0,
					trialMaxSpeed:0,
					trialMinSpeed: 0,
					trialAllSpeed:0,
					trialJerkData:0
                },
                {
                    trialID:4,
                    trialDate:"11-06-2018",
                    trialDate: moment("06-11-2018 11:56",'DD/MM/YYYY HH:mm').format('LLL'),
                    time_elapsed: '01:32',
					trialResult: 'succeed',
					trialSPAVG: 0,
					trialFPAVG: 0,
					trialMaxSpeed:0,
					trialMinSpeed: 0,
					trialAllSpeed:0,
					trialJerkData:0,
					trialJerkXData:0,
					trialJerkYData:0,
					trialJerkZData:0
                }],
                maxTrials:6
			},
			{
				testID:2,
				testName:"Speed Test 2",
				testDuration:"default",
				testTrials:"default",
				tesMaxSpeed:0.47,
				testDescription:"Default",
                trialList: [],
                maxTrials:10
			},
			{
				testID:3,
				testName:"Speed Test 3",
				testDuration:"default",
				testTrials:"default",
				tesMaxSpeed:0.6,
				testDescription:"default",
                trialList: [],
                maxTrials:10
			},
			]
		}
		
	}
	
	
    
	
	addTestToList = (newTest) => {
        temp_test_list = this.state.testList
		if (temp_test_list.length === 0)
			newTest['testID'] = 1
        else
            newTest['testID'] = this.getMaxTestID() + 1
        temp_test_list = [...temp_test_list,newTest]

		this.setState(
		{
			testList:[...this.state.testList, newTest]
        }, 
        () => {console.log('new state ',this.state)})
        
        return true
	}
    
    removeTrial = (testID, trialID) =>
    {
        console.log('deleting trial ' + trialID.toString() + ' from test ' + testID.toString())
        test_list = this.state.testList

		test = test_list.find(obj => obj.testID == testID)
		test_index = test_list.findIndex(obj => obj.testID == testID)
        test_list[test_index].trialList = test.trialList.filter((T) => T.trialID != trialID)
        this.setState({testList:test_list})
    }
    
    
	removeTest = (testID) => {
		console.log('deleting test number ' + testID.toString())
		temp_test_list = this.state.testList
		temp_test_list = temp_test_list.filter(tst => tst.testID != testID)
		this.setState({testList: temp_test_list})
	}
    
    getMaxTestID = () =>
    {

        let temp_list = this.state.testList
        let indexList = temp_list.map(tst => tst.testID)
        let maxID = Math.max(...indexList)
        return maxID         
    }

    addTrial = (testID, time_string, message, avgslowspeedval, avgfastspeedval, allspeed, maxspeedval, 
			minspeedval,jerkArray, jerkXArray, jerkYArray, jerkZArray) => 
    {

        let temp_test_list = this.state.testList
        let currentTest = temp_test_list.filter( (T) => T.testID == testID )
        let test_index = temp_test_list.findIndex(obj => obj.testID == testID)

        
        let trialIndexes = temp_test_list[test_index].trialList.map(tst => tst.trialID)
        let maxID = Math.max(...trialIndexes)
        
        let newTrial = {
            trialID:1,
            time_elapsed: time_string,
            trialDate: moment().format('LLL'),
			trialResult: message,
			trialSPAVG: avgslowspeedval,
			trialFPAVG: avgfastspeedval,
			trialAllSpeed: allspeed,
			trialMaxSpeed: maxspeedval,
			trialMinSpeed: minspeedval,
			trialJerkData: jerkArray,
			trialJerkXData: jerkXArray,
			trialJerkYData: jerkYArray,
			trialJerkZData: jerkZArray
        }
        
        if (trialIndexes.length !== 0)
        {
            newTrial['trialID'] = maxID + 1
        }


        console.log(newTrial.trialDate)
        temp_test_list[test_index].trialList = [...temp_test_list[test_index].trialList, newTrial]
        this.setState({testList: temp_test_list})
        
    }
	
	updateTrialPage = () =>
	{
		
	}
	
	
	
	render()
	{
		return( 
		    <Provider store={store}>
		   
			 <AppContainer 
				screenProps={
					{
						testList: this.state.testList,
						addTestToList: this.addTestToList,
                        removeTest: this.removeTest,
                        getMaxTestID: this.getMaxTestID,
                        removeTrial: this.removeTrial,
                        addTrial: this.addTrial,
						
						
					}} />
			 </Provider>		
		    
		  );
	}
	
}


/*

//state
patientList:[{patientID:1,
				patientName:"nad",
				patientPhone:"1234567890",}
				],


				// method
addPatientToList = (newPatient)=>{
		temp_patient_list = this.state.patientList
		if (temp_patient_list.length === 0)
			newPatient['patientID'] = 1
		else
			newPatient['patientID'] = this.getMaxPatientID() + 1
		temp_patient_list = [...temp_patient_list,newPatient]
		
		this.setState(
		{patientList:[...this.state.patientList,newPatient]},
		
		() => {console.log('new state',this.state)}
		)
		return true
	
	}
	
	
	removePatient = (patientID) => {
		console.log('deleting patient number ' + patientID.toString())
		temp_patient_list = this.state.patientList
		temp_patient_list = temp_patient_list.filter(tst => tst.patientID != patientID)
		this.setState({patientList: temp_patient_list})
	}
	
	getMaxPatientID = () =>{
		
		let temp_list1 =  this.state.patientList
		let indexList1 = temp_list1.map(tst => tst.patientID)
		let maxID1 = Math.max(...indexList1)
		return maxID1
	}
	
	screenprops
	
	patientList: this.state.patientList,
						addPatientToList: this.addPatientToList,
                        removeTPatient: this.removeTest,
                        getMaxPatientID: this.getMaxTestID
						
*/