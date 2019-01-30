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


const styles = StyleSheet.create({
	tab_text: 
	{
		fontWeight: '600',
		color: 'black'
	},
})


const testListNavigator = createStackNavigator(
{
	'test_list_tab': AdminTestListScreen,
	'admin_test_info_screen': AdminTestInfoScreen,
    'trial_info_screen':TrialInfoScreen,
	'edit_test_screen': CreateNewTestScreen, //for editing existing tests, tabs are hidden when navigating from this page
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
				testName:"Chetting Around",
				testDuration:"default",
				testTrials:"default",
				testDescription:"The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.",
                trialList: [
                {
                    trialID:1,
                    trialDate: moment("12-11-2018 12:12",'DD/MM/YYYY HH:mm').format('LLL'),
                    //trialDate:moment("12-11-2018", 'mm-dd-yyyy').format('LLL'),
                    time_elapsed: '00:52'
                },
                {
                    trialID:2,
                    trialDate:"11-25-2018",
                    trialDate: moment("25-11-2018 06:07",'DD/MM/YYYY HH:mm').format('LLL'),
                    time_elapsed: '00:30'
                },
                {
                    trialID:3,
                    trialDate:"11-17-2018",
                    trialDate: moment("17-11-2018 10:15",'DD/MM/YYYY HH:mm').format('LLL'),
                    time_elapsed: '01:12'
                },
                {
                    trialID:4,
                    trialDate:"11-06-2018",
                    trialDate: moment("06-11-2018 11:56",'DD/MM/YYYY HH:mm').format('LLL'),
                    time_elapsed: '01:32'
                }],
                maxTrials:6
			},
			{
				testID:2,
				testName:"Chetack",
				testDuration:"default",
				testTrials:"default",
				testDescription:"The Gulf of Sidra Offensive was an offensive of the Second Libyan Civil War. It was launched by the Benghazi Defense Brigades on 11 June 2018[1], and was fought concurrently with the Battle of Derna (2018). The Benghazi Defense Brigades captured Ras Lanuf and Sidra, before the Libyan National Army started a counteroffensive on 17 June[6]. On 21 June, The LNA captured Ras Lanuf and Al Sidra[7]. Hours later, The Benghazi Defense Brigades claimed to capture these cities once again[8][9], but the LNA denied these claims, releasing pictures showing their soldiers within Sidra and Ras Lanuf.[10]",
                trialList: [],
                maxTrials:10
			},
			{
				testID:3,
				testName:"Chetlupa",
				testDuration:"default",
				testTrials:"default",
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

    addTrial = (testID, time_string) => 
    {

        let temp_test_list = this.state.testList
        let currentTest = temp_test_list.filter( (T) => T.testID == testID )
        let test_index = temp_test_list.findIndex(obj => obj.testID == testID)

        
        let trialIndexes = temp_test_list[test_index].trialList.map(tst => tst.trialID)
        let maxID = Math.max(...trialIndexes)
        
        let newTrial = {
            trialID:1,
            time_elapsed: time_string,
            trialDate: moment().format('LLL')
        }
        
        if (trialIndexes.length !== 0)
        {
            newTrial['trialID'] = maxID + 1
        }


        console.log(newTrial.trialDate)
        temp_test_list[test_index].trialList = [...temp_test_list[test_index].trialList, newTrial]
        this.setState({testList: temp_test_list})
        
    }
    
	render()
	{
		return <AppContainer 
				screenProps={
					{
						testList: this.state.testList,
						addTestToList: this.addTestToList,
                        removeTest: this.removeTest,
                        getMaxTestID: this.getMaxTestID,
                        removeTrial: this.removeTrial,
                        addTrial: this.addTrial
					}} />
	}
	
}

