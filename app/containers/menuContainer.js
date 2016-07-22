import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import * as menuActions from '../actions/menuActions';
import { connect } from 'react-redux';
import Menu from '../components/menu';

class MenuContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { state, actions, navigator, active, menu, type } = this.props;
        const Component = this.props.component;
        return (
            <Component
                type={type}
                activePage={state.activePage}
                activeCabang={state.activeCabang}
                active={active}
                navigator={navigator}
                {...actions} />
        );
    }
}

MenuContainer.defaultProps = {
    type: 'profil',
    component: Menu
}

export default connect(state => ({
        state: {...state.menus, ...state.cabang}
    }),
    (dispatch) => ({
        actions: bindActionCreators(menuActions, dispatch)
    })
)(MenuContainer);
