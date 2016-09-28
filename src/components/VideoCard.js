"use strict";

import React, {Component} from 'react';

import {Animated, Dimensions, StyleSheet, View, Text} from 'react-native';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';

let {width, height} = Dimensions.get('window');
const VIDS_PER_SCREEN = 2.5;
const HEIGHT = Math.ceil(height / VIDS_PER_SCREEN);

export default class VideoCard extends Component {
  static defaultProps = {
    video: '',
    text: 'Hey',
    offset: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      anim: new Animated.Value(0)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.video !== this.props.video) return true;
    if (nextProps.text !== this.props.text) return true;
    if (nextProps.offset !== this.props.offset) return true;
    return false;
  }

  render() {
    let videoStyle = {
      transform: [{translateY: HEIGHT * 0.75 * -this.props.offset}]
    };

    let colors = [`rgba(0,0,0,0.1)`, `rgba(0,0,0,0.4)`];

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.videoWrapper, videoStyle]} onPress={(e) => {}}>
          <Video source={{uri: this.props.video}} // Can be a URL or a local file.
                     rate={1.0}                   // 0 is paused, 1 is normal.
                     volume={1.0}                 // 0 is muted, 1 is normal.
                     muted={true}                // Mutes the audio entirely.
                     paused={false}               // Pauses playback entirely.
                     resizeMode="cover"           // Fill the whole screen at aspect ratio.
                     repeat={true}                // Repeat forever.
                     playInBackground={false}     // Audio continues to play when app entering background.
                     playWhenInactive={false}     // [iOS] Video continues to play when control or notification center are shown.
                     onLoadStart={() => {
                     }} // Callback when video starts to load
                     onLoad={() => {
                     }}    // Callback when video loads
                     onProgress={() => {
                     }}    // Callback every ~250ms with currentTime
                     onEnd={() => {
                     }}           // Callback when playback finishes
                     onError={() => {
                     }}    // Callback when video cannot be loaded
                     style={styles.video}/>
        </Animated.View>
        <LinearGradient colors={colors} style={styles.gradient} />
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Baskerville-Regular',
    fontSize: 28,
    color: 'rgba(255,255,255,0.9)',
    backgroundColor: 'transparent',
    paddingHorizontal: width*0.2,
    textAlign: 'center'
  },
  gradient: {
    position: 'absolute',
    height: HEIGHT,
    width: width,
    top: 0,
    left: 0
  },
  container: {
    overflow: 'hidden',
    height: HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6
  },
  videoWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: HEIGHT
  },
  video: {
    width: width,
    height: HEIGHT * 2
  }
});
