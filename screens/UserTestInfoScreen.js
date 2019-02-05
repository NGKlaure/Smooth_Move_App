import React from "react";
import { View, Text, Button, Dimensions } from "react-native";
import {Alert, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Swipeout from 'react-native-swipeout';
import TrialListRow from './TrialListRow'


const PADDING = 20
const MARGIN = 60
const DEVICE_WIDTH = Dimensions.get('window').width

class UserTestInfoScreen extends React.Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            currentTest: this.props.navigation.getParam('currentTest','chet')
            
        }
        
    }
    
    
    //adds title and styling to header
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
    
    //navigates to run test screen, sends current test info
    runTestNavigation = () =>{
        
        this.props.navigation.navigate('run_test_screen', {currentTest:this.state.currentTest})
        
    }

    
	render() 
	{
		return (
			<View style={styles.container}>
                <View style={styles.info_view}>
                    <View style={styles.info_title_view}>
                        <Text style={styles.sub_title_text}>Test Description</Text>
                    </View>    
                    <View style={styles.divider} />
                    <View style={styles.info_description_view}>
                        <Text style={styles.paragraph_text}>{this.state.currentTest.testDescription}</Text>
                    </View>                
                    
                </View>
                <View style={styles.title_view}>
                    <Text style={styles.trials_title_text}>Trials Completed: {this.state.currentTest.trialList.length} / {this.state.currentTest.maxTrials}</Text>
                </View>
                <View style={styles.run_test_button_view}>
					<TouchableOpacity
						onPress={this.runTestNavigation}
						style={this.state.currentTest.trialList.length >= this.state.currentTest.maxTrials ? styles.max_trials_reached_button : styles.run_button }
						activeOpacity={1}
                        disabled={ this.state.currentTest.trialList.length >= this.state.currentTest.maxTrials ? true : false}
						>

					<Text style={styles.trials_title_text}>{this.state.currentTest.trialList.length >= this.state.currentTest.maxTrials ? 'Max trials reached': 'Run Test' }</Text>

					</TouchableOpacity>
                </View>
                
			</View>
		);
	}
	
	//chet
}
export default UserTestInfoScreen



const styles = StyleSheet.create({
	container:
	{
		flex:1
	},
	info_view:
	{
		flex:6,
        //backgroundColor:'gray'
	},
	title_view:
	{
		flex:1,
        backgroundColor:'#bd4440',
        justifyContent: 'center',
        alignItems: 'center'
	},
    run_test_button_view:
	{
        justifyContent: 'center',
        alignItems: 'center',
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
    sub_title_text:
    {
        color:'black',
		fontWeight: '600',
		fontSize: 16,
        
    },
    trials_title_text:
    {
        color:'white',
		fontWeight: '600',
		fontSize: 16,
        
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
    run_button: {
        height: '50%',
        width: '80%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        //marginTop: 40,
        zIndex: 100,
        backgroundColor: '#3c6989'
    },
    max_trials_reached_button: {
        height: '50%',
        width: '80%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        //marginTop: 40,
        zIndex: 100,
        backgroundColor: '#ccbf92'
    },
})