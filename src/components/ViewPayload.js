import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Card, CardSection } from './common';
import axios from 'axios';

const ViewPayload = (props) => {
	return (
		<Card>
			<CardSection style={{flex: 1}}>
				<Text style={{fontSize: 55, paddingTop: 50}}> Here's your message! </Text>
			</CardSection>
			<CardSection>
				<Text> { props.selectedEgg.payload } </Text>
			</CardSection>
		</Card>
	);
};

const mapStateToProps = (state, ownProps) => {
	const selectedEgg = state.eggs.selectedEgg;
    return { selectedEgg };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPayload);