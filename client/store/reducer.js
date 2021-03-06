import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunks from 'redux-thunk';

import { LOGIN, LOGOUT, LOGIN_FAIL, LOADING, LOADED, GET_PRODUCTS, ADD_TO_CART, types } from './actions';

const initialUserState = {
    username: null,
    loggedIn: false,
    message: ''
}

const loginReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                username: action.username,
                loggedIn: true
            };
        case LOGOUT:
            return {
                ...state,
                username: null,
                loggedIn: false
            };
        case LOGIN_FAIL: {
            return {
                username: null,
                loggedIn: false,
                message: action.message
            }
        }
        default:
            return state;
    }
}

const loadingReducer = (state = true, action) => {
    switch (action.type) {
        case LOADING:
            return true
        case LOADED:
            return false
        default:
            return state;
    }
}

const productsReducer = (state = [], action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return action.products;
        case types.ADD_PRODUCT:
            return {
                ...state,
                products: action.payload
            }
        default:
            return state;
    }
}

const categoriesReducer = (state = [], action) => {
    switch (action.type) {
        case types.ADD_CATEGORY:
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state;
    }
}

const cartReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return action.cart;
        default:
            return state;
    }
}


const reducer = combineReducers({
    user: loginReducer,
    loading: loadingReducer,
    products: productsReducer,
    cart: cartReducer,
    categories: categoriesReducer
});


const store = createStore(reducer, applyMiddleware(
    thunks
));


export default store;