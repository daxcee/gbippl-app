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
import WebContainer from '../utils/WebContainer';
import LinearGradient from 'react-native-linear-gradient';

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
        const { state, actions, navigator, activePost } = this.props;
        const { pastor, pastor_data } = activePost;
        if (activePost.content == undefined) activePost.content = '';
        return (
            <View style={{flex: 1}}>
                {Platform.OS === 'android' ? 
                    <ToolbarAndroid
                        title={activePost.title}
                        style={MainStyles.toolbar}
                        titleColor={'#fff'}
                        navIcon={{uri: 'back', isStatic: true}}
                        onIconClicked={() => this.props.navigator.pop()}
                        />
                    :
                    <View style={[MainStyles.toolbar, {alignItems: 'center', justifyContent: 'center'}]}>
                        <Text numberOfLines={1} style={MainStyles.toolbarText}>{activePost.title}</Text>
                    </View>}
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <ScrollView>
                        {activePost.image ?
                            <TouchableOpacity onPress={this.toggleImageHeight.bind(this)}>
                                <View style={{height: this.state.imageHeight}}>
                                    <Image source={{uri: activePost.image}} style={{resizeMode: this.state.imageResize, height: this.state.imageHeight, left: 0, right: 0}}/>
                                    <LinearGradient
                                        colors={['transparent', 'rgba(0,0,0,0.6)']}
                                        style={{position: 'absolute',left: 0,right: 0,top: 0,height: this.state.imageHeight}}/>
                                    <View style={{position: 'absolute',left: 0,right: 0,top: 0,height: this.state.imageHeight,padding: 15,justifyContent: 'flex-end'}}>
                                        <Text style={{color: '#fff',fontSize: 20}}>{activePost.title}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            : null}
                        <View style={{padding: 15}}>
                            <Text style={{textAlign: 'right'}}>{activePost.date}</Text>
                            {pastor_data ?
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Image source={{uri: pastor_data.thumb}} style={{height: 32, width: 32, marginRight: 10, borderRadius: 32}} />
                                    <Text>{pastor}</Text>
                                </View>
                                : null}
                        </View>
                        <View>
                            <WebContainer
                                style={{flex: 1}}
                                html={activePost.content}
                                autoHeight={true} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default PostDetail;
