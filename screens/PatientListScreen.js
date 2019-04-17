import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import PatientListRow from './PatientListRow'
import { Constants } from 'expo'

class PatientListScreen extends React.Component {
	
	 static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Patient List',
    headerRight: (
      <Button
        title='Add'
        color='#a41034'
        onPress={() => {
          navigation.navigate('AddPatient');
        }}
      />),
  })
/*	
	 //adds title and styling to header
	static navigationOptions = () => {
		return {
			headerTitle: <View style={styles.title_view}><Text style={styles.title_text}>Patient List</Text></View>,
            //headerStyle: {height: 35},
            headerStyle: { height: 35 },
			
			
		};
	};
	*/
 render() {
		const { screenProps } = this.props;
		return (
			<ScrollView>
				{screenProps.patientList.map((patientItem, index) => 
                <PatientListRow 
                removePatient={this.props.screenProps.removePatient} 
                key={patientItem.patientID} 
                patientItem={patientItem}
                userNavigation={false}/>)}
			</ScrollView>
	);
	}
    
    

}

export default PatientListScreen

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