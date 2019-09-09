import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { Constants } from 'expo';

export default class NewQuestion extends React.Component {
  state = {
    question: '',
    options: [],
    answer: '',
    currentInput: '',
    completed:[false, false, false, false, false, false,]
  };

  static navigationOptions = {
    title: 'New Question',
    headerStyle: {
      backgroundColor: 'rgb(42,42,42)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitleStyle: { fontSize: 20, color: 'white' },
  };

  textInputChange = userTyping => {
    this.setState({ currentInput: userTyping });
  };

  reset = () => {
    this.setState({
      question: '',
      options: [],
      answer: '',
      currentInput: '',
    });
  };

  addOption = input => {
    let options = this.state.options;
    let completed = this.state.completed;
    options[input] = this.state.currentInput;
    switch (input){
      case 0: 
        completed[1] = true; 
        break;
      case 1: 
        completed[2]= true;
        break;
      case 2: 
        completed[3] = true;
        break;
      case 3: 
        completed[4] = true;
        break;
    }
    this.setState({ options, completed });
  };

  submitQuestion = () => {
    let toSend = {
      question: '',
      options: [],
      answer: '',
    };
    toSend.question = this.state.question;
    toSend.answer = this.state.answer;
    for (let i = -0; i < 4; i++) {
      toSend.options[i] = this.state.options[i];
    }
    toSend = JSON.stringify(toSend);
    console.log("Sent: "+toSend);
    this.props.navigation.navigate('Quiz', { sent: toSend });
  };

  editQuestion = () => {
    console.log("editQuestion called");
    let completed =this.state.completed;
    completed[0]=true;
    this.setState({ question: this.state.currentInput, completed });
  }

  editAnswer = () => {
    console.log("editAnswer called");
    let completed =this.state.completed;
    completed[5]=true;
    this.setState({ answer: this.state.currentInput });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={this.state.completed[0]? styles.questionCompleted : styles.questionBox}>
            <TextInput
              onChangeText={this.textInputChange}
              onSubmitEditing={this.editQuestion}
              onBlur={this.editQuestion}
              style={styles.paragraph}
              placeholder={'Type question here'}
              placeholderTextColor="rgb(200,200,200)"
            />
          </View>
          <View>
            <TouchableOpacity
              style={{
                flex: 1,
                borderColor: 'white',
                borderWidth: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={this.reset}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  transform: [{ rotate: '90deg' }],
                }}>
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardAvoidingView style={styles.responses} behavior={'padding'}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={this.state.completed[1]? styles.responseCompleted : styles.responseBox}>
              <TextInput
                onChangeText={this.textInputChange}
                onSubmitEditing={() => {this.addOption(0)}}
                onBlur={() => {this.addOption(0)}}
                style={styles.paragraph}
                placeholder={'Option 1'}
                placeholderTextColor="rgb(200,200,200)"
              />
            </View>
            <View style={this.state.completed[2]? styles.responseCompleted : styles.responseBox}>
              <TextInput
                onChangeText={this.textInputChange}
                onSubmitEditing={() => {this.addOption(1)}}
                onBlur={() => {this.addOption(1)}}
                style={styles.paragraph}
                placeholder={'Option 2'}
                placeholderTextColor="rgb(200,200,200)"
              />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={this.state.completed[3]? styles.responseCompleted : styles.responseBox}>
              <TextInput
                onChangeText={this.textInputChange}
                onSubmitEditing={() => {this.addOption(2)}}
                onBlur={() => {this.addOption(2)}}
                style={styles.paragraph}
                placeholder={'Option 3'}
                placeholderTextColor="rgb(200,200,200)"
              />
            </View>
            <View style={this.state.completed[4]? styles.responseCompleted : styles.responseBox}>
              <TextInput
                onChangeText={this.textInputChange}
                onSubmitEditing={() => {this.addOption(3)}}
                onBlur={() => {this.addOption(3)}}
                style={styles.paragraph}
                placeholder={'Option 4'}
                placeholderTextColor="rgb(200,200,200)"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior={'padding'} style={this.state.completed[5]? styles.questionCompleted : styles.questionBox}>
          <TextInput
            onChangeText={this.textInputChange}
            onSubmitEditing={this.editAnswer}
              onBlur={this.editAnswer}
            style={styles.paragraph}
            placeholder={'Answer (must be one of the options)'}
            placeholderTextColor="rgb(200,200,200)"
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(23,223,223)',
          }}
          onPress={this.submitQuestion}>
          <Text style={{ fontSize: 30, color: 'black' }}> Submit </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'rgb(21,21,21)',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  questionBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(60,60,60)',
    borderColor:"white",
    borderRadius:2,
    borderWidth:4,
  },
  questionCompleted: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(60,60,60)',
    borderColor:"green",
    borderRadius:2,
    borderWidth:4,
  },
  responseBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: '2',
    borderRadius: '10',
  },
  responseCompleted: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: '2',
    borderRadius: '10',
  },
  responses: {
    flex: 4,
    flexDirection: 'row',
  },
});
