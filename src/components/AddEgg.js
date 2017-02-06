import React, {Component} from 'react';
import {Text, View, Modal, TextInput, StyleSheet, Image, Picker} from 'react-native';
import { Icon } from 'react-native-elements'
import {CardSection} from './common/CardSection';
import {Button} from './common/Button';
import {Input} from './common/Input';
import { connect } from 'react-redux';
import axios from 'axios';
import {showModal} from '../reducers/addNodeModal';
import {setAnnotation, clearAnnotation} from '../reducers/map';
import { tunnelIP } from '../TUNNELIP';


class AddEgg extends Component {
    constructor(props){
        super(props);

        this.state = {
            text: '',
            payloadText: '',
            payloadImage: '',
            payloadImageSource: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
            payloadImageBuffer: null,
            goHereImageSource: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
            goHereImageBuffer: null,
            eggs: [],
            recipient: this.props.friends[0].fbId}
        ;

        this.handleInputChange=this.handleInputChange.bind(this);
        this.onSubmitNode = this.onSubmitNode.bind(this);
        this.onCancelSubmitNode = this.onCancelSubmitNode.bind(this);
        this.showImagePicker = this.showImagePicker.bind(this);

    }


    onSubmitNode() {
        const egg = {
            goHereImage: this.state.goHereImageSource,
            goHereText: this.state.text,
            goHereImageBuffer: this.state.goHereImageBuffer,
            latitude: this.props.annotation[0].latitude,
            longitude: this.props.annotation[0].longitude,
            payloadText: this.state.payloadText,
            payloadImage: this.state.payloadImageSource,
            payloadImageBuffer: this.state.payloadImageBuffer,
            senderId: this.props.senderId,
            recipient: this.state.recipient
        }

        axios.post(`${tunnelIP}/api/egg`, egg)
            .then(()=>{
                this.setState({ text:'', payloadText: '', goHereText: '', recipient:this.props.friends[0].fbId});
                this.props.showModal(false);
                this.props.clearAnnotation();
            })
            .catch(err => console.log('AddEgg onSubmitNode error', err))

    }

    onCancelSubmitNode() {
        this.setState({ text:'', payloadText: '', goHereText: '', recipient:this.props.friends[0]});
        this.props.showModal(false);
        this.props.clearAnnotation();
    }

    selectImageForPicker(type){
        if(type == 'clue'){
            this.showImagePicker('clue');
        }
        else {
            this.showImagePicker('pay');
        }
    }

    showImagePicker(type){

        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
            quality: 1,
            maxWidth: 125,
            maxHeight: 125,
        };

        const ImagePicker = require('react-native-image-picker');
        // const Platform = require('react-native').Platform;
        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            let goSource, goBuffer, paySource, payBuffer;

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                if(type === 'clue'){
                    // display the image using either data...
                    goSource = { uri: 'data:image/jpeg;base64,' + response.data };
                    goBuffer = response.data;

                    this.setState({
                        goHereImageSource: goSource,
                        goHereImageBuffer: goBuffer
                    });  
                }
                else if(type === 'pay') {
                    // display the image using either data...
                    paySource = { uri: 'data:image/jpeg;base64,' + response.data };
                    payBuffer = response.data;

                    this.setState({
                        payloadImageSource: paySource,
                        payloadImageBuffer: payBuffer
                    });  
                }
            }
        });
    }

    handleInputChange(field, e){
        this.setState({ [field]: e });
    }


    render(){
        const { containerStyle, textStyle, cardSectionStyle} = styles;
        return (
            <View style={containerStyle}>
                <CardSection>
                    <Icon
                        name='ios-camera-outline'
                        type= 'ionicon'
                        color='#f50'
                        // onPress={this.showImagePicker}
                        onPress={() => {this.selectImageForPicker('clue')} }
                    />
                    <Input
                        placeholder="GoHere Text"
                        onChangeText={e => this.handleInputChange('text', e)}
                        value={this.state.text}
                    />
                    <Image source={this.state.goHereImageSource} style={{width: 50, height: 50}} />
                </CardSection>

                <CardSection>
                    <Icon
                        name='ios-camera'
                        type= 'ionicon'
                        color='#f50'
                        onPress={() => this.selectImageForPicker('payload')}
                    />
                    <Input
                        placeholder="Payload Text"
                        onChangeText={e => this.handleInputChange('payloadText', e)}
                        value={this.state.payloadText}
                    />
                    <Image source={this.state.payloadImageSource} style={{width: 50, height: 50}} />
                </CardSection>

                <CardSection>
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.recipient}
                        onValueChange={(friend) => this.setState({recipient: friend})}>
                        { this.props.friends.map((friend) => {
                                return(
                                    <Picker.Item label={friend.name} value={friend.fbId} />
                                )
                            }
                        )}
                    </Picker>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onSubmitNode}>Submit</Button>
                    <Button onPress={this.onCancelSubmitNode}>Cancel</Button>
                </CardSection>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    cardSectionStyle: {
        justifyContent: 'center',
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    picker: {
        flex: 1,
    },
});


const mapStateToProps = (state, ownProps) => {
    return {
        showAddNodeModal: state.addNodeModal.showAddNodeModal,
        annotation: state.map.annotation,
        senderId: state.auth.fbId,
        friends: state.friends.allFriends,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showModal: function(boolean){
            dispatch(showModal(boolean));
        },
        setAnnotation: function(annotation){
            dispatch(setAnnotation(annotation))
        },
        clearAnnotation: function(){
            dispatch(clearAnnotation())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEgg);
