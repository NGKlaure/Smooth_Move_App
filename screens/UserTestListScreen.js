import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import TestListRow from './TestListRow'



class UserTestListScreen extends React.Component {
	static navigationOptions = () => {
		return {
			headerTitle: <View style={styles.title_view}><Text style={styles.title_text}>Test List</Text></View>,
			
			
		};
	};
	
	state = {
    showTests: true,
  }
	
 /*handleSelectTest = test => {
    this.props.navigation.push('TestDetails', test)
  }*/	
	
	render() {
		const { screenProps } = this.props;
		return (
			<ScrollView>
				{screenProps.testList.map((testItem, index) => <TestListRow key={index + 1} testItem={testItem} testIndex={index + 1} />)}
				 
			</ScrollView>
	);
	}
}
export default UserTestListScreen


const styles = StyleSheet.create({
	title_view: 
	{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title_text: 
	{
		fontWeight: '600',
		fontSize: 26,
		color: 'black',
		alignSelf: 'center'
	},
})