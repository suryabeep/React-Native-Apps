import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  TextInput,
  Font,
  Image,
  StatusBar,
} from 'react-native';
import { Constants } from 'expo';

class AboutMe extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden = {true}/>
        <Text style={styles.heading}>About Me</Text>
        <Image source={require('./assets/me.png')} style={styles.image} />
        <Text style={styles.bodyText}>
          Hi! I'm Surya.
          {'\n'}
          I'm a senior at University High School.
          {'\n'}
          This is an about me page for the App Development Class with the Lord
          God of Computer Scientifics himself, Monsiuer Kinney.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(45, 43, 44)',
    alignItems: "center"
  },
  image: {
    width: 200,
    height: 200,
    margin: 24,
    justifyContent: 'center',
  },
  bodyText: {
    margin: 40,
    fontSize: 24,
    fontweight: 'light',
    fontFamily: 'Helvetica-Light',
    color: 'white',
  },
});

export default AboutMe;

