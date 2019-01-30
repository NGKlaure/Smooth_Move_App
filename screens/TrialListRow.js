import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Swipeout from 'react-native-swipeout';


class TrialListRow extends React.Component {
    
    
    render() {
        const {currentTrial} = this.props;

        return this.renderRow(currentTrial)

    }
    //creates a row displaying trial date and index, with delete swipeout functionality
    renderRow = (currentTrial) =>
    {
        
        let swipeBtns = [
        {
            text: 'delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => {this.props.removeTrial(this.props.testID, currentTrial.trialID)}
        }];
        return (
        <Swipeout right={swipeBtns}
        autoClose={true}
        backgroundColor= 'transparent'>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('trial_info_screen',{currentTrial: currentTrial})}>
                <View style={row_styles.row}>
                    <View style={row_styles.trial_data_view}>
                        <Text style={row_styles.trialID}>{currentTrial.trialID}</Text>
                        <Text style={row_styles.trialDate}>{currentTrial.trialDate}</Text>
                    </View>

                </View>
            </TouchableOpacity>

            <View style={row_styles.divider} />
        </Swipeout>      
        )
        
    }    
    
    
    
};
export default withNavigation(TrialListRow);

const row_styles = StyleSheet.create({
trial_data_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3
  },
  row: {
    padding: 15,
    justifyContent: 'space-evenly',
	backgroundColor: 'white'
  },
  trialDate: {
    fontSize: 18,
    fontWeight: '500',
    color:'black'
  },

  trialID: {
    color:'black'
  },
    divider: {
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1,
    },
    
});