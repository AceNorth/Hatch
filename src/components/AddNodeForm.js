import React, { Component } from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './common/CardSection';
import { Button } from './common/Button';
import { Actions } from 'react-native-router-flux'

export default class AddNodeForm extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible
        }
        this.children = props.children;
        this.onSubmit = this.onSubmit.bind(this);
    }


    onSubmit() {
        console.log("THIS IS: ", this)
        console.log("nice submission");
        this.setState({visible: false})
    };

    onCancel() {
        console.log("nice cancel");
        this.visible = false;
    };

    render() {
        console.log("PROPS: ", this.props);
        return (
            <Modal
                visible={this.state.visible}
                transparent
                animationType="slide"
                onRequestClose={() => {}}
            >
                <View style={styles.containerStyle}>
                    <CardSection style={styles.cardSectionStyle}>
                        <Text style={styles.textStyle}>
                            {this.children}
                        </Text>
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.onSubmit}>Submit</Button>
                        <Button onPress={this.onCancel}>Cancel</Button>
                    </CardSection>
                </View>
            </Modal>
        );
    };
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
    }
};

