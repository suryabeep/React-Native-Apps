import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AddTodo from './containers/AddTodo.js'
import VisibleTodos from './containers/VisibleTodos'

export default class TodoApp extends React.Component {

  state=  {
    todos: [],
    visibilityFilter: 'SHOW_ALL_TODOS',
  }

  render () {
    return (
      <View style={styles.container}>
        <AddTodo/>
        <View>
          <VisibleTodos/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
});
