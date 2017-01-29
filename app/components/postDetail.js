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

import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'apsl-react-native-button';
import WebIntent from 'react-native-webintent';
import ActionButton from 'react-native-action-button';
import HTMLView from 'react-native-htmlview';
import MainStyles from '../styles/mainStyles';
import LinearGradient from 'react-native-linear-gradient';
import Toolbar from '../uikit/Toolbar';
import { connect } from 'react-redux';

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

class PostDetail extends React.Component {
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
    componentDidMount() {
        this.props.fetchSinglePost(this.props.activePost.id);
    }
    render() {
        const { state, actions, navigator, activePost, menus } = this.props;
        const { pastor, pastor_data } = activePost;
        if (activePost.content == undefined) activePost.content = '';

        var content = `
        <style>
            body, html {
                font-family: "Arial", Serif, Sans-Serif;
                margin: 0;
                padding: 0;
                font-size: ${menus.fontSize}px;
            }
        </style>
        <div style="height: 180px; background: url(${activePost.image}) no-repeat; background-size: cover; background-position: center center"></div>
        <div style="padding: 10px">
            ${activePost.content || ''}
        </div>`;

        return (
            <View style={{flex: 1}}>
                <Toolbar
                    title={activePost.title}
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

PostDetail = connect(state => ({
        menus: state.menus
    })
)(PostDetail);

export default PostDetail;
