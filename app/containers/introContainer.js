import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import * as introActions from '../actions/introActions';
import { connect } from 'react-redux';
import Intro from '../components/intro';

class IntroContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { state, actions, navigator } = this.props;
        return (
            <Intro intro={state.intro} activeCabang={state.activeCabang} navigator={navigator} {...actions}/>
        )
    }
}

export default connect(state => ({
        state: {...state.intro, ...state.cabang}
    }),
    (dispatch) => ({
        actions: bindActionCreators(introActions, dispatch)
    })
)(IntroContainer);