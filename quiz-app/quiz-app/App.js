import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  state: {
    questions: [
      {
        question: "What's my name",
        options: ['j', 'q', 'Surya', 'r'],
        answer: 'Surya',
      },
      {
        question: 'How old am I ',
        options: ['1', '2', '18', '5'],
        answer: '18',
      },
    ],
  };

  render() {
    //generates a random question to display on screen.
    //let quesIndex = Math.floor(Math.random()*(this.state.questions.length));
    return (
      <View style={styles.container}>
        <View style={styles.questionBox}>
          <Text style={styles.paragraph}> Testing Question </Text>
        </View>
        <View style={styles.responses}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <TouchableOpacity style={styles.responseBox} onPress={()=>this.pressed(1)}>
              <Text style={styles.paragraph}> Test Response 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.responseBox}>
              <Text style={styles.paragraph}> Test Response 2</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <TouchableOpacity style={styles.responseBox}>
              <Text style={styles.paragraph}> Test Response 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.responseBox}>
              <Text style={styles.paragraph}> Test Response 4</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.progressBar} />
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
  },
  responses: {
    flex: 3,
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
