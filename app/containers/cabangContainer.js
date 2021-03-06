import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import * as cabangActions from '../actions/cabangActions';
import { connect } from 'react-redux';
import Cabang from '../components/cabang';

class CabangContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { state, actions, navigator, active } = this.props;
        return (<Cabang cabang={state.cabang} active={active} navigator={navigator} {...actions}/>);
    }
}

export default connect(state => ({
        state: state.cabang
    }),
    (dispatch) => ({
        actions: bindActionCreators(cabangActions, dispatch)
    })
)(CabangContainer);
