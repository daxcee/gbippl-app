import React, {Component} from 'react';
import {
	View,
	Text,
	Platform,
    TouchableOpacity
} from 'react-native';

import MainStyles from '../styles/mainStyles';
import Icon from 'react-native-vector-icons/Ionicons';
const {ToolbarAndroid} = Icon;


class ToolbarIOS extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={[MainStyles.toolbar, {alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20}]}>
                {this.props.navIconName ?
                    <TouchableOpacity onPress={this.props.onIconClicked}>
                        <View style={{marginRight: 10, justifyContent: 'center', alignItems: 'center', width: 50, height: 50, marginTop: 8, marginLeft: -20}}>
                            <Icon name={this.props.navIconName} size={27} color={'#fff'} />
                        </View>
                    </TouchableOpacity>
                    : null}

                <Text numberOfLines={1} style={MainStyles.toolbarText}>{this.props.title}</Text>
            </View>
        );
    }
}

if (Platform.OS == 'android') {
    module.exports = ToolbarAndroid;
} else {
    module.exports = ToolbarIOS;
}