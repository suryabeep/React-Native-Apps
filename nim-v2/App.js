import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
import Constants from 'expo-constants'
import { ScreenOrientation } from 'expo'

const circleRadius = 40

export default class App extends React.Component {
  componentDidMount = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT_UP);
    this.setState({modalVisible: true})
  };

  state = {
    a: ["avail", "avail", "avail", "avail", "avail"],
    b: ["avail", "avail", "avail", "avail", "avail"],
    c: ["avail", "avail", "avail", "avail", "avail"],
    player: 1,
    currentHeap: "",
    modalVisible: false,
  }

  select = (index, heap) => {
    console.log("heap is: " + heap)
    console.log("index is: " + index)
    currentHeap = this.state.currentHeap
    //get the number of selected items
    let selected = this.selected();
    console.log("number of items selected is: " + selected)
    if (selected <= 3) {
      if (selected == 0) {
        currentHeap = heap
        this.setState({currentHeap: currentHeap})
      }
      if (heap != currentHeap) {
        return
      }
      if (heap == "a" && currentHeap == "a") {
        toEdit = this.state.a
        if (toEdit[index] == "selected") {
          console.log('the item pressed was already selected, now unselecting.')
          toEdit[index] = "avail"
        } else if (selected < 3){
          console.log('the item pressed was not selected, now selecting')
          toEdit[index] = "selected"
        }
        this.setState({a: toEdit})
      } else if (heap == "b" && currentHeap == "b") {
        toEdit = this.state.b
        if (toEdit[index] == "selected") {
          toEdit[index] = "avail"
        } else if (selected < 3){
          toEdit[index] = "selected"
        }
        this.setState({b: toEdit})
      } else if (heap == "c" && currentHeap == "c") {
        toEdit = this.state.c
        if (toEdit[index] == "selected") {
          toEdit[index] = "avail"
        } else if (selected < 3){
          toEdit[index] = "selected"
        }
        this.setState({c: toEdit})
      }
    } else {
      Alert.alert("You can't select more than 3 circles to remove at a time.")
    }
    console.log("a is: " + this.state.a)
    console.log("b is: " + this.state.b)
    console.log("c is: " + this.state.c)
  }

  submit = () => {
    selected = this.selected()
    if (selected == 0) {
      Alert.alert("You must select items to remove.")
      return;
    }
    heap = this.state.currentHeap
    if (heap == "a") {
      a = this.state.a
      for (let i = 0; i < a.length; i++) {
        if (a[i] == 'selected') {
          a[i] = 'dead'
        }
      }
      this.setState({a})
    } else if (heap == "b") {
      b = this.state.b
      for (let i = 0; i < b.length; i++) {
        if (b[i] == 'selected') {
          b[i] = 'dead'
        }
      }
      this.setState({b})
    } else if (heap == "c") {
      c= this.state.c
      for (let i = 0; i < c.length; i++) {
        if (c[i] == 'selected') {
          c[i] = 'dead'
        }
      }
      this.setState({c})
    }
    console.log("pressed submit.")
    console.log("a is: " + this.state.a)
    console.log("b is: " + this.state.b)
    console.log("c is: " + this.state.c)
    this.checkWin();
    this.setState({player: -1 * this.state.player});
    this.setState({currentHeap: ""})
  }

  selected = () => {
    currentHeap = this.state.currentHeap
    a = this.state.a
    b = this.state.b
    c = this.state.c
    //get the number of selected items
    let selected = 0;
    if (currentHeap == "a"){
      for (let i = 0; i < a.length; i++) {
        if (a[i] == "selected") {
          selected ++;
        }
      }
    } else if (currentHeap == 'b') {
      for (let i = 0; i < a.length; i++) {
        if (b[i] == "selected") {
          selected ++;
        }
      }
    } for (let i = 0; i < a.length; i++) {
      if (c[i] == "selected") {
        selected ++;
      }
    }
    return selected
  }

  checkWin = () => {
    //loop through all arrays and check if they're all dead
    let avail = false;
    for (let i = 0; i < this.state.a.length; i ++){
      if (this.state.a[i] != 'dead') {
        avail = true
      }
    }
    for (let i = 0; i < this.state.b.length; i ++){
      if (this.state.b[i] != 'dead') {
        avail = true
      }
    }
    for (let i = 0; i < this.state.c.length; i ++){
      if (this.state.c[i] != 'dead') {
        avail = true
      }
    }
    //if nothing is available to play, ie everything is dead
    if (!avail) {
      winner = this.state.player > 0 ? "Player Red" : "Player Blue"
      Alert.alert("Game over! " + winner + " won!")
      this.reset()
    }
  }

  reset = () => {
    this.setState({
      a: ["avail", "avail", "avail", "avail", "avail"],
      b: ["avail", "avail", "avail", "avail", "avail"],
      c: ["avail", "avail", "avail", "avail", "avail"],
      player: 1,
      currentHeap: "",
      modalVisible: false,
    })
  }

  render() {
    a = this.state.a
    b = this.state.b
    c = this.state.c
      return (
        <View style={styles.container}>
          <Modal
            style = {styles.modal}
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({modalVisible: false})
            }}>
            <View style={styles.modal}>
              <View style = {{flex: 1}} />
              <View style = {{flex: 4, alignItems: 'center', justifyContent:'center', padding: 40,}}>
                <Text style={[styles.text, {fontSize: 40}]}>Welcome to Nim! {"\n"}</Text>
                <Text style = {styles.text}>
                This game is played by taking 1, 2, or 3 pieces off the board at each turn. {"\n"}
                The goal of the game is to force your opponent to take the last pieces off the board. {"\n"}
                You can only take pieces from one column at a time. {"\n"}
                </Text>
              </View>
              <View style = {{flex: 1}}/>
              <TouchableOpacity
                style = {styles.exitModal}
                onPress={() => {
                  this.setState({modalVisible: false})
                }}>
                <Text style = {styles.text}>Start Game</Text>
              </TouchableOpacity>
              <View style = {{flex: 2}}/>
            </View>
          </Modal>
          <TouchableOpacity style = {
            this.state.player > 0
              ? [styles.submit, {transform: [{rotate: '-180deg'}]}]
              : [styles.submit, {backgroundColor: "rgb(249,0,79)", transform: [{rotate: '-180deg'}]}]
          } onPress = {this.state.player < 0 ? this.submit : null}>
          {this.state.player>0
            ? <Text style = {styles.text}>Not your turn</Text>
            : <Text style = {styles.text}>Submit Move</Text>
          }
          </TouchableOpacity>
          <View style = {styles.board}>
            <View style={styles.heap}>
              {this.state.a.map((tapped, index) => (
                tapped != 'dead'
                  ? <TouchableOpacity style={tapped == "selected"? [styles.circle, {backgroundColor: "rgb(225,225,225)"}] : styles.circle}
                    key = {index} onPress = {() => {this.select(index, "a")}}/>
                  : <View style = {[styles.circle, {backgroundColor: "black", borderColor: "black"}]} key = {"aDead"+index}/>
              ))}
            </View>
            <View style={styles.heap}>
              {this.state.b.map((tapped, index) => (
                tapped != 'dead'
                  ? <TouchableOpacity style={tapped == "selected"? [styles.circle, {backgroundColor: "rgb(225,225,225)"}] : styles.circle}
                    key = {index} onPress = {() => {this.select(index, "b")}}/>
                  : <View style = {[styles.circle, {backgroundColor: "black", borderColor: "black"}]} key = {"bDead"+index}/>
              ))}
            </View>
            <View style={styles.heap}>
              {this.state.c.map((tapped, index) => (
                tapped != 'dead'
                  ? <TouchableOpacity style={tapped == 'selected'? [styles.circle, {backgroundColor: "rgb(225,225,225)"}] : styles.circle}
                    key = {index} onPress = {() => {this.select(index, "c")}}/>
                  : <View style = {[styles.circle, {backgroundColor: "black", borderColor: "black"}]} key = {"cDead"+index}/>
              ))}
            </View>
          </View>
          <TouchableOpacity style = {
            this.state.player > 0
              ? [styles.submit, {backgroundColor:"rgb(23,223,223)"}]
              : styles.submit
          } onPress = {this.state.player > 0 ? this.submit : null}>
          {this.state.player>0
            ? <Text style = {styles.text}>Submit Move</Text>
            : <Text style = {styles.text}>Not your turn</Text>
          }
          </TouchableOpacity>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(32,32,32)',
    paddingTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgb(64,64,64)',
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 40,
    opacity: 0.98,
    marginTop: Constants.statusBarHeight
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
  },
  board: {
    flex: 5,
    flexDirection: "row",
  },
  heap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  circle: {
    height: circleRadius * 2,
    width: circleRadius * 2,
    borderRadius: circleRadius,
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  submit: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 40,
    width: "100%",
  },
  text: {
    fontFamily: "HelveticaNeue-Light",
    fontSize: 24,
    color: "white",
  }
});
