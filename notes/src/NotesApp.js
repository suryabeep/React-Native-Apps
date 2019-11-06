import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, StatusBar, TextInput, ScrollView} from 'react-native';
import Constants from 'expo-constants'
import {Ionicons} from '@expo/vector-icons'
import {connect} from 'react-redux'

const {height, width} = Dimensions.get('window');
let characterCutoffLimit = 40

export default class NotesApp extends React.Component{
  state = {
    notes: ["testing", "this is a test", 'testing with a really long string just to see if the ... works as it should'],
    modalVisible: false,
    storedText: "",
    index: -1,
    newOrEdit: "",
    selectedButtons: [false, false, false],
    selectVisible: false,
  }

  openModal = (text, newOrEdit, index) => {
    console.log("Open pressed")
    this.setState({modalVisible: true, storedText: text, newOrEdit, index})
  }
  closeModal = () => {
    this.setState({modalVisible: false})
  }
  changeText = (text) => {
    this.setState({storedText: text})
  }
  doneEditing = () => {
    let notes = [... this.state.notes]
    if (this.state.newOrEdit == 'new') {
      notes.push(this.state.storedText)
    }
    else if (this.state.newOrEdit == 'edit' && this.state.index != -1) {
      notes.splice(this.state.index, 1, this.state.storedText)
    }
    this.setState({notes: notes, storedText: ""})
    this.closeModal()
  }
  select = (index) => {
    let selectedButtons = [... this.state.selectedButtons]
    selectedButtons.splice(index, 1, !selectedButtons[index])
    this.setState({selectedButtons})
  }
  confirmDelete = () => {
    notes = [... this.state.notes]
    for (let i = 0; i < this.state.selectedButtons.size; i++) {
      if (this.state.selectedButtons[i]) {
        notes.splice(i, 1)
      }
    }
    this.setState({notes, selectVisbile: false})
    alert("You confirmed the delete action.")
  }

  render () {
    if (this.state.selectVisible) {
      characterCutoffLimit = 30
    } else {
      characterCutoffLimit = 40
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Modal style = {styles.modal} animationType="slide" transparent={true} visible={this.state.modalVisible}>
          <View style={styles.modal}>
            <View style = {{flex: 2, flexDirection: 'row', justifyContent: 'space-between', padding: 5, width: "100%"}}>
              <TouchableOpacity style = {{flex: 1, padding: 10,}} onPress={this.closeModal}>
                <Ionicons name='ios-close-circle-outline' size={50} style = {{color: 'white'}}/>
              </TouchableOpacity>
              <TouchableOpacity style = {{flex: 1, padding: 10, alignItems: 'flex-end'}} onPress={this.doneEditing}>
                <Ionicons name='ios-checkmark-circle-outline' size={50} style = {{color: 'white'}}/>
              </TouchableOpacity>
            </View>
            <View style = {{borderBottomWidth: 1, borderBottomColor:'white', width: "100%", height: 10}}/>
            <View style = {{flex:20, width: width, alignItems: 'flex-start', justifyContent:'flex-start', padding: 10}}>
              <TextInput
                placeholder = {this.state.modalText}
                placeholderTextColor = "rgb(200,200,200)"
                editable = {true}
                multiline
                textAlignVertical = "top"
                value = {this.state.storedText}
                style = {[styles.text, {textAlignVertical: "top", fontSize: 18}]}
                onChangeText = {this.changeText}
                onSubmitEditing = {this.doneEditing}
                clearTextOnFocus = {true}
              />
            </View>
          </View>
        </Modal>

        <View style = {styles.topContainer}>
          <TouchableOpacity onPress = {() => {this.setState({selectVisible: !this.state.selectVisible})}}>
            <Text style = {{fontSize: 24, color: "rgb(226,75,79)", fontFamily: 'HelveticaNeue'}}>Select</Text>  
          </TouchableOpacity>     
          {this.state.selectVisbile
            ? <TouchableOpacity onPress={this.confirmDelete}>  
                <Ionicons name = "ios-trash" size={36} style={{color: "rgb(226,75,79)"}}/>
              </TouchableOpacity>
            : <TouchableOpacity onPress={() => {this.openModal("Type your new note here:", "new", -1)}}>  
                <Ionicons name = "ios-add-circle-outline" size={36} style={{color: "rgb(23,223,223)"}}/>
              </TouchableOpacity>
          } 
        </View>

        <View style = {{borderBottomWidth: 1, borderBottomColor:'white', width: "100%"}}/>
        
        <View style = {styles.bottomContainer}>
          {this.state.selectVisible 
            ? <View style = {styles.selectContainer}>
              {this.state.selectedButtons.map((selected, index) => (
                  <TouchableOpacity key={index} onPress = {() => {this.select(index)}}>
                    <Ionicons name = {selected? "ios-radio-button-on" : "ios-radio-button-off"} size = {20} style={selected? {color: "rgb(226,75,79)", padding: 10} : {color: "white", padding: 10}}/>
                  </TouchableOpacity>
              ))}
              </View>
            : <View />
          }
          
          <View style = {styles.notesContainer}>
            {this.state.notes.map((text, index) => (
              <TouchableOpacity key = {index} onPress = {() => {this.openModal(text, "edit", index)}}>
                <Text style = {styles.text}> 
                  {(text.length > characterCutoffLimit)
                    ? text.substring(0, characterCutoffLimit) + "..." 
                    : text.substring(0, characterCutoffLimit)} 
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(32,32,32)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "white",
    fontSize: 20,
    fontFamily: "HelveticaNeue",
    padding: 10,
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgb(64,64,64)',
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 40,
    opacity: 0.98,
    marginTop: Constants.statusBarHeight,
    marginBottom: Constants.statusBarHeight
  },
  exitModal: {
    flex: 1,
    backgroundColor: "rgb(23,223,223)",
    borderRadius: 20,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingHorizontal: 10,
    margin: 10,
  },
  notesContainer: {
    flex: 9,
    justifyContent: 'flex-start',
    padding: 10,
    alignItems: 'flex-start',
    width: width,
  },
  topContainer: {
    height: height/10,
    width: width,
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:10,
  },
  bottomContainer: {
    flex: 5,
    flexDirection: 'row',
    //justifyContent: 'flex-start',
    padding: 10,
    //alignItems: 'flex-start',
    width: width,
  },
  selectContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
    alignItems: 'center',
  }
});
