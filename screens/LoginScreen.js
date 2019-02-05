
import React from "react";
import { Button, View, StyleSheet, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from "react-native";
//import login from './api'


export default class LoginScreen extends React.Component {
	constructor(props)
	{
		super(props)
		this.state = {
			username:'',
			password:'',
			errorMsg: ''
		}
		
	}
	
	//calls local host server to validate credentials
    //only works on home network, not school network
	login = async () => {
        let local_network = false
        if (local_network)
        {
            //let url = 'http://localhost:6666'
            console.log('...sending post request.')
            const settings = {
                    method: 'POST',
                    //method: 'GET',
                    headers: 
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state)
            };
            try 
            {                
                const response = await fetch('http://192.168.0.19:6666/login', settings)
                let status_code = response["status"]
                status_code = 200
                if (status_code == 200)
                {
                    this.props.navigation.navigate("Main");
                    return true;
                }
                else 
                {
                    this.setState({errorMsg:response.statusText})
                    console.log('error message: ' + this.state.errorMsg)
                    return false
                }

            }
            catch(err)
            {
                console.log(err)
            }
		
        }
        else
        {
            this.props.navigation.navigate("Main");
        }
	}
	
	render() 
	{
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>

				<View style={styles.title_view}>
						<Image source={require('.././images/book_logo.png')}/>
						<Text style={styles.title_text}>Classroom Manager</Text>
				</View>
				<View style={styles.input_view}>
					<View styles={styles.input_view}>
						<Text style={styles.errorMsgText}>{this.state.errorMsg}</Text>
					</View>
					<TextInput 
						style={styles.input_box}
						placeholder='username'
						onChangeText={(text)=>this.setState({username:text})}
						onSubmitEditing={() => this.passwordRef.focus()}
						returnKeyType='next'/>
						
					
					
					<TextInput 
						ref={passwordRef => this.passwordRef = passwordRef}
						style={styles.input_box}
						placeholder='password'
						secureTextEntry={true}
						onChangeText={(text)=>this.setState({password:text})}
						returnKeyType='done'/>
					
					
					<TouchableOpacity style={styles.login_button} onPress={this.login}>
						<Text style={styles.sub_title_text}>Login</Text>
					</TouchableOpacity>

				</View>
			</KeyboardAvoidingView>
		);
	}
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000000'
	},
	title_view: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 2,
	},
	input_view: {
		//justifyContent: "center",
		alignItems: 'center',
		flex: 2
	},

	title_text: {
		//fontWeight: "bold",
		fontSize: 36,
		color: '#edefea',
	},
	sub_title_text: {
		justifyContent: "center",
		fontSize: 24,
		color: '#edefea',
	},
	input_box: {
		justifyContent: "center",
		backgroundColor: '#edefea',
		borderColor: '#edefea',
		borderWidth: 1,
		width: '80%',
		margin:10,
		padding: 6,
		textAlign: 'center',
		borderRadius: 10,
		shadowRadius: 40,
		shadowOffset: {width: 4, height: 40},
		shadowColor: 'black'
	},
	login_button: {
		justifyContent: "center",
		alignItems: 'center',
		backgroundColor: '#80abd1',
		padding: 20,
		margin: 5,
		width: '80%',
		borderWidth: 1,
		borderColor: '#edefea',
		borderRadius: 40
	},
	errorMsgView:{
		flex:2,
		alignItems: 'center',
		justifyContent:'center'
	},
	errorMsgText: {
		//fontWeight: "bold",
		fontSize: 12,
		color:'red',
		
	},

});
