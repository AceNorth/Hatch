import React from 'react'

const ADD_EGG = 'ADD_EGG';

const initialState = {
    allEggs: [],
    selectedEgg: {},
}


export default function (state = initialState, action) {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case ADD_EGG:
            newState.allEggs = [...newState.allEggs, action.egg];
            break;
        default:
            return state;
    }

    return newState;
}
