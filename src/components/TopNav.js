'use strict';

import React, {Component} from 'react';
import {Dimensions, View, Text, StyleSheet} from 'react-native';

let {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    paddingTop: 20,
    width: width*2,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.5)'
  },
  menuItem: {
    width: width/3,
  },
  text: {
    opacity: 0.25,
    color: '#ffffff'
  },
  activeText: {
    opacity: 1,
    color: '#ffffff'
  }
});

export default class TopNav extends Component {
  static defaultProps = {
    page: 0,
    pageTransition: 0
  };

  getTextStyle(page) {
    if (this.props.page === page) {
      return styles.activeText;
    }

    return styles.text;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.page !== this.props.page) return true;
    //if (nextProps.pageTransition !== this.props.pageTransition) return true;
    return false;
  }

  constructor(prop) {
    super(prop);

    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menuItem}>
          <Text style={this.getTextStyle(0)}>Video Page</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={this.getTextStyle(1)}>Red Page</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={this.getTextStyle(2)}>Green Page</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={this.getTextStyle(3)}>Blue Page</Text>
        </View>
      </View>
    );
  }
}
