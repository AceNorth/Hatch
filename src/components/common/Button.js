import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
	const {onPress, children} = props;
	const {buttonStyle, textStyle} = styles;
	return (
		<TouchableOpacity style={buttonStyle} onPress={onPress}>
			<Text style={textStyle}>
				{children}
			</Text>
		</TouchableOpacity>
		);
};

// How would we perform sweeping styling changes to accomodate a new theme?
// Would we need to modify every component? Just something to ponder.
// Also, how much styling is shared across files? Do any react libraries provide a better solution?
const styles = {
	buttonStyle: {
	//expand to fill as much content as it possibly can
		// flex: 1,
	//position itself using flexbox rules (stretch to fill the container)
		alignSelf: 'stretch',
		backgroundColor: '#fff',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#007aff',
		marginLeft: 5,
		marginRight: 5
	},
	textStyle: {
		alignSelf: 'center',
		color: '#007aff',
		fontSize: 16,
		fontWeight: '600',
		paddingTop: 10,
		paddingBottom: 10
	}
}

export { Button };