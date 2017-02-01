import React, {Component} from 'react';
import {Text, View, Modal, TextInput, StyleSheet, Image} from 'react-native';
import {CardSection} from './common/CardSection';
import {Button} from './common/Button';
import {Input} from './common/Input';
import { connect } from 'react-redux';
import axios from 'axios';
import {showModal} from '../reducers/addNodeModal';
import {setAnnotations, clearAnnotations} from '../reducers/map';
import { tunnelIP } from '../TUNNELIP';



class AddEgg extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: 'placeholder',
            goHereImageSource: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
            goHereImageBuffer: null,
            eggs: [],
        };

        this.handleInputChange=this.handleInputChange.bind(this);
        this.clearInput=this.clearInput.bind(this);
        this.onSubmitNode = this.onSubmitNode.bind(this);
        this.onCancelSubmitNode = this.onCancelSubmitNode.bind(this);
        this.showImagePicker = this.showImagePicker.bind(this);

    }


    handleInputChange(e){
        this.setState({text: e });
    }

    clearInput(){
        this.setState({text:''});
    }

    onSubmitNode() {

        const egg = {
            goHereText: this.state.text,
            goHereImage: this.state.goHereImageSource,
            goHereImageBuffer: this.state.goHereImageBuffer,
            latitude: this.props.annotations[0].latitude,
            longitude: this.props.annotations[0].longitude,
            payloadType: 'Text',
            payload: 'Hey everybody'
        }

        axios.post(`${tunnelIP}/api/egg`, egg)
            .then(()=>{
                this.setState({ text:'placeholder' });
                this.props.showModal(false);
                this.props.clearAnnotations();
            })
            .catch(err => console.log('AddEgg onSubmitNode error', err))

    }

    onCancelSubmitNode() {
        this.setState({ text:'placeholder' });
        this.props.showModal(false);
        this.props.clearAnnotations();
    }

    showImagePicker(){
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
        const Platform = require('react-native').Platform;
        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            // else if (response.customButton) {
            //     console.log('User tapped custom button: ', response.customButton);
            // }
            else {
                let source;
                let buffer;

                // display the image using either data...
                source = { uri: 'data:image/jpeg;base64,' + response.data };
                buffer = response.data;

                // ...or a reference to the platform specific asset location
                if (Platform.OS === 'android') {
                    source = { uri: response.uri };
                } else {
                    source = { uri: response.uri.replace('file://', '') };
                }

                this.setState({
                    goHereImageSource: source,
                    goHereImageBuffer: buffer
                });
            }
        });


    }



    render(){
        const { containerStyle, textStyle, cardSectionStyle} = styles;

        return (
            <View style={containerStyle}>
                <CardSection>
                    <Input
                        label="GoHere Image"
                        value='Click here to change the GoHere Image'
                        onFocus={this.showImagePicker}
                    />
                </CardSection>
                <CardSection>
                    <Image source={this.state.goHereImageSource} style={{width: 50, height: 50}}  />
                </CardSection>
                <CardSection>
                    <Input
                        label="GoHere Text"
                        onChangeText={e => this.handleInputChange(e)}
                        value={this.state.text}
                        onFocus={this.clearInput}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Payload Type"
                        onChangeText={e => this.handleInputChange(e)}
                        value={this.state.text}
                        onFocus={this.clearInput}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Payload"
                        onChangeText={e => this.handleInputChange(e)}
                        value={this.state.text}
                        onFocus={this.clearInput}
                    />
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
        justifyContent: 'center'
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
        justifyContent: 'center'
    },
});




const mapStateToProps = (state, ownProps) => {
    return {
        showAddNodeModal: state.addNodeModal.showAddNodeModal,
        annotations: state.map.annotations
    };
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showModal: function(boolean){
            dispatch(showModal(boolean));
        },
        setAnnotations: function(annotations){
            dispatch(setAnnotations(annotations))
        },
        clearAnnotations: function(){
            dispatch(clearAnnotations())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEgg);
