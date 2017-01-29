import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Alert,
    ToolbarAndroid,
    ScrollView,
    Linking,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Switch,
    Picker
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'apsl-react-native-button';
import WebIntent from 'react-native-webintent';
import ActionButton from 'react-native-action-button';
import HTMLView from 'react-native-htmlview';
import MainStyles from '../styles/mainStyles';
import LinearGradient from 'react-native-linear-gradient';
import Toolbar from '../uikit/Toolbar';
import * as menuActions from '../actions/menuActions';

let styles = StyleSheet.create({
    heading: {
        fontSize: 28,
        fontFamily: 'Gotham-Black',
        color: '#000'
    },
    description: {
        fontSize: 13,
        color: '#777',
        lineHeight: 20,
        marginTop: 20
    },
    a: {
        fontWeight: '300',
        color: '#ff2561',
    },
});

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: false
        }
    }
    componentDidMount() {
        
    }
    render() {
        const { actions, navigator } = this.props;
        return (
            <View style={{flex: 1}}>
                <Toolbar
                    title={'Pengaturan'}
                    style={MainStyles.toolbar}
                    titleColor={'#fff'}
                    navIconName={'md-arrow-back'}
                    onIconClicked={() => this.props.navigator.pop()}
                    />
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <ScrollView>
                        <View style={{height: 60, flexDirection: 'row'}}>
                            <View style={{justifyContent: 'center', marginLeft: 20, flex: 1}}>
                                <Text style={{color: '#000'}}>Notifikasi</Text>
                            </View>
                            <View style={{width: 30, justifyContent: 'center', marginRight: 20, alignItems: 'flex-end'}}>
                                <Switch
                                    onValueChange={(value) => this.setState({notification: value})}
                                    value={this.state.notification} />
                            </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{justifyContent: 'center', marginLeft: 20, flex: 1}}>
                                <Text style={{color: '#000'}}>Ukuran Font</Text>
                            </View>
                            <View style={{width: 150, justifyContent: 'center', marginRight: 20, alignItems: 'flex-end'}}>
                                <Picker
                                    style={{backgroundColor: 'transparent', width: 150, color: '#000'}}
                                    selectedValue={this.props.menus.fontSize}
                                    onValueChange={(fontSize) => actions.menu.setFontSize(fontSize)}>
                                    <Picker.Item label="Kecil" value={10} />
                                    <Picker.Item label="Sedang" value={13} />
                                    <Picker.Item label="Besar" value={20} />
                                </Picker>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

SettingsPage = connect(state => ({
        menus: state.menus
    }),
    (dispatch) => ({
        actions: {
            menu: bindActionCreators(menuActions, dispatch),
        }
    })
)(SettingsPage);

export default SettingsPage;
