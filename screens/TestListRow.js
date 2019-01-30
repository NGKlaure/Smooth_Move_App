import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
class TestListRow extends React.Component {
  render() {
    const {testItem} = this.props;
    return this.renderRow(testItem)

  }
  
    //creates test row with delete swipeout functionality
    renderRow = (testItem) =>
    {
        
        let swipeBtns = [
        {
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => { this.props.removeTest(testItem.testID) }//this.deleteNote(rowData) }
        }];

        navigateToInfo = () => {
            if (this.props.userNavigation)
            {
                this.props.navigation.navigate('user_test_info_screen',{ currentTest: testItem})
            }
            else
                this.props.navigation.navigate('admin_test_info_screen',{ currentTest: testItem})
        }
        
        
        return (
            <Swipeout right={swipeBtns}
            autoClose={true}
            backgroundColor= 'transparent'>
                    <TouchableOpacity
                      onPress={() => {
                            if (this.props.userNavigation)
                            {
                                this.props.navigation.navigate('user_test_info_screen',{ currentTest: testItem})
                            }
                            else
                                this.props.navigation.navigate('admin_test_info_screen',{ currentTest: testItem})
                        }}>
                      
                      <View style={this.props.userNavigation ? styles.userRow : styles.adminRow}>
                        <View style={styles.nameAndNumber}>
                          <Text style={styles.testID}>{testItem.testID}</Text>
                          <Text style={styles.testName}>{testItem.testName}</Text>
                        </View>

                      </View>
                    </TouchableOpacity>

                    <View style={styles.divider} />
            
            

            </Swipeout>
        )
    }
}

const styles = StyleSheet.create({

  adminRow: {
    padding: 15,
    justifyContent: 'space-evenly',
	backgroundColor: '#5b9095'
  },
  userRow: {
    padding: 15,
    justifyContent: 'space-evenly',
	backgroundColor: '#bd4440'
  },

  nameAndNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3
  },

  testName: {
    fontSize: 18,
    fontWeight: '500',
    color:'white'
  },

  testID: {
    color:'white'
  },

  section: {
    color: '#9c9c9c',
    marginBottom: 3,
  },

  numberOfStudents: {
    color: '#38d39f',
    fontWeight: '600',
  },

  divider: {
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },


});

export default withNavigation(TestListRow);