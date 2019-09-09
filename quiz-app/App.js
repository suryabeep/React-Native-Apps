import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Constants } from 'expo';
import Quiz from './Quiz.js';
import NewQuestion from "./NewQuestion.js"
import { createStackNavigator, createAppContainer } from 'react-navigation';
const MainNavigator = createStackNavigator({
  Quiz: {screen: Quiz},
  NewQuestion: {screen: NewQuestion},
});

const getStateForActionScreensStack = MainNavigator.router.getStateForAction;

MainNavigator.router = {
    ...MainNavigator.router,
    getStateForAction(action, state) {
      if (action.type == 'Navigation/BACK') {
        console.log('We are going back...');
      }
      return getStateForActionScreensStack(action, state);
    },
};

const App = createAppContainer(MainNavigator);
export default App;

