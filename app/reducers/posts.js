import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
    posts: [],
    activePost: {},
    page: 1
}

export default function posts(state = initialState, action = {}) {
    var {payload} = action;
    switch (action.type) {
        case types.REQUEST_POST:
            return update(state, {
                page: {$set: payload.page}
            });
        case types.RECEIVE_POST:
            return update(state, {
                posts: {$apply: (posts) => {
                    if (payload.page === 1) {
                        return payload.posts;
                    } else {
                        return [...posts, ...payload.posts];
                    }
                }},
                page: {$set: payload.page}
            });
        case types.RECEIVE_SINGLE_POST:
            return update(state, {
                activePost: {$set: action.payload.post},
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
