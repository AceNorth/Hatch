import React, {Component} from 'react';
import {Text, View, Modal, TextInput} from 'react-native';
import {CardSection} from './common/CardSection';
import {Button} from './common/Button';
import {Input} from './common/Input';

export default function AddNodeForm (props){
    console.log('addNodeForm props', props)
    const { containerStyle, textStyle, cardSectionStyle} = styles;

    return (
        <Modal
            visible={props.visible}
            transparent
            animationType="fade"
            onRequestClose={() => {}}
        >
            <View style={containerStyle}>
                <CardSection>
                    <Input
                        label="Directions to your new Egg"
                        onChangeText={e => props.handleInputChange(e)}
                        value={props.text}
                        onFocus={props.clearInput}
                    />
                </CardSection>
                <CardSection>
                    <Button onPress={props.onSubmitNode}>Submit</Button>
                    <Button onPress={props.onCancelSubmitNode}>Cancel</Button>
                </CardSection>
            </View>
        </Modal>
    )
}


const styles = {
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
};


