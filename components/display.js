import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Constants, Accelerometer } from 'expo';
import util from 'util';


import * as actions from "../redux/actions.js";
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return ({
    saveAcc: (payload) => {
      return dispatch(actions.saveAcc(payload));
    },
  });
}
const mapStateToProps = (store) => {
  return ({
    lastAccel: store.dataStore.lastAccel,
  });
}

class Display extends React.Component {
	state = {
    currentData:[],
  };

	
  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  }

  _slow = () => {
    Accelerometer.setUpdateInterval(1000); 
  }

  _fast = () => {
    Accelerometer.setUpdateInterval(16);
  }

  _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      this._sendData(accelerometerData);
    });
  }

  _sendData = (data) => {
      this.props.saveAcc(data);
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {
    let { time } = this.props.lastAccel;
    let { x , y , z } = this.props.lastAccel.accelerometerData;

    return (
	
	
      <View style={[styles.sensor]}>
        <Text style={[styles.all, styles.textHeader]}>Accelerometer Data:</Text>
        <Text style={styles.all} >x: {round(x)}</Text>
        <Text style={styles.all} >y: {round(y)}</Text>
        <Text style={styles.all} >z: {round(z)}</Text>
        <Text style={styles.all} >time: {time}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._toggle} style={styles.button}>
            <Text style={styles.all}>Toggle</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._slow} style={styles.button}>
            <Text style={styles.all}>Slow</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._fast} style={styles.button}>
            <Text style={styles.all}>Fast</Text>
          </TouchableOpacity>
        </View>
      </View>
	  
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  all: {
    color: '#333333',
    fontFamily: 'sans-serif',
  },
  textHeader: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
});



export default connect(mapStateToProps, mapDispatchToProps)(Display);