import { SET_CURRENT_PAGE, SET_AUTHENTICATED, SET_TRAINLIST, SET_REGISTERED } from './actionTypes';

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page,
});

export const setAuthenticated = (isAuthenticated) => ({
    type: SET_AUTHENTICATED,
    payload: isAuthenticated,
});

export const setTrainList = (trainList) => ({
    type: SET_TRAINLIST,
    payload: trainList,
})

export const setIsRegistered = (isRegistered) => ({
    type: SET_REGISTERED,
    payload: isRegistered
})