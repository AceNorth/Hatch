import React from 'react';

const SET_ANNOTATION = 'SET_ANNOTATION';
const CLEAR_ANNOTATION = 'CLEAR_ANNOTATION';

const initialState = {
    annotation: []
}

//Action
export const setAnnotation = function (annotation) {
    return {
        type: SET_ANNOTATION,
        annotation: annotation
    };
};

export const clearAnnotation = function () {
    return {
        type: CLEAR_ANNOTATION
    };
};



/// Reducer
export default function (state = initialState, action) {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case SET_ANNOTATION:
            newState.annotation = [action.annotation];
            break;
        case CLEAR_ANNOTATION:
            newState.annotation = [];
            break;
        default:
            return state;
    }

    return newState;
}
