import React, {Component} from 'react';
import {
    View,
    Text,
    Linking,
    TouchableOpacity,
    StyleSheet,
    Platform,
    ScrollView,
    Image,
    ToolbarAndroid,
    WebView
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as menuActions from '../actions/menuActions';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import Button from 'apsl-react-native-button';
import ActionButton from 'react-native-action-button';
import MainStyles from '../styles/mainStyles';
import RowStyles from '../styles/rowStyles';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../styles/colors';
import Toolbar from '../uikit/Toolbar';

class InfoPage extends Component {
    componentDidMount() {
        
    }
    onDirection() {
        var {state} = this.props;
        var cabang = state.activeCabang || {};
        Linking.openURL(`http://maps.google.com/maps?q=loc:${cabang.lat},${cabang.lng} (${cabang.name})`).catch(err => console.error('An error occurred', err));
    }
    render() {
        var {state, menus} = this.props;
        var content = `
        <style>
            body, html {
                font-family: "Arial", Serif, Sans-Serif;
                margin: 0;
                padding: 0;
                font-size: ${menus.fontSize}px;
            }
        </style>
        <div style="height: 180px; background: url(${state.activeCabang.image}) no-repeat; background-size: cover; background-position: center center"></div>
        <div style="padding: 10px">
            ${state.activeCabang.content || ''}
            <br/>
            ${state.activeCabang.address}
        </div>`;
        return (
            <View style={{flex: 1}}>
                <Toolbar
                    title={state.activeCabang.name}
                    style={MainStyles.toolbar}
                    titleColor={'#fff'}
                    navIconName={'md-arrow-back'}
                    onIconClicked={() => this.props.navigator.pop()}
                    />
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <WebView
                        style={{flex: 1}}
                        source={{html: content}}
                        />
                </View>
                <ActionButton
                    buttonColor={colors.orange}
                    icon={<Icon name="md-compass" size={24} color="#fff"/>}
                    onPress={this.onDirection.bind(this)}
                />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    heading: {
        fontSize: 28,
        color: '#000'
    },
    address: {
        fontSize: 13,
        color: '#777',
        marginBottom: 12
    }
});

InfoPage = connect(state => ({
        state: state.cabang,
        menus: state.menus
    }),
    (dispatch) => ({
        actions: bindActionCreators(menuActions, dispatch)
    })
)(InfoPage);

export default InfoPage;