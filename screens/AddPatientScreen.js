import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, Picker, TouchableOpacity, Dimensions, KeyboardAvoidingView} from "react-native";


const PADDING = 20
const MARGIN = 60
const DEVICE_WIDTH = Dimensions.get('window').width

class AddPatientScreen extends React.Component {
	
	constructor(props)
	{
		super(props)
		this.state = {
			patientID: 0,
			patientName:"nadine",
			patientPone:"123654890"
            
		}
	}
	
  //calls parent Screenprops method to add a test to master list
	addPatient = () => {
        if (this.props.screenProps.addPatientToList(this.state))
        {
            console.log('patientadded: ',this.props.screenProps.patientList)
            this.props.navigation.navigate('patient_list_tab')
            this.setState({patientID:0})
        }	
	}	
	
  render() {
    return (
	
	<View style={styles.container}>
				<View style = {{marginBottom: 40, alignItems:'center'}}>
					<Text style = {styles.title_text}>Add Patient</Text>
				</View>
				
				<View style = {{width: '100%', alignItems:'center'}}>

					 <TextInput
						  style={styles.input}
						  onChangeText={(patientName) => this.setState({ patientName })}
						  value={this.state.patientName}
						  placeholder='Patient Name'
						  //onSubmitEditing={() => this.durationRef.focus()}
						  returnKeyType='done'
						/>
						
						 <TextInput
						  style={styles.input}
						  onChangeText={(patientPhone) => this.setState({ patientPhone })}
						  value={this.state.patientPhone}
						  placeholder='Patient Phone'
						  //onSubmitEditing={() => this.durationRef.focus()}
						  returnKeyType='done'
						/>
						
						<TouchableOpacity
						onPress={this.addPatient}
						style={styles.add_test_button}
						activeOpacity={1}
						>

					<Text style={styles.button_text}>Add Patient</Text>

					</TouchableOpacity>
				</View>
			</View>
    );
  }
}

export default AddPatientScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: PADDING,
  },

  title_text: {
    fontWeight: '600',
    fontSize: 26,
  },
  add_test_button: {
    height: MARGIN,
    width: '100%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    zIndex: 100,
    backgroundColor: '#3c6989'
  },
  button_text: {
    fontWeight: '600',
    color: 'white'
  },

  studentsWorkingImage: {
    width: 100,
    height: 100,
  },

  input: {
    padding: 10,
    height: 50,
    width: '100%',
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    textAlign: 'left',
    fontWeight: '600',
  },

  description_input: {
    padding: 10,
    height: 120,
    width: '100%',
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    textAlign: 'left',
    fontWeight: '600',
	textAlignVertical: 'top'
  },
  
})