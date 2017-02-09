import React from 'react'

const SHOW_MODAL = 'SHOW_MODAL';
const SHOW_CONFIRM = 'SHOW_CONFIRM';
const SET_SUBMITTED_EGG = 'SET_SUBMITTED_EGG';

///Determine whether to show the AddNodeModal or not

const initialState = {
    showAddNodeModal: false,
    showConfirmationModal: false,
    submittedEgg: {}
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

export const setSubmittedEgg = function (eggObj) {
    return {
        type: SET_SUBMITTED_EGG,
        submittedEgg: eggObj
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
        case SET_SUBMITTED_EGG:
            newState.submittedEgg = action.submittedEgg;
            break;
        default:
            return state;
    }

    return newState;
}
