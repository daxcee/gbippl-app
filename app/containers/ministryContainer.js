import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import * as ministryActions from '../actions/ministryActions';
import { connect } from 'react-redux';
import Ministry from '../components/ministry';

class MinistryContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { state, actions, navigator, active } = this.props;
        return (<Ministry ministry={state.ministry} page={state.page} active={active} navigator={navigator} {...actions}/>);
    }
}

export default connect(state => ({
        state: state.ministry
    }),
    (dispatch) => ({
        actions: bindActionCreators(ministryActions, dispatch)
    })
)(MinistryContainer);
