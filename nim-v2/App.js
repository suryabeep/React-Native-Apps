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
    a: [false, false, false, false, false],
    b: [false, false, false, false, false],
    c: [false, false, false, false, false],
    player: 1,
    numCirclesSelected: 0,
    currentHeap: "",
    aDead: [],
    bDead:[],
    cDead:[],
    selected: [],
    modalVisible: false,
  }

  select = (index, heap) => {
    console.log("heap is: " + heap)
    currentHeap = this.state.currentHeap
    selected = this.state.selected
    console.log("selected is: " + selected)
    console.log("selected length is: " + selected.length)
    if (selected.length <= 3) {
      if (selected.length == 0) {
        currentHeap = heap
        this.setState({currentHeap: currentHeap})
      }
      if (heap != currentHeap) {
        return
      }
      if (heap == "a" && currentHeap == "a") {
        toEdit = this.state.a
        if (toEdit[index]) {
          toEdit[index] = false
          selected.pop()
        } else if (selected.length < 3){
          toEdit[index] = true
          selected.push("a,"+index)
        }
        this.setState({a: toEdit})
        //this.setState({numCirclesSelected: this.state.numCirclesSelected + 1})
        this.setState({selected: selected})
      } else if (heap == "b" && currentHeap == "b") {
        toEdit = this.state.b
        if (toEdit[index]) {
          toEdit[index] = false
          selected.pop()
        } else if (selected.length < 3){
          toEdit[index] = true
          selected.push("b,"+index)
        }
        this.setState({b: toEdit})
        //this.setState({numCirclesSelected: this.state.numCirclesSelected + 1})
        this.setState({selected: selected})
      } else if (heap == "c" && currentHeap == "c") {
        toEdit = this.state.c
        if (toEdit[index]) {
          toEdit[index] = false
          selected.pop()
        } else if (selected.length < 3){
          toEdit[index] = true
          selected.push("c,"+index)
        }
        this.setState({c: toEdit})
        //this.setState({numCirclesSelected: this.state.numCirclesSelected + 1})
        this.setState({selected: selected})
      }
    } else {
      Alert.alert("You can't select more than 3 circles to remove at a time.")
    }
  }

  submit = () => {
    selected = this.state.selected
    if (selected.length == 0) {
      Alert.alert("You must select items to remove.")
      return;
    }
    heap = selected[0].split(",")[0]
    if (heap == "a") {
      a = this.state.a
      aDead = this.state.aDead
      for (let i = 0; i < selected.length; i++) {
        aDead.push(i)
        a.pop()
      }
      //deselect everything in a
      for (let i = 0; i < a.length; i++) {
        a[i] = false;
      }
      this.setState({aDead, a})
    } else if (heap == "b") {
      b = this.state.b
      bDead = this.state.bDead
      for (let i = 0; i < selected.length; i++) {
        bDead.push(i)
        b.pop()
      }
      //deselect everything in b
      for (let i = 0; i < b.length; i++) {
        b[i] = false;
      }
      this.setState({bDead, b})
    } else if (heap == "c") {
      c= this.state.c
      cDead = this.state.cDead
      for (let i = 0; i < selected.length; i++) {
        cDead.push(i)
        c.pop()
      }
      //deselect everything in c
      for (let i = 0; i < c.length; i++) {
        c[i] = false;
      }
      this.setState({cDead, c})
    }
    this.checkWin();
    this.setState({player: -1 * this.state.player});
    this.setState({currentHeap: ""})
    this.setState({selected: [], numCirclesSelected: 0})
  }

  checkWin = () => {
    if (this.state.aDead.length == 5 && this.state.bDead.length == 5
      && this.state.cDead.length == 5) {
        winner = this.state.player > 0 ? "Player Red" : "Player Blue"
        Alert.alert("Game over! " + winner + " won!")
        this.reset()
    }
  }

  reset = () => {
    this.setState({
      a: [false, false, false, false, false],
      b: [false, false, false, false, false],
      c: [false, false, false, false, false],
      player: 1,
      numCirclesSelected: 0,
      currentHeap: "",
      aDead: [],
      bDead:[],
      cDead:[],
      selected: [],
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
          <View style=
            {this.state.player > 1
              ? styles.board
              : [styles.board, {transform: [{rotate: '-180deg'}]}]
          }>
            <View style={styles.heap}>
              {this.state.a.map((tapped, index) => (
                <TouchableOpacity style={a[index]? [styles.circle, {backgroundColor: "rgb(225,225,225)"}] : styles.circle}
                  key = {index} onPress = {() => {this.select(index, "a")}}/>
              ))}
              {this.state.aDead.map((index) => (
                <View style = {[styles.circle, {backgroundColor: "black", borderColor: "black"}]} key = {"aDead"+index}/>
              ))}
            </View>
            <View style={styles.heap}>
              {this.state.b.map((tapped, index) => (
                <TouchableOpacity style={b[index]? [styles.circle, {backgroundColor: "rgb(225,225,225)"}] : styles.circle}
                  key = {index} onPress = {() => {this.select(index, "b")}}/>
              ))}
              {this.state.bDead.map((index) => (
                <View style = {[styles.circle, {backgroundColor: "black", borderColor: "black"}]} key = {"bDead"+index}/>
              ))}
            </View>
            <View style={styles.heap}>
              {this.state.c.map((tapped, index) => (
                <TouchableOpacity style={c[index]? [styles.circle, {backgroundColor: "rgb(225,225,225)"}] : styles.circle}
                  key = {index} onPress = {() => {this.select(index, "c")}}/>
              ))}
              {this.state.cDead.map((index) => (
                <View style = {[styles.circle, {backgroundColor: "black", borderColor: "black"}]} key = {"cDead"+index}/>
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
