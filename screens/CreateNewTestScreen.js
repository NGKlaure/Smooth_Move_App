import React from "react";
import { View, Text, Button, StyleSheet, TextInput, Picker, TouchableOpacity, Dimensions, KeyboardAvoidingView} from "react-native";

const PADDING = 20
const MARGIN = 60
const DEVICE_WIDTH = Dimensions.get('window').width

class CreateNewTestScreen extends React.Component {
	constructor(props)
	{
		super(props)
		this.state = {
			testID: 0,
			testName:"",
			testDuration:"",
			testTrials:"",
			testDescription:"",
            trialList: [],
            maxTrials:10
		}
	}

    
    //calls parent Screenprops method to add a test to master list
	addTest = () => {
        if (this.props.screenProps.addTestToList(this.state))
        {
            console.log('test added: ',this.props.screenProps.testList)
            this.props.navigation.navigate('Test List')
            this.setState({testID:0})
        }	
	}
	
	render() 
	{

		return (
			<View style={styles.container}>
				<View style = {{marginBottom: 40, alignItems:'center'}}>
					<Text style = {styles.title_text}>Add Test</Text>
				</View>
				<View style = {{width: '100%', alignItems:'center'}}>

					 <TextInput
						  style={styles.input}
						  onChangeText={(testName) => this.setState({ testName })}
						  value={this.state.testName}
						  placeholder='Test Name'
						  //onSubmitEditing={() => this.durationRef.focus()}
						  returnKeyType='done'
						/>

					<TextInput
						  ref={durationRef => this.durationRef = durationRef}
						  style={styles.input}
						  onChangeText={(testDuration) => this.setState({ testDuration })}
						  value={this.state.testDuration}
						  placeholder='Duration'
						  //onSubmitEditing={() => this.trialsRef.focus()}
						  returnKeyType='done'
						/>
						
					<TextInput
						  ref={trialsRef => this.trialsRef = trialsRef}
						  style={styles.input}
						  onChangeText={(testTrials) => this.setState({ testTrials })}
						  value={this.state.testTrials}
						  placeholder='Trials Required'
						  //onSubmitEditing={() => this.descriptionRef.focus()}
						  returnKeyType='done'
						/>
						
					<TextInput
						  ref={descriptionRef => this.descriptionRef = descriptionRef}
						  style={styles.description_input}
						  onChangeText={(testDescription) => this.setState({ testDescription })}
						  value={this.state.testDescription}
						  placeholder='Description'
						  returnKeyType='done'
						  multiline = {true}

						/>
								
								
					<TouchableOpacity
						onPress={this.addTest}
						style={styles.add_test_button}
						activeOpacity={1}
						>

					<Text style={styles.button_text}>Add Test</Text>

					</TouchableOpacity>
				</View>
			</View>

		);
	}
}
export default CreateNewTestScreen
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
    height: 60,
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
/*

  button_text: {
    fontWeight: '600',
    color: 'white'
  },

  loading: {
    width: 45,
    height: 45,
  },

  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#38d39f',
  },

  newUser: {
    zIndex: -100,
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },

  signup: {
    marginLeft: 5,
    fontWeight: '800',
    color: '#38d39f',
  },
});
*/
