"use strict";

import React, {Component} from 'react';

import {ScrollView, StyleSheet, View, Text} from 'react-native';

import VideoCard from './components/VideoCard';

let videos = [
  {
    video: "assets/vids/empty-lake",
    text: 'Introduction'
  },
  {
    video: "assets/vids/clip3",
    text: 'The Human Signature'
  },
  {
    video: "assets/vids/clip7",
    text: 'The Human Signature Continued'
  },
  {
    video: "assets/vids/clip13",
    text: 'This Project'
  },
  {
    video: "assets/vids/water",
    text: 'The Anthropocene'
  },
  {
    video: "assets/vids/clip5",
    text: 'Test Video Text'
  }
];

export default class Anthropocene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      offset: 0
    }
  }

  onScroll(e) {
    this.setState({offset: e.nativeEvent.contentOffset.y/e.nativeEvent.contentSize.height});
  }

  render() {
    return (
      <ScrollView
        style={{backgroundColor: '#000'}}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={32}
        onScroll={(e) => this.onScroll(e)}>
        {videos.map((data, i) => <VideoCard key={i} video={data.video} text={data.text} offset={this.state.offset}/>)}
      </ScrollView>
    );
  }
}