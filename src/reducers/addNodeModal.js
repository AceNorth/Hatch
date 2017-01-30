import React from 'react'

const SHOW_MODAL = 'SHOW_MODAL';

///Determine whether to show the AddNodeModal or not

const initialState = {
    showAddNodeModal: false,
}

//Action
export const showModal = function (boolean) {
    return {
        type: SHOW_MODAL,
        showAddNodeModal: boolean
    };
};



/// Reducer
export default function (state = initialState, action) {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case SHOW_MODAL:
            newState.showAddNodeModal = action.showAddNodeModal;
            break;
        default:
            return state;
    }

    return newState;
}
