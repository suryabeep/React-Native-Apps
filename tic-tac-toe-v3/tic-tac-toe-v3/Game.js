import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  TextInput,
  Font,
  Image,
  StatusBar,
} from 'react-native';
import { Constants } from 'expo';
import { createDrawerNavigator } from 'react-navigation';

class Game extends React.Component {
  state = {
    playCount: 0,
    letterOne: 'X',
    letterTwo: 'O',
    textVals: ['', '', '', '', '', '', '', '', ''],
    pressable: [true, true, true, true, true, true, true, true, true],
    p1Name: 'PX',
    p2Name: 'PO',
    p1Wins: 0,
    p2Wins: 0,
  };

  reset = () => {
    this.setState({ textVals: ['', '', '', '', '', '', '', '', ''] });
    this.setState({
      pressable: [true, true, true, true, true, true, true, true, true],
    });
    this.setState({ playCount: 0 });
  };

  resetAll = () => {
    this.reset();
    this.setState({ p1Name: 'PX' });
    this.setState({ p2Name: 'PO' });
    this.setState({ letterOne: 'X' });
    this.setState({ letterTwo: 'O' });
    this.setState({ p1Wins: 0 });
    this.setState({ p2Wins: 0 });
  };

  pressed = id => {
    let arrayIndex = 0;
    let texts = this.state.textVals;
    let press = this.state.pressable;
    if (this.state.playCount < 9) {
      switch (id) {
        case 'A1': {
          arrayIndex = 0;
          break;
        }
        case 'A2': {
          arrayIndex = 1;
          break;
        }
        case 'A3': {
          arrayIndex = 2;
          break;
        }
        case 'B1': {
          arrayIndex = 3;
          break;
        }
        case 'B2': {
          arrayIndex = 4;
          break;
        }
        case 'B3': {
          arrayIndex = 5;
          break;
        }
        case 'C1': {
          arrayIndex = 6;
          break;
        }
        case 'C2': {
          arrayIndex = 7;
          break;
        }
        case 'C3': {
          arrayIndex = 8;
          break;
        }
        default:
          return; /* Have to return or else it will break code further down */
      }
      if (this.state.pressable[arrayIndex] == true) {
        //player one turn

        if (this.state.playCount % 2 == 0) {
          for (let i = 0; i < 9; i++) {
            if (i == arrayIndex) {
              texts.splice(arrayIndex, 1, this.state.letterOne);
              //make it not pressable anymore
              this.setState({ playCount: this.state.playCount + 1 });
            }
          }
          this.setState({ textVals: texts });
          this.setState({ pressable: press });
        }
        //player two turn
        else {
          for (let i = 0; i < 9; i++) {
            if (i == arrayIndex) {
              texts.splice(arrayIndex, 1, this.state.letterTwo);
              //make it not pressable anymore
              press.splice(arrayIndex, 1, false);
              this.setState({ playCount: this.state.playCount + 1 });
            }
          }
          this.setState({ textVals: texts });
          this.setState({ pressable: press });
        }
      }
      //check if anyone won
      this.checkDone();
    }
  };

  checkDone = () => {
    //check if rows are the same
    for (let i = 0; i < 3; i++) {
      if (
        this.state.textVals[3 * i] == this.state.textVals[3 * i + 1] &&
        this.state.textVals[3 * i + 1] == this.state.textVals[3 * i + 2] &&
        this.state.textVals[3 * i] != ''
      ) {
        if (this.state.playCount % 2 == 0) {
          Alert.alert(this.state.p1Name + ' wins!');
          this.setState({ playCount: 9 });
          this.setState({ p1Wins: this.state.p1Wins + 1 });
        } else {
          Alert.alert(this.state.p2Name + ' wins!');
          this.setState({ playCount: 9 });
          this.setState({ p2Wins: this.state.p2Wins + 1 });
        }
      }
    }
    //check if cols are the same
    for (let i = 0; i < 3; i++) {
      if (
        this.state.textVals[i] == this.state.textVals[i + 3] &&
        this.state.textVals[i + 3] == this.state.textVals[i + 6] &&
        this.state.textVals[i] != ''
      ) {
        if (this.state.playCount % 2 == 0) {
          Alert.alert(this.state.p1Name + ' wins!');
          this.setState({ playCount: 9 });
          this.setState({ p1Wins: this.state.p1Wins + 1 });
        } else {
          Alert.alert(this.state.p2Name + ' wins!');
          this.setState({ playCount: 9 });
          this.setState({ p2Wins: this.state.p2Wins + 1 });
        }
      }
    }
    //check if diagonals are the same
    if (
      this.state.textVals[0] == this.state.textVals[4] &&
      this.state.textVals[4] == this.state.textVals[8] &&
      this.state.textVals[4] != ''
    ) {
      if (this.state.playCount % 2 == 0) {
        Alert.alert(this.state.p1Name + ' wins!');
        this.setState({ playCount: 9 });
        this.setState({ p1Wins: this.state.p1Wins + 1 });
      } else {
        Alert.alert(this.state.p2Name + ' wins!');
        this.setState({ playCount: 9 });
        this.setState({ p2Wins: this.state.p2Wins + 1 });
      }
    }
    if (
      this.state.textVals[2] == this.state.textVals[4] &&
      this.state.textVals[4] == this.state.textVals[6] &&
      this.state.textVals[4] != ''
    ) {
      if (this.state.playCount % 2 == 0) {
        Alert.alert(this.state.p1Name + ' wins!');
        this.setState({ playCount: 9 });
        this.setState({ p1Wins: this.state.p1Wins + 1 });
      } else {
        Alert.alert(this.state.p2Name + ' wins!');
        this.setState({ playCount: 9 });
        this.setState({ p2Wins: this.state.p2Wins + 1 });
      }
    }
  };

