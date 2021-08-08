import * as api from '../api';
import { FETCH_ALL, FETCH_POST, DELETE, UPDATE, CREATE, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from '../constants/actionTypes';

export const getPosts = ( page ) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts( page );
        //console.log( data )
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPost = ( id ) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchPost( id );
        //console.log( data )
        dispatch({ type: FETCH_POST, payload: { post: data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

/*export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        console.log("data03");
        dispatch({ type: START_LOADING });
        //////////////////////////////// ok
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        console.log("data01");
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        //console.log(data);
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
        console.log("data02");
    }
};*/

export const getRelevent = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchRelevent(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        //console.log( data );
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}
//      const { data : data } = await api.fetchRelevent(searchQuery);

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

 export const updatePost = (id, post) => async (dispatch) => {
     try {
         const { data } = await api.updatePost(id, post);
         dispatch({ type: UPDATE, payload: data }); 
     } catch (error) {
         console.log(error.message);
     }
 }

 export const deletePost = (id) => async (dispatch) => {
     try {
         await api.deletePost(id);
         dispatch({ type: DELETE, payload: id});

     } catch (error) {
         console.log(error);
     }
 }

 export const likePost = (id) => async (dispatch) => {
     try {
         const {data} = await api.likePost(id);
         dispatch({ type: UPDATE, payload: data });

     } catch (error) {
         console.log(error);
     }
 }