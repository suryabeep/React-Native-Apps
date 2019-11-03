import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import {connect} from 'react-redux'

class AddTodo extends React.Component {

  state = {
    text: '',
  }

  addTodo = (text) => {
    //redux store\
    this.props.dispatch({type:'ADD_TODO', text})
    this.setState({text: ''})
  }

  render () {
    return (
      <View style={{flexDirection: 'row', marginHorizontal : 20}}>
        <TextInput
          onChangeText = {(text) => {this.setState({text})}}
          value = {this.state.text}
          placeholder = "Eg. Create new video"
          style = {{
            borderWidth: 1, borderColor: "#f2f2e1",
            backgroundColor: "#eaeaea", height: 100,
            width: 300, padding: 5, borderRadius: 10,}}
        />
        <TouchableOpacity onPress={() => this.addTodo(this.state.text)}>
          <View style = {{height: 100, backgroundColor: "#eaeaea",
            alignItems: 'center', justifyContent:'center', padding: 10, borderRadius: 10}}>
            <Ionicons name='md-add' size={60} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(AddTodo)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
