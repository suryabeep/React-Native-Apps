import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux'
import TodoApp from './src/TodoApp'
import store from './src/store/Index'


export default class App extends React.Component {

  render () {
    return (
      <Provider store = {store}>
        <View style = {styles.container}>
          <TodoApp/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
