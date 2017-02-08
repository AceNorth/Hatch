import React from 'react'

const SHOW_MODAL = 'SHOW_MODAL';
const SHOW_CONFIRM = 'SHOW_CONFIRM';

///Determine whether to show the AddNodeModal or not

const initialState = {
    showAddNodeModal: false,
    showConfirmationModal: false
}

//Action
export const showModal = function (boolean) {
    return {
        type: SHOW_MODAL,
        showAddNodeModal: boolean
    };
};

export const showConfirm = function (boolean) {
    return {
        type: SHOW_CONFIRM,
        showConfirmationModal: boolean
    };
};



/// Reducer
export default function (state = initialState, action) {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case SHOW_MODAL:
            newState.showAddNodeModal = action.showAddNodeModal;
            break;
        case SHOW_CONFIRM:
            newState.showConfirmationModal = action.showConfirmationModal;
            break;
        default:
            return state;
    }

    return newState;
}
