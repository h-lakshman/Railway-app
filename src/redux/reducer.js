import { SET_CURRENT_PAGE, SET_AUTHENTICATED, SET_TRAINLIST, SET_REGISTERED } from './actionTypes';

const initialState = {
    currentPage: 'Home',
    isAuthenticated: false,
    trainList: [],
    isRegistered: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };
        case SET_AUTHENTICATED:
            return { ...state, isAuthenticated: action.payload };
        case SET_TRAINLIST:
            return { ...state, trainList: action.payload }
        case SET_REGISTERED:
            console.log(action.payload)
            return { ...state, isRegistered: action.payload }
        default:
            return state;
    }
};

export default reducer;
