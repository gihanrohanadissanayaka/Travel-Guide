import * as api from '../api/index.js';
import { AUTH } from '../constants/actionTypes';

export const signIn = ( FormData, history ) => async (dispatch) => {

    try {
        const { data } = await api.signIn(FormData);
        dispatch({ type: AUTH, data});
        history.push('/');

    } catch (error) {
        const { response } = error;
        const { request, ...errorObject } = response;
        const errorMessage = errorObject.data.message;
        alert(errorMessage);
    }

}

export const signUp = ( FormData, history ) => async (dispatch) => {

    try {
        const { data } = await api.signUp(FormData);
        dispatch({ type: AUTH, data});
        history.push('/');

    } catch (error) {
        console.log(error);
    }

}