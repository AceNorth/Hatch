import React from 'react'

const ADD_MESSAGE = 'ADD_MESSAGE';

const initialState = {
    allMessages: [],
}


export default function (state = initialState, action) {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case ADD_MESSAGE:
            newState.allMessages = [...newState.allMessages, action.message];
            break;
        default:
            return state;
    }

    return newState;
}
