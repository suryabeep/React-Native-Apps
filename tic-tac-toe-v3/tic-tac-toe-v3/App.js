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
import { Constants, ScreenOrientation } from 'expo';
import { createDrawerNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Game from './Game.js';
import AboutMe from './AboutMe.js';
import Settings from './Settings';

const initialState = {
  counter: 0,
};
const reducer = (state = initialState) => {
  return state;
};
const store = createStore(reducer);

class MainPage extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./assets/home.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  componentDidMount = () => {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT_UP);
  };

  render() {
    return <Game />;
  }
}

class AboutMePage extends React.Component {
  static navigationOptions = {
    drawerLabel: 'About Me',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./assets/person.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  render() {
    return <AboutMe />;
  }
}

class SettingsPage extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./assets/gear.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };
  render() {
    return (
      <Provider store={store}>
        <Settings />
      </Provider>
    );
  }
}

export default createDrawerNavigator(
  {
    Home: {
      screen: MainPage,
    },
    Second: {
      screen: SettingsPage,
    },
    Third: {
      screen: AboutMePage,
    },
  },
  {
    drawerWidth: 200,
    drawerBackgroundColor: 'rgb(85, 83, 84)',
  },
);

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
