import React, {Component} from 'react';
import {Text, View, Modal, TextInput} from 'react-native';
import {CardSection} from './common/CardSection';
import {Button} from './common/Button';

export default class AddNodeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "useless placeholder"
        };
    }


    render() {
        const { containerStyle, textStyle, cardSectionStyle, inputStyle } = styles;

        return (
            <Modal
                visible={this.props.visible}
                transparent
                animationType="slide"
                onRequestClose={() => {
                }}
            >
                <View style={containerStyle}>
                    <CardSection style={cardSectionStyle}>
                        <Text style={textStyle}>
                            {this.props.children}
                        </Text>
                    </CardSection>
                    <TextInput
                        style={inputStyle}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                    />

                    <CardSection>
                        <Button onPress={this.props.onSubmitNode}>Submit</Button>
                        <Button onPress={this.props.onCancelSubmitNode}>Cancel</Button>
                    </CardSection>
                </View>
            </Modal>
        );
    }

};

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
    inputStyle:{
        height: 40,
        borderColor: 'gray',
        backgroundColor:'white',
        borderWidth: 1
    }
};



