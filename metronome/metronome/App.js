import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Platform,
} from 'react-native';
import { Constants, Audio } from 'expo';
import { MultiTouchView } from 'expo-multi-touch';
const { width, height } = Dimensions.get('window');
const DEAD_ZONE = 30;
let numFingersRequired = 1;
let numIdentifiers = 0;
const sound1 = new Audio.Sound(require('./metSound.mp3'));

export default class App extends React.Component {
  state = {
    num: 4,
    denom: 4,
    bpm: 60,
    mutePercent: 0.5,
    editing: [false, false, false, false],
    touch: { identifier: null, y: 0, x: 0 },
    dummy: false,
    click: false,
    timesFired: 0,
    running: true,
  };

  touchProps = {
    onTouchBegan: event => {
      const { identifier } = event;
      Platform.OS == 'ios'
        ? (numIdentifiers = identifier)
        : (numIdentifiers = identifier + 1);
      let touch = this.state.touch;
      touch.identifier = identifier;
      touch.y = event.pageY;
      touch.x = event.pageX;
      this.setState({ dummy: true });
    },
    onTouchEnded: event => {
      const { identifier } = event;
      console.log('touchEnded, identifier = ' + identifier);
      let touch = this.state.touch;
      let editing = this.state.editing;
      //if user taps on screen with 2 fingers, then start or stop the metronome
      if (
        event.identifier == numFingersRequired &&
        this.state.running &&
        numIdentifiers == 2
      ) {
        clearInterval(this.met);
        this.setState({ running: false, timesFired: 0, click: false });
      } else if (
        event.identifier == numFingersRequired &&
        !this.state.running &&
        numIdentifiers == 2
      ) {
        this.startMet();
      }
      //checking if user tapped on one of the UI areas and then enters or exits editing mode for that object
      else if (event.isTap) {
        if (
          touch.y < (height * 2) / 9 &&
          touch.y > height / 9 &&
          touch.x < width / 2
        ) {
          if (!editing[1] && !editing[2] && !editing[3]) {
            editing[0] = !editing[0];
          }
        }
        if (touch.y < height / 3 && touch.x > width / 2) {
          if (!editing[0] && !editing[2] && !editing[3]) {
            editing[1] = !editing[1];
          }
        }
        if (touch.y > height / 3 && touch.y < (2 * height) / 3) {
          if (!editing[0] && !editing[1] && !editing[3]) {
            editing[2] = !editing[2];
          }
        }
        if (touch.y > (2 * height) / 3) {
          if (!editing[0] && !editing[1] && !editing[2]) {
            editing[3] = !editing[3];
          }
        }
        this.setState({ dummy: true });
      }
      //if user swiped to edit values in the UI areas
      else if (touch.identifier == identifier) {
        if (editing[0]) {
          let dy = touch.y - event.pageY;
          let num = this.state.num;
          dy > DEAD_ZONE ? num++ : null;
          dy < DEAD_ZONE && num > 1 ? num-- : null;
          this.setState({ num: num, timesFired: 0 });
        }
        if (editing[1]) {
          let dy = touch.y - event.pageY;
          let denom = this.state.denom;
          dy > DEAD_ZONE ? (denom *= 2) : null;
          dy < DEAD_ZONE && denom >= 2 ? (denom /= 2) : null;
          this.setState({ denom: denom, timesFired: 0 });
          //refresh the denom for the interval
          clearInterval(this.met);
          this.startMet();
          this.setState({ dummy: true });
        }
        //if editing the bpm
        if (editing[2]) {
          let dy = touch.y - event.pageY;
          let dBPM = 0;
          //dBPM = Math.floor(dy / 15);
          //alternate formula
          Math.abs(dy) > DEAD_ZONE
            ? (dBPM = Math.floor((dy - DEAD_ZONE) / 20))
            : null;
          let bpm = this.state.bpm;
          bpm + dBPM > 0 ? (bpm += dBPM) : null;
          this.setState({ bpm });
          //refresh the tempo for the interval
          clearInterval(this.met);
          this.startMet();
        }
        if (editing[3]) {
          let dy = -touch.y + event.pageY;
          let dMute = dy / height / 3;
          let mutePercent = this.state.mutePercent;
          mutePercent + dMute > 0 ? (mutePercent += dMute) : null;
          this.setState({ mutePercent });
        }
        this.setState({ dummy: false });
      }
    },
  };

  componentDidMount = async () => {
    this.setupAudio();
    this.startMet();
    Platform.OS == 'ios' ? (numFingersRequired = 2) : null;
    try {
      await sound1.loadAsync(require('./metSound.mp3'));
      console.log("sound loaded");
    } catch (error) {
      console.log("error occurred in loading the sound")
    }
  };

  setupAudio = async () => {
    Audio.setAudioModeAsync({
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndriod: true,
    });
  };

  startMet = () => {
    clearInterval(this.met);
    let clickpm = this.state.bpm * (this.state.denom / 4);
    let time = (1000 * 60) / clickpm / 2;
    this.met = setInterval(this.click, time);
    this.setState({ running: true });
  };

  click = () => {
    this.playClick();
    this.setState((prevState) => ({ click: !prevState.click, timesFired: prevState.timesFired+1 }));
  };

  playClick = async () => {
    this.sound1.play();
  };

  render() {
    let red = 'rgb(150, 10, 22)';
    let blue = 'rgb(3, 112, 124)';
    let mc = (1 - this.state.mutePercent) * 256;
    let muteColor = 'rgb(' + mc + ',' + mc + ',' + mc + ')';
    console.log(this.state.timesFired%this.state.num)
    return (
      <MultiTouchView
        style={[
          styles.container,
          this.state.click
            ? this.state.timesFired%this.state.num==1
              ? { backgroundColor: red }
              : { backgroundColor: blue }
            : null,
        ]}
        {...this.touchProps}>
        <View style={styles.fractionBox}>
          <View style={styles.numBox}>
            <Text
              style={[
                styles.fracText,
                this.state.editing[0] ? { color: 'rgb(0, 255, 237)' } : null,
              ]}>
              {' '}
              {this.state.num}{' '}
            </Text>
          </View>
          <Text style={styles.fracText}> / </Text>
          <View style={styles.numBox}>
            <Text
              style={[
                styles.fracText,
                this.state.editing[1] ? { color: 'rgb(0, 255, 237)' } : null,
              ]}>
              {' '}
              {this.state.denom}{' '}
            </Text>
          </View>
        </View>
        <View style={styles.fractionBox}>
          <Text
            style={[
              { color: 'white', fontSize: 70 },
              this.state.editing[2] ? { color: 'rgb(0, 255, 237)' } : null,
            ]}>
            {this.state.bpm} bpm
          </Text>
        </View>
        <View style={styles.fractionBox}>
          <Text
            style={[
              styles.muteText,
              { color: muteColor },
              this.state.editing[3] ? styles.muteEditing : null,
            ]}>
            Random Mute?
          </Text>
        </View>
      </MultiTouchView>
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
  fractionBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fracText: {
    fontSize: 90,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
  },
  muteText: {
    fontSize: 50,
  },
  muteEditing: {
    textShadowColor: 'rgb(0, 255, 237)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 2,
  },
});
