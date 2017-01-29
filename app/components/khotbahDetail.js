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

class KhotbahDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageHeight: 190,
            imageResize: 'cover'
        }
    }
    toggleImageHeight() {
        this.setState({
            imageHeight: this.state.imageHeight === 190 ? 400 : 190,
            imageResize: this.state.imageHeight === 190 ? 'contain' : 'cover'
        });
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
        <div style="height: 180px; background: url(${state.activeKhotbah.image}) no-repeat; background-size: cover; background-position: center center"></div>
        <div style="padding: 10px">
            ${state.activeKhotbah.content || ''}
        </div>`;
        return (
            <View style={{flex: 1}}>
                <Toolbar
                    title={state.activeKhotbah.title}
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

KhotbahDetail = connect(state => ({
        state: state.menus,
        menus: state.menus
    }),
    (dispatch) => ({
        actions: bindActionCreators(menuActions, dispatch)
    })
)(KhotbahDetail);

export default KhotbahDetail;