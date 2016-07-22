import React, {Component} from 'react';
import {
    View,
    Text,
    Platform
} from 'react-native';
import MainStyles from '../styles/mainStyles';
import Icon from 'react-native-vector-icons/Ionicons';
const {ToolbarAndroid} = Icon;

class Header extends Component {
    render() {
        if (Platform.OS === 'android') {
            return (
                <ToolbarAndroid
                    title={this.props.title}
                    style={MainStyles.toolbar}
                    titleColor={'#fff'}
                    navIconName={!this.props.noBack ? 'md-menu' : null}
                    onIconClicked={() => this.props.navigator.pop()}
                    />
            );
        } else {
            return (
                <View style={[MainStyles.toolbar, {alignItems: 'center', justifyContent: 'center'}]}>
                    <Text numberOfLines={1} style={MainStyles.toolbarText}>{this.props.title}</Text>
                </View>
            );
        }
    }
}

export default Header;