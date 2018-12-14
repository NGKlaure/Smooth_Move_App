import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
class TestListRow extends React.Component {
  render() {
    const {testItem} = this.props;
    return this.renderRow(testItem)

  }
  
  
    renderRow = (testItem) =>
    {
        let swipeBtns = [
        {
            text: 'delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => { this.props.removeTest(testItem.testID) }//this.deleteNote(rowData) }
        }];

        return (
            <Swipeout right={swipeBtns}
            autoClose={true}
            backgroundColor= 'transparent'>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('test_info_screen',
                        {
                            currentTest: testItem
                            //testID: testItem.testID,
                            //testName: testItem.testName,
                        }
                      )}>
                      
                      <View style={styles.row}>
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

  row: {
    padding: 15,
    justifyContent: 'space-evenly',
	backgroundColor: '#5b9095'
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