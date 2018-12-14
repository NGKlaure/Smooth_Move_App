import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";

import SelectUserScreen from './screens/SelectUserScreen'
import AdminTestListScreen from './screens/AdminTestListScreen'
import UserTestListScreen from './screens/UserTestListScreen'

import CreateNewTestScreen from './screens/CreateNewTestScreen'
import TestInfoScreen from './screens/TestInfoScreen'
import TrialInfoScreen from './screens/TrialInfoScreen'
import StatisticScreen from './screens/StatisticScreen'

const styles = StyleSheet.create({
	tab_text: 
	{
		fontWeight: '600',
		color: 'black'
	},
})





//user tab
const userTestListNavigator = createStackNavigator(
{
	'UserTabs': UserTestListScreen,
	'test_info_screen': TestInfoScreen,
	'edit_test_screen': CreateNewTestScreen, //for editing existing tests, tabs are hidden when navigating from this page
},
{
	initialRouteName: 'UserTabs'
});

const userTabNavigator = createBottomTabNavigator(
{
	'Test List': 
	{
		screen: userTestListNavigator, //Tests that hold all created tests
		navigationOptions:
		{
			tabBarLabel: (<View style={{alignItems:'center', justifyContent:'center', paddingBottom: 12}}>
							<Text style={styles.tab_text}>Test List</Text></View>),

		}
	},
	'View Statistics': 
	{
		screen: StatisticScreen,  //for initially creating tests, tabs are visible
		navigationOptions:
		{
			tabBarLabel: (<View style={{alignItems:'center', justifyContent:'center', paddingBottom: 12}}>
							<Text style={styles.tab_text}>View Statistics</Text></View>)
		},


	}
	
},
{
	initialRouteName: 'Test List',
	tabBarOptions: 
	{
		activeBackgroundColor:'#b9b9a4',
		//tabStyle:
		//{
		//	backgroundColor: 'black'
		//}
		
	}

});
//end user tab


const testListNavigator = createStackNavigator(
{
	'test_list_tab': AdminTestListScreen,
	'test_info_screen': TestInfoScreen,
    'trial_info_screen':TrialInfoScreen,
	'edit_test_screen': CreateNewTestScreen, //for editing existing tests, tabs are hidden when navigating from this page
},
{
	initialRouteName: 'test_list_tab'
});

testListNavigator.navigationOptions = ({navigation}) => {
	//let tabbarVisible = true;
	//if (navigation.state.index > 0)
	//	tabBarVisible = false
	//return{tabBarVisible}
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
		//tabStyle:
		//{
		//	backgroundColor: 'black'
		//}
		
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
                    trialDate:"12-11-2018"
                },
                {
                    trialID:2,
                    trialDate:"11-25-2018"
                },
                {
                    trialID:3,
                    trialDate:"11-17-2018"
                },
                {
                    trialID:4,
                    trialDate:"11-06-2018"
                }],
			},
			{
				testID:2,
				testName:"Chetack",
				testDuration:"default",
				testTrials:"default",
				testDescription:"The Gulf of Sidra Offensive was an offensive of the Second Libyan Civil War. It was launched by the Benghazi Defense Brigades on 11 June 2018[1], and was fought concurrently with the Battle of Derna (2018). The Benghazi Defense Brigades captured Ras Lanuf and Sidra, before the Libyan National Army started a counteroffensive on 17 June[6]. On 21 June, The LNA captured Ras Lanuf and Al Sidra[7]. Hours later, The Benghazi Defense Brigades claimed to capture these cities once again[8][9], but the LNA denied these claims, releasing pictures showing their soldiers within Sidra and Ras Lanuf.[10]",
                trialList: []
			},
			{
				testID:3,
				testName:"Chetlupa",
				testDuration:"default",
				testTrials:"default",
				testDescription:"default",
                trialList: []
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

    
	render()
	{
		return <AppContainer 
				screenProps={
					{
						testList: this.state.testList,
						addTestToList: this.addTestToList,
                        removeTest: this.removeTest,
                        getMaxTestID: this.getMaxTestID,
                        removeTrial: this.removeTrial
					}} />
	}
	
}

