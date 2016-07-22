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
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'apsl-react-native-button';
import WebIntent from 'react-native-webintent';
import ActionButton from 'react-native-action-button';
import HTMLView from 'react-native-htmlview';
import MainStyles from '../styles/mainStyles';

let styles = StyleSheet.create({
    heading: {
        fontSize: 28,
        color: '#000'
    },
    description: {
        fontSize: 13,
        color: '#777'
    },
    a: {
        fontWeight: '300',
        color: '#ff2561',
    },
    dateTime: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

class MinistryDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageHeight: 300,
            imageResize: 'cover'
        }
    }
    toggleImageHeight() {
        this.setState({
            imageHeight: this.state.imageHeight === 300 ? 450 : 300,
            imageResize: this.state.imageHeight === 300 ? 'contain' : 'contain'
        });
    }
    render() {
        const { state, actions, navigator, ministry } = this.props;
        return (
            <View style={{flex: 1}}>
                {Platform.OS === 'android' ? 
                    <ToolbarAndroid
                        title={ministry.title}
                        style={MainStyles.toolbar}
                        titleColor={'#fff'}
                        navIcon={{uri: 'back', isStatic: true}}
                        onIconClicked={() => this.props.navigator.pop()}
                        />
                    :
                    <View style={[MainStyles.toolbar, {alignItems: 'center', justifyContent: 'center'}]}>
                        <Text numberOfLines={1} style={MainStyles.toolbarText}>{ministry.title}</Text>
                    </View>}
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <ScrollView>
                        {ministry.image ?
                            <TouchableOpacity onPress={this.toggleImageHeight.bind(this)}>
                                <Image source={{uri: ministry.image}} style={{resizeMode: this.state.imageResize, height: this.state.imageHeight, left: 0, right: 0}}/>
                            </TouchableOpacity>
                            : null}
                        <View style={{padding: 15, marginBottom: 20}}>
                            <Text style={styles.description}>
                                <HTMLView
                                    value={ministry.content}
                                    onLinkPress={(url) => console.log('navigating to: ', url)}
                                    stylesheet={styles}
                                    />
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default MinistryDetail;
