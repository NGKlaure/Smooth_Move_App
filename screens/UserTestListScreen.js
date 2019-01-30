import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import TestListRow from './TestListRow'
import { Constants } from 'expo'

class UserTestListScreen extends React.Component {
    //adds title and styling to header
	static navigationOptions = () => {
		return {
			headerTitle: <View style={styles.title_view}><Text style={styles.title_text}>User Test List</Text></View>,
            //headerStyle: {height: 35},
            headerStyle: { height: 35 },
			
			
		};
	};

	render() {
		const { screenProps } = this.props;
		return (
			<ScrollView>
				{screenProps.testList.map((testItem, index) => 
                    <TestListRow 
                        removeTest={this.props.screenProps.removeTest} 
                        key={testItem.testID} 
                        testItem={testItem}
                        userNavigation={true}/>)}
			</ScrollView>
	);
	}
    
    //#bd4440

}
export default UserTestListScreen

const styles = StyleSheet.create({
	title_view: 
	{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
        paddingBottom:10

	},
	title_text: 
	{
		fontWeight: '600',
		fontSize: 26,
		color: 'black',
		alignSelf: 'center',

	},
})