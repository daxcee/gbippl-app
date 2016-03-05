import React from 'react-native';
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
                activeMenu={state.activeMenu}
                menus={state.menus[type]} 
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
        state: state.menus
    }),
    (dispatch) => ({
        actions: bindActionCreators(menuActions, dispatch)
    })
)(MenuContainer);