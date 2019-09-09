import * as React from 'react';
import DismissKeyboard from 'dismissKeyboard';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  state = {
    a: 5,
    b: 5,
    c: 5,
    stringA: 'ooooo',
    stringB: 'ooooo',
    stringC: 'ooooo',
    player1: 'player 1',
    player2: 'player 2',
    storedInput: '',
    currentPlayer: 1 /* 1 for p1, -1 for p2*/,
  };

  storeInput = inputText => {
    if (inputText != undefined) this.setState({ storedInput: inputText });
    else {
      Alert.alert('empty argument!');
    }
  };

  heapDisplay = (letter) => {
    let out = '';
    let heap = null;
    if (letter == 'a') {
      heap = this.state.a;
    } else if (letter == 'b') {
      heap = this.state.b;
    } else {
      heap = this.state.c;
    }
    for (let i = 0; i < heap; i++) {
      out += 'o';
    }
    if (letter == 'a') {
      this.setState({ stringA: out });
    } else if (letter == 'b') {
      this.setState({ stringB: out });
    } else {
      this.setState({ stringC: out });
    }
  };

  turn = () => {
    if (
      (this.state.a != 0 || this.state.b != 0 || this.state.c != 0) &&
      this.state.storedInput != ''
    ) {
      let input = this.state.storedInput.split(',');
      let num = input[1].trim();
      let heap = input[0].trim();
      if (heap == 'a' || heap == 'A') {
        if (num <= this.state.a && num <= 3) {
          this.setState({ a: this.state.a - num }, () => {
            this.setState({ currentPlayer: -1 * this.state.currentPlayer });
            this.checkWin();
            this.heapDisplay("a");
          });
        } else {
          Alert.alert('You dum num');
        }
      } else if (heap == 'b' || heap == 'B') {
        if (num <= this.state.b && num <= 3) {
          this.setState({ b: this.state.b - num }, () => {
            this.setState({ currentPlayer: -1 * this.state.currentPlayer });
            this.checkWin();
            this.heapDisplay("b");
          });
        } else {
          Alert.alert('You dum num');
        }
      } else if (heap == 'c' || heap == 'C') {
        if (num <= this.state.c && num <= 3) {
          this.setState({ c: this.state.c - num }, () => {
            this.setState({ currentPlayer: -1 * this.state.currentPlayer });
            this.checkWin();
            this.heapDisplay("c");
          });
        } else {
          Alert.alert('You dum num');
        }
      } else {
        Alert.alert('You dum heap');
      }
      this.setState({ storedInput: '' });
    } else if (this.state.storedInput == '') {
      Alert.alert('No input given!');
    } else {
      Alert.alert('Game Over');
      this.reset();
    }
  };

  checkWin = () => {
    if (this.state.a == 0 && this.state.b == 0 && this.state.c == 0) {
      //Alert.alert("Got to 71")
      if (this.state.currentPlayer > 0) {
        Alert.alert('Blue won!');
        this.reset();
      } else if (this.state.currentPlayer < 0) {
        Alert.alert('Red Won!');
        this.reset();
      } else {
        return;
      }
    }
  };

  reset = () => {
    this.setState({
      a: 5,
      b: 5,
      c: 5,
      player1: 'player 1',
      player2: 'player 2',
      storedInput: '',
      currentPlayer: 1 /* 1 for p1, -1 for p2*/,
    });
  };

  render() {
    return (
      <View style={styles.main}>
        <View
          style={
            this.state.currentPlayer > 0
              ? [styles.topContainer, {flex: 2}]
              : [styles.topContainer, { backgroundColor: 'rgb(249, 0, 79)', flex: 2 }]
          }>
          <KeyboardAvoidingView style={styles.row} behavior="padding">
            <TextInput
              style={{
                color: 'white',
                fontSize: 30,
                width: Constants.width,
                alignItems: 'center',
              }}
              placeholder="which heap, how many"
              placeholderTextColor="white"
              onChangeText={this.storeInput}
              editable = {this.state.currentPlayer>0? false: true}
              onSubmitEditing={this.turn}
              clearTextOnFocus="true"
              defaultValue={this.state.currentPlayer > 0? "Not your turn :(" : this.state.storedInput}
            />
          </KeyboardAvoidingView>
        </View>
        <View style={[styles.row, { flexDirection: 'row'}]}>
            <View style={[styles.box, {height: 140}]}>
              <Text style={styles.heapText}> A: {this.state.stringA} </Text>
            </View>
            <View style={[styles.box, {height: 140}]}>
              <Text style={styles.heapText}> B: {this.state.stringB} </Text>
            </View>
            <View style={[styles.box, {height: 140}]}>
              <Text style={styles.heapText}> C: {this.state.stringC} </Text>
            </View>
          </View>
        <KeyboardAvoidingView
          style={
            this.state.currentPlayer > 0
              ? [
                  styles.bottomContainer,
                  { backgroundColor: 'rgb(4, 229, 210)', flex: 2 },
                ]
              : [styles.bottomContainer, {flex: 2}]
          }
          behavior="padding">
          <View style={styles.row}>
            <TextInput
              style={{
                color: 'white',
                fontSize: 30,
                width: Constants.width,
                alignItems: 'center',
              }}
              placeholder="which heap, how many"
              placeholderTextColor="white"
              editable = {this.state.currentPlayer>0? true: false}
              onChangeText={this.storeInput}
              onSubmitEditing={this.turn}
              clearTextOnFocus="true"
              defaultValue={this.state.currentPlayer>0? this.state.storedInput : "Not your turn :("}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'rgb(51,51,51)',
  },
  row: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '180deg' }],
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    flex: 1,
    borderColor: 'white',
    borderRadius: 4,
    borderWidth: 1.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heapText: {
    color: 'white',
    fontSize: 40,
  },
});
