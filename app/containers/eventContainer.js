import React from 'react-native';
import { bindActionCreators } from 'redux';
import * as eventActions from '../actions/eventActions';
import { connect } from 'react-redux';
import Event from '../components/event';

class EventContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { state, actions, navigator } = this.props;
        return (<Event event={state.event} navigator={navigator} {...actions}/>);
    }
}

export default connect(state => ({
        state: state.event
    }),
    (dispatch) => ({
        actions: bindActionCreators(eventActions, dispatch)
    })
)(EventContainer);