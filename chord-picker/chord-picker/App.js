import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  state = {
    chordNames: [],
    oct1Selected: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  };

  updateChord = () => {
    let tempNames = [];
    let tempOct1 = [];
    //create deep copy
    for (let i = 0; i < 12; i++) {
      tempOct1.push(this.state.oct1Selected[i]);
    }
    //and then add another copy onto the end
    for (let i = 0; i < 12; i++) {
      tempOct1.push(this.state.oct1Selected[i]);
    }

    console.log("update chord got: " + this.state.oct1Selected);
    //find maj7 chords
    for (let i = 0; i < 12; i++) {
      if ((tempOct1[i] &&tempOct1[i + 4] && tempOct1[i + 11]) || (tempOct1[i] &&tempOct1[i + 4] &&tempOct1[i + 7] && tempOct1[i + 11])) {
        let name = this.getRoot(i) + String.fromCharCode(916) + '7';
        name += this.getExtension(tempOct1, i);
        //if the chord is not already in the list of names
        if (tempNames.indexOf(name) == -1) {
          tempNames.push(name);
        }
        this.setState({ chordNames: tempNames });
      }
    }
    //find min7 chords
    for (let i = 0; i < tempOct1.length; i++) {
      if ((tempOct1[i] &&tempOct1[i + 3] && tempOct1[i + 10]) || (tempOct1[i] &&tempOct1[i + 3] &&tempOct1[i + 7] && tempOct1[i + 10])){
        let name = this.getRoot(i) + '-7';
        name += this.getExtension(tempOct1, i);
        //if the chord is not already in the list of names
        if (tempNames.indexOf(name) == -1) {
          tempNames.push(name);
        }
        this.setState({ chordNames: tempNames });
      }
    }
    //find 7 chords
    for (let i = 0; i < tempOct1.length; i++) {
      if (
        tempOct1[i] &&
        tempOct1[i + 4] &&
        tempOct1[i + 7] &&
        tempOct1[i + 10]
      ) {
        let name = this.getRoot(i) + '7';
        name += this.getExtension(tempOct1, i);
        //if the chord is not already in the list of names
        if (tempNames.indexOf(name) == -1) {
          tempNames.push(name);
        }
        this.setState({ chordNames: tempNames });
      }
    }
    //find Halfdim chords
    for (let i = 0; i < 12; i++) {
      if (tempOct1[i] &&tempOct1[i + 3] &&tempOct1[i + 6] && tempOct1[i + 10]) {
        let name = this.getRoot(i) + 'ø';
        name += this.getExtensionExclude(tempOct1, i, [3,6]);
        //if the chord is not already in the list of names
        if (tempNames.indexOf(name) == -1) {
          tempNames.push(name);
        }
        this.setState({ chordNames: tempNames });
      }
    }
    //find dim chords
    for (let i = 0; i < 12; i++) {
      if ((tempOct1[i] &&tempOct1[i + 3] && tempOct1[i + 6]) || (tempOct1[i] &&tempOct1[i + 3] &&tempOct1[i + 6] && tempOct1[i + 9])) {
        let name = this.getRoot(i) + 'dim';
        name += this.getExtensionExclude(tempOct1, i, [3,6]);
        //name += this.getExtension(tempOct1, i);
        //if the chord is not already in the list of names
        if (tempNames.indexOf(name) == -1) {
          tempNames.push(name);
        }
        this.setState({ chordNames: tempNames });
      }
    }
    //find minMaj chords
    for (let i = 0; i < tempOct1.length; i++) {
      if (
        tempOct1[i] &&
        tempOct1[i + 3] &&
        tempOct1[i + 7] &&
        tempOct1[i + 11]
      ) {
        let name = this.getRoot(i) + "min"+String.fromCharCode(916)+'7';
        name += this.getExtensionExclude(tempOct1, i, [3]);
        //if the chord is not already in the list of names
        if (tempNames.indexOf(name) == -1) {
          tempNames.push(name);
        }
        this.setState({ chordNames: tempNames });
      }
    }
    //find major chords
    for (let i = 0; i < tempOct1.length; i++) {
      if (tempOct1[i] && tempOct1[i + 4] && tempOct1[i + 7]) {
        if (tempNames.indexOf(this.getRoot(i) + ' maj') == -1)
          tempNames.push(this.getRoot(i) + ' maj');
        this.setState({ chordNames: tempNames });
      }
    }
    //find minor chords
    for (let i = 0; i < tempOct1.length; i++) {
      if (tempOct1[i] && tempOct1[i + 3] && tempOct1[i + 7]) {
        if (tempNames.indexOf(this.getRoot(i) + ' min') == -1)
          tempNames.push(this.getRoot(i) + ' min');
        this.setState({ chordNames: tempNames });
      }
    }
  };


  getRoot(index) {
    if (index > 11) {
      index -= 12;
    }
    switch (index) {
      case 0:
        return 'C';
      case 1:
        return 'C#';
      case 2:
        return 'D';
      case 3:
        return 'D#';
      case 4:
        return 'E';
      case 5:
        return 'F';
      case 6:
        return 'F#';
      case 7:
        return 'G';
      case 8:
        return 'G#';
      case 9:
        return 'A';
      case 10:
        return 'Bb';
      case 11:
        return 'B';
    }
  }

  getExtension(arrayIn, index) {
    if (arrayIn[index + 6]) {
      return '#11';
    } else if (arrayIn[index + 2]) {
      return 'add9';
    } else if (arrayIn[index + 1]) {
      return 'b9';
    } else if (arrayIn[index + 3]) {
      return '#9';
    }else {
      return '';
    }
  }

  getExtensionExclude(arrayIn, index, exclude){
    if (arrayIn[index + 6] && exclude.indexOf(6)==-1) {
      return '#11';
    } else if (arrayIn[index + 2] && exclude.indexOf(2)==-1) {
      return 'add9';
    } else if (arrayIn[index + 1] && exclude.indexOf(1)==-1) {
      return 'b9';
    } else if (arrayIn[index + 3] && exclude.indexOf(3)==-1) {
      return '#9';
    }else {
      return '';
    }
  }

  // notePicked = index => {
  //   let flag = 0;
  //   let temp = this.state.oct1Selected;
  //   if (index > 11) {
  //     temp = this.state.oct2Selected;
  //     index = index - 12;
  //     flag = 1;
  //   }
  //   temp[index] = !temp[index];
  //   //if deselcting a note, clear chords
  //   if (temp[index] == false) {
  //     this.clearChords();
  //   }
  //   this.setState(flag != 1 ? { oct1Selected: temp } : { oct2Selected: temp });
  //   this.updateChord();
  // };

  notePicked = index => {
    let temp = this.state.oct1Selected;
    console.log("note picked got: " + temp);
    if(temp[index]){
      this.clearChords();
    }
    temp[index] = !temp[index];
    this.setState({oct1Selected: temp});
    this.updateChord();
  };

  clearChords = () => {
    this.setState({
      chordNames: [],
      oct1Selected: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 2, flexDirection: 'row' }}>
          <ScrollView style={styles.chordName}>
            {this.state.chordNames.map((val, index) => (
              <TouchableOpacity onPress={this.remove} style={{ flex: 3 }}>
                <Text key={index} style={[styles.paragraph, { fontSize: 20 }]}>
                  {val}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={this.clearChords} style={styles.clear}>
            <Text style={{ fontSize: 30, color: 'white' }}> Clear </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.notesContainer}>
          <View style = {styles.col}>
            <TouchableOpacity
              style={
                this.state.oct1Selected[0] == true
                  ? styles.noteBoxPicked
                  : styles.noteBox
              }
              onPress={() => {
                this.notePicked(0);
              }}>
              <Text style={styles.paragraph}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                this.state.oct1Selected[1] == true
                  ? styles.noteBoxPicked
                  : styles.noteBox
              }
              onPress={() => {
                this.notePicked(1);
              }}>
              <Text style={styles.paragraph}>C#/Db</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                this.state.oct1Selected[2] == true
                  ? styles.noteBoxPicked
                  : styles.noteBox
              }
              onPress={() => {
                this.notePicked(2);
              }}>
              <Text style={styles.paragraph}>D</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                this.state.oct1Selected[3] == true
                  ? styles.noteBoxPicked
                  : styles.noteBox
              }
              onPress={() => {
                this.notePicked(3);
              }}>
              <Text style={styles.paragraph}>D#/Eb</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                this.state.oct1Selected[4] == true
                  ? styles.noteBoxPicked
                  : styles.noteBox
              }
              onPress={() => {
                this.notePicked(4);
              }}>
              <Text style={styles.paragraph}>E</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                this.state.oct1Selected[5] == true
                  ? styles.noteBoxPicked
                  : styles.noteBox
              }
              onPress={() => {
                this.notePicked(5);
              }}>
              <Text style={styles.paragraph}>F</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.col}>
            <TouchableOpacity
              style={
                this.state.oct1Selected[6] == true
                  ? styles.noteBoxPicked
                  : styles.noteBox
              }
              onPress={() => {
                this.notePicked(6);
              }}>
              <Text style={styles.paragraph}>F#/Gb</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                this.state.oct1Selected[7] == true
                  ? styles.noteBoxPicked
                  : styles.noteBox
              }
              onPress={() => {
                this.notePicked(7);
              }}>
              <Text style={styles.paragraph}>G</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                this.state.oct1Selected[8] == true
                  ? styles.noteBoxPicked
                  : styles.noteBox
              }
              onPress={() => {
                this.notePicked(8);
              }}>
              <Text style={styles.paragraph}>G#/Ab</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                this.state.oct1Selected[9] == true
                  ? styles.noteBoxPicked
                  : styles.noteBox
              }
              onPress={() => {
                this.notePicked(9);
              }}>
              <Text style={styles.paragraph}>A</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                this.state.oct1Selected[10] == true
                  ? styles.noteBoxPicked
                  : styles.noteBox
              }
              onPress={() => {
                this.notePicked(10);
              }}>
              <Text style={styles.paragraph}>A#/Bb</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                this.state.oct1Selected[11] == true
                  ? styles.noteBoxPicked
                  : styles.noteBox
              }
              onPress={() => {
                this.notePicked(11);
              }}>
              <Text style={styles.paragraph}>B</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'rgb(20,20,20)',
    padding: 8,
  },
  chordName: {
    //justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgb(20, 243, 255)',
    alignItems: 'center',
    flex: 3,
  },
  notesContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flex: 6,
  },
  noteBox: {
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: 3,
    borderColor: 'rgb(20, 243, 255)',
    flex: 1,
  },
  noteBoxPicked: {
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: 3,
    borderColor: 'rgb(20, 243, 255)',
    flex: 1,
    backgroundColor: "rgb(35,12,232)"
  },
  paragraph: {
    color: 'white',
    margin: 10,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  clear: {
    width: 110,
    borderWidth: 3,
    borderColor: 'rgb(20, 243, 255)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  col: {
    flex:1,
    
  }
});
