import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { withNavigationFocus } from 'react-navigation';
import Questions from './Questions.js';

export default class Quiz extends React.Component {
  state = {
    correct: 0,
    incorrect: 0,
    questions: Questions.questions,
  };

  static navigationOptions = {
    title: 'Quiz',
    headerStyle: {
      backgroundColor: 'rgb(42,42,42)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitleStyle: { fontSize: 20, color: 'white' },
  };

  componentDidUpdate(prevProps) {
    const { navigation } = this.props;
    let newQues = navigation.getParam('sent');
    if (newQues != null) {
      newQues = JSON.parse(newQues);
      let questions = this.state.questions;
      questions.push(newQues);
    }
  }

  pressed = (answered, quesIndex) => {
    let questions = this.state.questions;
    if (questions[quesIndex].options[answered] == questions[quesIndex].answer) {
      this.setState(previousState => ({ correct: previousState.correct + 1 }));
    } else {
      this.setState(previousState => ({
        incorrect: previousState.incorrect + 1,
      }));
    }
  };

  reset = () => {
    this.setState({
      correct: 0,
      incorrect: 0,
    });
  };

  addNew = () => {
    this.props.navigation.navigate('NewQuestion');
  };

  render() {
    let quesIndex = Math.floor(Math.random() * this.state.questions.length);
    let numCorrect = this.state.correct;
    let numIncorrect = this.state.incorrect;

    //if (numCorrect != 0 && numIncorrect != 0) {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={styles.questionBox}>
            <Text style={styles.paragraph}>
              {this.state.questions[quesIndex].question}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                flex: 1,
                borderColor: 'white',
                borderWidth: 3,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={this.reset}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                }}>
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                borderColor: 'white',
                borderWidth: 3,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={this.addNew}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  padding: 5,
                }}>
                Add new {'\n'}Question
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.responses}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <TouchableOpacity
              style={styles.responseBox}
              onPress={() => this.pressed(0, quesIndex)}>
              <Text style={styles.paragraph}>
                {this.state.questions[quesIndex].options[0]}{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.responseBox}
              onPress={() => this.pressed(1, quesIndex)}>
              <Text style={styles.paragraph}>
                {this.state.questions[quesIndex].options[1]}{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <TouchableOpacity
              style={styles.responseBox}
              onPress={() => this.pressed(2, quesIndex)}>
              <Text style={styles.paragraph}>
                {this.state.questions[quesIndex].options[2]}{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.responseBox}
              onPress={() => this.pressed(3, quesIndex)}>
              <Text style={styles.paragraph}>
                {this.state.questions[quesIndex].options[3]}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {numCorrect != 0 && numIncorrect != 0 ? (
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View
              style={{
                flex: numCorrect,
                backgroundColor: 'rgb(23,223,223)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.paragraph}>C: {this.state.correct}</Text>
            </View>
            <View
              style={{
                flex: numIncorrect,
                backgroundColor: 'rgb(247, 0, 82)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.paragraph}>I: {this.state.incorrect}</Text>
            </View>
          </View>
        ) : numCorrect == 0 && numIncorrect != 0 ? (
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View
              style={{
                flex: numIncorrect,
                backgroundColor: 'rgb(247, 0, 82)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.paragraph}>I:{this.state.incorrect}</Text>
            </View>
          </View>
        ) : numCorrect != 0 && numIncorrect == 0 ? (
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View
              style={{
                flex: numCorrect,
                backgroundColor: 'rgb(23,223,223)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.paragraph}>C: {this.state.correct}</Text>
            </View>
          </View>
        ) : null}
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
    padding: 4,
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
  },
  responses: {
    flex: 4,
    flexDirection: 'row',
  },
  responseBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: '2',
    borderRadius: '10',
  },
});
