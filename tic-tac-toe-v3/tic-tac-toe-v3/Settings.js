import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Font,
  Image,
  StatusBar,
} from 'react-native';
import { Constants } from 'expo';
import {connect} from "react-redux"

class Settings extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View
          style={[
            styles.topBoxSelected,
            {
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              backgroundColor: "rgb(45, 43, 44)"
            },
          ]}>
          <TextInput
            style={styles.textWhite}
            selectTextOnFocus="true"
            placeholder={'Change P1 Name'}
            placeholderTextColor={'rgb(66, 244, 235)'}
            color={'rgb(66, 244, 235)'}
            onChangeText={this.changeP1Name}
          />
          <TextInput
            style={[styles.textWhite, { fontSize: 30 }]}
            selectTextOnFocus="true"
            placeholder={"Change P1's character"}
            maxLength={1}
            placeholderTextColor={'rgb(66, 244, 235)'}
            color={'rgb(66, 244, 235)'}
            onChangeText={this.changeLetterOne}
          />
        </View>
        <KeyboardAvoidingView
          style={[
            styles.bottomBoxSelected,
            {
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              backgroundColor: "rgb(45, 43, 44)"
            },
          ]}
          behavior="padding">
          <TextInput
            style={styles.textWhite}
            selectTextOnFocus="true"
            placeholder={'Change P2 Name'}
            placeholderTextColor={'rgb(249, 0, 129)'}
            color={'rgb(249, 0, 129)'}
            onChangeText={this.changeP2Name}
          />
          <TextInput
            style={[styles.textWhite, {fontSize: 30}]}
            selectTextOnFocus="true"
            placeholder={"Change P2's character"}
            maxLength={1}
            placeholderTextColor={'rgb(249, 0, 129)'}
            color={'rgb(249, 0, 129)'}
            onChangeText={this.changeLetterTwo}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return{
    counter: state.counter,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(45, 43, 44)',
  },
  topBoxSelected: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 2,
    alignItems: 'center',
    flexDirection: 'row',
    transform: [{ rotate: '180deg' }],
    backgroundColor: 'rgb(66, 244, 235)',
  },
  bottomBoxSelected: {
    flex: 5,
    justifyContent: 'space-around',
    padding: 2,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgb(249, 0, 129)',
  },
  textWhite: { fontSize: 40, color: 'white', fontFamily: 'AvenirNext-Regular' },
});

export default connect(mapStateToProps)(Settings);