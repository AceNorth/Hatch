import React from 'react';
import axios from 'axios';
import { tunnelIP } from '../TUNNELIP';

/* --------------    ACTION CONSTANTS    ---------------- */

const ADD_EGG = 'ADD_EGG';
const SELECT_EGG = 'SELECT_EGG';

/* --------------    ACTION CREATORS    ----------------- */

const selectEgg = egg => ({ type: SELECT_EGG, egg });

/* ------------------    REDUCER    --------------------- */

const initialState = {
    allEggs: [],
    selectedEgg: {},
}

export default function (state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case ADD_EGG:
            newState.allEggs = [...newState.allEggs, action.egg];
            break;
        case SELECT_EGG:
            newState.selectedEgg = action.egg;
            break;
        default:
            return state;
    }

    return newState;
}

/* --------------    THUNKS/DISPATCHERS    -------------- */
export const setSelectedEgg = eggId => dispatch => {
  axios.get(`${tunnelIP}/api/egg/${eggId}`)
  .then(res => dispatch(selectEgg(res.data)))
  .catch(err => console.error('Problem fetching egg', err));
};