  changeLetterOne = letter1 => {
    if (this.state.playCount > 0) {
      Alert.alert('You can only change your symbol at the start of a game.');
      return;
    }
    this.setState({ letterOne: letter1 });
  };
  changeLetterTwo = letter2 => {
    if (this.state.playCount > 0) {
      Alert.alert('You can only change your symbol at the start of a game.');
      return;
    }
    this.setState({ letterTwo: letter2 });
  };
  changeP1Name = p1NameIn => {
    this.setState({ p1Name: p1NameIn });
  };
  changeP2Name = p2NameIn => {
    this.setState({ p2Name: p2NameIn });
  };

  render() {
    return (
      <View style={styles.container}>
      <StatusBar hidden = {true}/>
          <View
            style={
              this.state.playCount % 2 == 0
                ? styles.topBoxSelected
                : styles.topPlayerBox
            }>
            <TextInput
              style={
                this.state.playCount % 2 == 0
                  ? styles.textSelected
                  : styles.textWhite
              }
              selectTextOnFocus="true"
              placeholder={this.state.p1Name}
              placeholderTextColor={
                this.state.playCount % 2 == 0 ? 'black' : 'rgb(66, 244, 235)'
              }
              color={
                this.state.playCount % 2 == 0 ? 'black' : 'rgb(66, 244, 235)'
              }
              defaultValue={this.state.p1Name}
              onChangeText={this.changeP1Name}
            />
            <TextInput
              style={
                this.state.playCount % 2 == 0
                  ? styles.textSelected
                  : styles.textWhite
              }
              selectTextOnFocus="true"
              maxLength={1}
              placeholder={this.state.p1Text}
              placeholderTextColor={
                this.state.playCount % 2 == 0 ? 'black' : 'rgb(66, 244, 235)'
              }
              color={
                this.state.playCount % 2 == 0 ? 'black' : 'rgb(66, 244, 235)'
              }
              defaultValue={this.state.letterOne}
              onChangeText={this.changeLetterOne}
            />
            <Text
              style={
                this.state.playCount % 2 == 0
                  ? styles.textSelected
                  : [styles.textWhite, { color: 'rgb(66, 244, 235)' }]
              }>
              Wins: {this.state.p1Wins}
            </Text>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.col}
              onPress={() => this.pressed('A1')}>
              <Text
                style={
                  this.state.textVals[0] == this.state.letterOne
                    ? styles.p1Text
                    : this.state.textVals[0] == this.state.letterTwo
                      ? styles.p2Text
                      : styles.text
                }>
                {this.state.textVals[0]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.col}
              onPress={() => this.pressed('A2')}>
              <Text
                style={
                  this.state.textVals[1] == this.state.letterOne
                    ? styles.p1Text
                    : this.state.textVals[1] == this.state.letterTwo
                      ? styles.p2Text
                      : styles.text
                }>
                {this.state.textVals[1]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.col}
              onPress={() => this.pressed('A3')}>
              <Text
                style={
                  this.state.textVals[2] == this.state.letterOne
                    ? styles.p1Text
                    : this.state.textVals[2] == this.state.letterTwo
                      ? styles.p2Text
                      : styles.text
                }>
                {this.state.textVals[2]}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.col}
              onPress={() => this.pressed('B1')}>
              <Text
                style={
                  this.state.textVals[3] == this.state.letterOne
                    ? styles.p1Text
                    : this.state.textVals[3] == this.state.letterTwo
                      ? styles.p2Text
                      : styles.text
                }>
                {this.state.textVals[3]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.col}
              onPress={() => this.pressed('B2')}>
              <Text
                style={
                  this.state.textVals[4] == this.state.letterOne
                    ? styles.p1Text
                    : this.state.textVals[4] == this.state.letterTwo
                      ? styles.p2Text
                      : styles.text
                }>
                {this.state.textVals[4]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.col}
              onPress={() => this.pressed('B3')}>
              <Text
                style={
                  this.state.textVals[5] == this.state.letterOne
                    ? styles.p1Text
                    : this.state.textVals[5] == this.state.letterTwo
                      ? styles.p2Text
                      : styles.text
                }>
                {' '}
                {this.state.textVals[5]}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.col}
              onPress={() => this.pressed('C1')}>
              <Text
                style={
                  this.state.textVals[6] == this.state.letterOne
                    ? styles.p1Text
                    : this.state.textVals[6] == this.state.letterTwo
                      ? styles.p2Text
                      : styles.text
                }>
                {this.state.textVals[6]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.col}
              onPress={() => this.pressed('C2')}>
              <Text
                style={
                  this.state.textVals[7] == this.state.letterOne
                    ? styles.p1Text
                    : this.state.textVals[7] == this.state.letterTwo
                      ? styles.p2Text
                      : styles.text
                }>
                {' '}
                {this.state.textVals[7]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.col}
              onPress={() => this.pressed('C3')}>
              <Text
                style={
                  this.state.textVals[8] == this.state.letterOne
                    ? styles.p1Text
                    : this.state.textVals[8] == this.state.letterTwo
                      ? styles.p2Text
                      : styles.text
                }>
                {' '}
                {this.state.textVals[8]}
              </Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView style={styles.row} behavior="padding">
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <TouchableOpacity
                style={[styles.col, { padding: 2 }]}
                onPress={this.resetAll}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: 'AvenirNext-Regular',
                  }}>
                  {' '}
                  Reset All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.col, { padding: 2, flex: 1 }]}
                onPress={this.reset}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: 'AvenirNext-Regular',
                  }}>
                  {' '}
                  Reset Board
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={
                this.state.playCount % 2 == 1
                  ? styles.bottomBoxSelected
                  : styles.bottomPlayerBox
              }>
              <TextInput
                style={
                  this.state.playCount % 2 == 1
                    ? styles.textSelected
                    : styles.textWhite
                }
                selectTextOnFocus="true"
                placeholder={this.state.p2Name}
                placeholderTextColor={
                  this.state.playCount % 2 == 1 ? 'white' : 'rgb(249,0,129)'
                }
                color={
                  this.state.playCount % 2 == 1 ? 'white' : 'rgb(249,0,129)'
                }
                defaultValue={this.state.p2Name}
                onChangeText={this.changeP2Name}
              />
              <TextInput
                style={
                  this.state.playCount % 2 == 1
                    ? styles.textSelected
                    : styles.textWhite
                }
                selectTextOnFocus="true"
                placeholder={this.state.letterTwo}
                maxLength={1}
                placeholderTextColor={
                  this.state.playCount % 2 == 1 ? 'white' : 'rgb(249,0,129)'
                }
                color={
                  this.state.playCount % 2 == 1 ? 'white' : 'rgb(249,0,129)'
                }
                defaultValue={this.state.letterTwo}
                onChangeText={this.changeLetterTwo}
              />
              <Text
                style={
                  this.state.playCount % 2 == 1
                    ? styles.textWhite
                    : styles.textPink
                }>
                Wins: {this.state.p2Wins}
              </Text>
            </View>
          </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(45, 43, 44)',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    borderColor: 'rgb(226, 226, 226)',
    borderWidth: '2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontFamily: 'AvenirNext-UltraLight',
  },
  p1Text: {
    fontSize: 95,
    fontFamily: 'AvenirNext-UltraLight',
    color: 'rgb(66, 244, 235)',
  },
  p2Text: {
    fontSize: 95,
    fontFamily: 'AvenirNext-UltraLight',
    color: 'rgb(249, 0, 129)',
  },
  topPlayerBox: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 2,
    alignItems: 'center',
    flexDirection: 'row',
    transform: [{ rotate: '180deg' }],
  },
  bottomPlayerBox: {
    flex: 5,
    justifyContent: 'space-around',
    padding: 2,
    alignItems: 'center',
    flexDirection: 'row',
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
  textSelected: { fontSize: 40, fontFamily: 'AvenirNext-Regular' },
  textWhite: { fontSize: 40, color: 'white', fontFamily: 'AvenirNext-Regular' },
  textPink: {
    fontSize: 40,
    color: 'rgb(249, 0, 129)',
    fontFamily: 'AvenirNext-Regular',
  },
});

export default Game;
