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

class PageDetail extends React.Component {
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
        console.log('BUKA', this.props.activePage);
        this.props.fetchSinglePage(this.props.activePage.id);
    }
    render() {
        const { state, actions, navigator, activePage, activeCabang } = this.props;
        return (
            <View style={{flex: 1}}>
                {Platform.OS === 'android' ? 
                    <ToolbarAndroid
                        title={activePage.title + ' - ' + activeCabang.name}
                        style={MainStyles.toolbar}
                        titleColor={'#fff'}
                        navIcon={{uri: 'back', isStatic: true}}
                        onIconClicked={() => this.props.navigator.pop()}
                        />
                    :
                    <View style={[MainStyles.toolbar, {alignItems: 'center', justifyContent: 'center'}]}>
                        <Text numberOfLines={1} style={MainStyles.toolbarText}>{activePage.title}</Text>
                    </View>}
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <ScrollView>
                        {activePage.image ?
                            <TouchableOpacity onPress={this.toggleImageHeight.bind(this)}>
                                <View style={{height: this.state.imageHeight}}>
                                    <Image source={{uri: activePage.image}} style={{resizeMode: this.state.imageResize, height: this.state.imageHeight, left: 0, right: 0}}/>
                                    <LinearGradient
                                        colors={['transparent', 'rgba(0,0,0,0.6)']}
                                        style={{position: 'absolute',left: 0,right: 0,top: 0,height: this.state.imageHeight}}/>
                                    <View style={{position: 'absolute',left: 0,right: 0,top: 0,height: this.state.imageHeight,padding: 15,justifyContent: 'flex-end'}}>
                                        <Text style={{color: '#fff',fontSize: 20}}>{activePage.title}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            : null}
                        <View>
                            <WebContainer
                                style={{flex: 1}}
                                html={activePage.content}
                                autoHeight={true} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default PageDetail;
