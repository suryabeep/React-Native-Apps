import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NotesApp from './src/NotesApp'

const initialState = {
  notes: ["testing", "this is a test"],
  modalVisible: false,
}


export default class App extends React.Component{
  render(){
    return (
      <NotesApp />
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
  text: {
    color: "white",
    fontSize: 36,
    fontFamily: "HelveticaNeue"
  }
});
