import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { Card, CardSection } from './common';
import axios from 'axios';
import tunnelIP from '../TUNNELIP';

class ViewPayload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewEgg: props.allEggs[props.selectedEgg]
    }

  }

  renderPayloadView() {
    let payloadType = this.state.viewEgg.payloadType;
    
    switch (payloadType) {
      // conditional render for different payloads
      case 'Text':
        return (<Text>{ this.state.viewEgg.payload.text }</Text>)
      case 'Image':
        //change this to image
        //render from DB
        return (<Text>{ this.state.viewEgg.payload.path }</Text>)
      case 'Video':
        return (
          <Video source={{uri: `${tunnelIP}/exampleVideo.mov`}}   // Can be a URL or a local file.
       ref={(ref) => {
         this.player = ref
       }}                             
       // Store reference
       rate={1.0}                     
       // 0 is paused, 1 is normal.
       volume={1.0}                   
       // 0 is muted, 1 is normal.
       muted={false}                  
       // Mutes the audio entirely.
       paused={false}                 
       // Pauses playback entirely.
       resizeMode="cover"             
       // Fill the whole screen at aspect ratio.
       repeat={true}                  
       // Repeat forever.
       playInBackground={false}       
       // Audio continues to play when app entering background.
       playWhenInactive={false}       
       // [iOS] Video continues to play when control or notification center are shown.
       progressUpdateInterval={250.0} 
       // [iOS] Interval to fire onProgress (default to ~250ms)
       onLoadStart={this.loadStart}   
       // Callback when video starts to load
       onLoad={this.setDuration}      
       // Callback when video loads
       onProgress={this.setTime}      
       // Callback every ~250ms with currentTime
       onEnd={this.onEnd}             
       // Callback when playback finishes
       onError={this.videoError}      
       // Callback when video cannot be loaded
       onBuffer={this.onBuffer} 
       // Callback when remote video is buffering
       style={styles.exampleVideo} />
          )
      default:
        return (<Text>Something has GONE WRONG</Text>)
    }
  }

  render() {

    return (
      <Card>
        <CardSection style={{flex: 1}}>
          <Text style={{fontSize: 30, paddingTop: 50}}> Here's your message! </Text>
        </CardSection>
        <CardSection>
          { this.renderPayloadView() }
        </CardSection>
      </Card>
    );
  };
}

const styles = StyleSheet.create({
  exampleVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

const mapStateToProps = (state, ownProps) => {
  const selectedEgg = state.eggs.selectedEgg;
  const allEggs = state.eggs.allEggs;
    return { selectedEgg, allEggs };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPayload);