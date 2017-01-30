import React, {Component} from 'react';
import {Text, View, Modal, TextInput, StyleSheet} from 'react-native';
import {CardSection} from './common/CardSection';
import {Button} from './common/Button';
import {Input} from './common/Input';
import { connect } from 'react-redux';
import axios from 'axios';
import {showModal} from '../reducers/addNodeModal'
import {setAnnotations, addAnnotation} from '../reducers/map'


class AddNodeForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: 'placeholder'
        };

        this.handleInputChange=this.handleInputChange.bind(this);
        this.clearInput=this.clearInput.bind(this);
        this.onSubmitNode = this.onSubmitNode.bind(this);
        this.onCancelSubmitNode = this.onCancelSubmitNode.bind(this);
    }


    handleInputChange(e){
        this.setState({text: e });
    }

    clearInput(){
        this.setState({text:''});
    }

    onSubmitNode() {
        console.log("submitted");
        //send data to DB
        const egg = {
            goHereText: this.state.text,
            latitude: this.props.annotations[0].latitude,
            longitude: this.props.annotations[0].longitude
        }
        axios.post('http://localhost:1333/api/egg', egg)
            .then(()=>{
                this.setState({ text:'placeholder' });
                this.props.showModal(false);
                //this line below causes the app to crash, possibly an async issue with the axios post above
                // this.props.setAnnotations([]);
            })


    }

    onCancelSubmitNode() {
        this.setState({ text:'placeholder' });
        this.props.showModal(false);

    }

    render(){
        const { containerStyle, textStyle, cardSectionStyle} = styles;

        return (
            <View style={containerStyle}>
                <CardSection>
                    <Input
                        label="Directions to your new Egg"
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
        addAnnotation: function(annotation){
            dispatch(addAnnotation(annotation))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNodeForm);
