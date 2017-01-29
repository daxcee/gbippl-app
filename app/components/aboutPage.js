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
import Toolbar from '../uikit/Toolbar';


let styles = StyleSheet.create({
    heading: {
        fontSize: 28,
        color: '#000'
    },
    address: {
        fontSize: 13,
        color: '#777'
    }
});

class AboutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        this.props.actions.fetchAbout();
    }
    render() {
        const { state, actions, navigator, menus } = this.props;
        var content = `
        <style>
            body, html {
                font-family: "Arial", Serif, Sans-Serif;
                margin: 0;
                padding: 0;
                font-size: ${menus.fontSize}px;
            }
        </style>
        <div style="padding: 10px">
            ${state.about.content || ''}
        </div>`;
        
        return (
            <View style={{flex: 1}}> 
                <Toolbar
                    title={'About GBI PPL'}
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

// export default CabangDetail;
export default connect(state => ({
        state: state.menus,
        menus: state.menus
    }),
    (dispatch) => ({
        actions: bindActionCreators(menuActions, dispatch)
    })
)(AboutPage);
