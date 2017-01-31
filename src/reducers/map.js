import React from 'react';

const SET_ANNOTATIONS = 'SET_ANNOTATIONS';
const CLEAR_ANNOTATIONS = 'CLEAR_ANNOTATIONS';

const initialState = {
    annotations: []
}

//Action
export const setAnnotations = function (annotations) {
    return {
        type: SET_ANNOTATIONS,
        annotations: annotations
    };
};

export const clearAnnotations = function () {
    return {
        type: CLEAR_ANNOTATIONS
    };
};



/// Reducer
export default function (state = initialState, action) {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case SET_ANNOTATIONS:
            // Is annotations a list? [].concat(action.annotations) maybe?
            newState.annotations = [action.annotations];
            break;
        case CLEAR_ANNOTATIONS:
            newState.annotations = [];
            break;
        default:
            return state;
    }

    return newState;
}
