"use strict";

import React, {Component} from 'react';

import {Dimensions, ScrollView, StyleSheet, View, Text} from 'react-native';

import TopNav from './components/TopNav';
import VideoCard from './components/VideoCard';

let {width, height} = Dimensions.get('window');
const VIDS_PER_SCREEN = 2.5;
const HEIGHT = Math.ceil(height / VIDS_PER_SCREEN);
const SCROLL_FPS = Math.round(1000/30); //30 fps

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoScroll: {
    backgroundColor: '#000',
    width: width,
    height: height
  },
  page: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pageText: {
    color: '#fff',
    fontSize: 36
  }
});

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
      offset: 0,
      page: 0,
      pageTransition: 0
    };
  }

  onVideoScroll(e) {
    let cardSize = e.nativeEvent.contentSize.height/HEIGHT;

    //e.nativeEvent.contentOffset.y - Math.floor(e.nativeEvent.contentOffset.y / cardSize);
    this.setState({offset: e.nativeEvent.contentOffset.y/e.nativeEvent.contentSize.height});
  }

  onNavScroll(e) {
    if ((e.nativeEvent.contentOffset.x % width) === 0) {
      let newPage = e.nativeEvent.contentOffset.x / width;

      if (this.state.page !== newPage) {

        this.setState({
          page: newPage
        });
      }
    }

    this.setState({
      pageTransition: e.nativeEvent.contentOffset.x / width
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}
                    pagingEnabled={true}
                    scrollEventThrottle={SCROLL_FPS}
                    onScroll={(e) => this.onNavScroll(e)}>
          <ScrollView
            style={styles.videoScroll}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={SCROLL_FPS}
            onScroll={(e) => this.onVideoScroll(e)}>
            {videos.map((data, i) => <VideoCard key={i} video={data.video} text={data.text} offset={this.state.offset}/>)}
          </ScrollView>
          <View style={[styles.page, {backgroundColor: 'red'}]}>
            <Text style={styles.pageText}>Red Page</Text>
          </View>
          <View style={[styles.page, {backgroundColor: 'green'}]}>
            <Text style={styles.pageText}>Green Page</Text>
          </View>
          <View style={[styles.page, {backgroundColor: 'blue'}]}>
            <Text style={styles.pageText}>Blue Page</Text>
          </View>
        </ScrollView>
        <TopNav page={this.state.page} pageTransition={this.state.pageTransition}/>
      </View>
    );
  }
}