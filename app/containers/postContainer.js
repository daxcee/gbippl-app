import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import * as postActions from '../actions/postActions';
import { connect } from 'react-redux';
import Post from '../components/post';

class PostContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { state, actions, navigator, active, post } = this.props;
        const Component = this.props.component;
        return (
            <Component 
                posts={state.posts}
                pinned={state.pinned}
                appSettings={state.appSettings}
                page={state.page}
                activePost={state.activePost}
                active={active}
                navigator={navigator}
                {...actions} />
        );
    }
}

PostContainer.defaultProps = {
    component: Post
};

export default connect(state => ({
        state: state.posts
    }),
    (dispatch) => ({
        actions: bindActionCreators(postActions, dispatch)
    })
)(PostContainer);
