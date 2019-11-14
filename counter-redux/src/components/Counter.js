import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions';

class Counter extends React.Component {
    increment = () => {
        this.props.increment()
    }
    decrement = () => {
        this.props.decrement()
    }
    render () {
        return (
        <View style={styles.container}>
            <Button title="+" onPress={this.increment}/>
            <Text>{this.props.count}</Text>
            <Button title="-" onPress={this.decrement}/>
        </View>
        );
    }
}

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        count: state.countReducer.count,
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Counter);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
