import React from 'react'

const SET_ANNOTATIONS = 'SET_ANNOTATIONS';
const ADD_ANNOTATION = 'ADD_ANNOTATION';


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

export const addAnnotation = function (annotation) {
    return {
        type: ADD_ANNOTATION,
        annotation: annotation
    };
};



/// Reducer
export default function (state = initialState, action) {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case SET_ANNOTATIONS:
            newState.annotations = [action.annotations];
            break;
        case ADD_ANNOTATION:
            newState.annotations = [...newState.annotations, action.annotation];
            break;
        default:
            return state;
    }

    return newState;
}
