import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import * as pekaActions from '../actions/pekaActions';
import * as postActions from '../actions/postActions';
import { connect } from 'react-redux';
import Peka from '../components/peka';

class PekaContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { state, actions, navigator, active } = this.props;
        return (<Peka 
            peka={state.peka} 
            page={state.page} 
            pinned={state.pinned}
            active={active}
            navigator={navigator} 
            isAll={state.isAll} {...actions}/>);
    }
}

export default connect(state => ({
        state: state.peka
    }),
    (dispatch) => ({
        actions: bindActionCreators(Object.assign({}, pekaActions, postActions), dispatch)
    })
)(PekaContainer);
