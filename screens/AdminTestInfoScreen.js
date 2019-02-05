import React from "react";
import { View, Text, Button } from "react-native";
import {Alert, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Swipeout from 'react-native-swipeout';
import TrialListRow from './TrialListRow'

class AdminTestInfoScreen extends React.Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            currentTest: this.props.navigation.getParam('currentTest','chet')
            
        }
        
    }
    
    
    //adds title header and styling
    static navigationOptions = ({navigation}) => (
    {
        //title: navigation.state.params.testName,//`${navigation.state.params.title}`
        headerStyle:
        {
            backgroundColor:'#5b9095',
            paddingBottom: 20,
        },
        headerTitle: (<View style={styles.header_view}>
                        <Text style={styles.header_text}>
                            {navigation.state.params.currentTest.testName}
                        </Text>
                     </View>),
        //headerTitleStyle: {ma 40}

        
    })
    

    

    
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
                    <Text style={styles.trials_title_text}>Trials:</Text>
                </View>
                <View style={styles.list_view}>
                    <ScrollView>
                    {
                        this.state.currentTest.trialList.map((T,index) => 
                        <TrialListRow 
                            key={T.trialID} 
                            currentTrial={T}
                            testID={this.state.currentTest.testID}
                            removeTrial={this.props.screenProps.removeTrial}/>)
                        
                    }
                    </ScrollView>
                </View>
                
			</View>
		);
	}
	
	//chet
}
export default AdminTestInfoScreen



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
    }
})