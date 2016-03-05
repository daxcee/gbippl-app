import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
    posts: [],
    activePost: {}
}

export default function posts(state = initialState, action = {}) {
    switch (action.type) {
        case types.REQUEST_POST:
            return state;
        case types.RECEIVE_POST:
            return update(state, {
                posts: {$set: action.payload.posts}
            });
        case types.RECEIVE_SINGLE_POST:
            return update(state, {
                posts: {$apply: (posts) => {
                    return posts.map((post) => {
                        if (post.id === action.payload.post.id) {
                            return Object.assign(post, action.payload.post);
                        }
                        return post;
                    });
                }}
            });
        case types.CHANGE_ACTIVE_POST:
            return update(state, {
                activePost: {$set: state.posts.filter((post) => post.id === action.payload.id)[0] || {}}
            });
        default:
            return state;
    }
}