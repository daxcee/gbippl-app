import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Image,
    Dimensions,
    StyleSheet,
    Alert,
    Animated
} from 'react-native';

import Button from 'apsl-react-native-button';
import colors from '../styles/colors';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';

class FadeInView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
        };
    }
    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 1000,
            },
        ).start();
    }
    render() {
        return (
            <Animated.View
                style={[{opacity: this.state.fadeAnim}, this.props.style]}>
                {this.props.children}
            </Animated.View>
        );
    }
}

let styles = StyleSheet.create({
    viewPager: {
    },
    pageStyle: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    progressBarContainer: {
        height: 10,
        margin: 10,
        borderColor: '#eeeeee',
        borderWidth: 2,
        flex: 1,
        alignSelf: 'center'
    },
    progressBar: {
        alignSelf: 'flex-start',
        flex: 1,
        backgroundColor: '#eeeeee',
    },
    loader: {
        alignSelf: 'center',
        width: 250,
        height: 217
    }
});

var splashImage = require('../../img/splash1.png');
var defaultSplash = {
    id: 0,
    image: splashImage
};

class Intro extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 0,
            loaded: false,
            progress: {
                position: 0,
                offset: 0,
            },
            splashes: [defaultSplash]
        }
    }
    componentDidMount() {
        
    }
    componentWillUnmount() {
        
    }
    _renderPage(data) {
        return (
            <View key={data.id} style={styles.pageStyle}>
                <Image source={data.image || ''} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}} resizeMode={'cover'}/>
            </View>
        );
    }
    componentDidMount() {
        fetch('http://api.gbippl.id/splash')
            .then(response => response.json())
            .then(json => {
                json = json.map(item => {
                    return Object.assign({}, item, {image: {uri: item.image}});
                });
                setTimeout(() => {
                    this.setState({
                        // dataSource: this.state.dataSource.cloneWithPages([defaultSplash, ...json]),
                        splashes: json,
                        loaded: true
                    });
                }, 2500);
            });
    }
    onPageSelected(e) {
        this.setState({page: e.nativeEvent.position});
    }

    onPageScroll(e) {
        this.setState({progress: e.nativeEvent});
    }
    onLogin() {
        this.props.navigator.push({
            name: 'loginPage',
        });
    }

    onRegister() {
        this.props.navigator.push({
            name: 'registerPage',
        });
    }

    onEnterApp() {
        this.props.changeIntro();
        if (this.props.activeCabang.name) {
            this.props.navigator.resetTo({
                name: 'wartaPage',
            });
        } else {
            this.props.navigator.resetTo({
                name: 'cabangPage',
            });
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.loaded ?
                    <FadeInView style={{flex: 1}}>
                        <Swiper
                            style={styles.viewPager}
                            loop={true}
                            autoplay={true}
                            key={'swiper-'+this.state.splashes.length}>
                            {this.state.splashes.map(splash => {
                                return this._renderPage(splash);
                            })}
                        </Swiper>
                    </FadeInView>
                    : 
                    <Image source={require('../../img/loader.gif')} style={styles.loader} />}
                
                <View style={{position: 'absolute', bottom: 30, left: 0, right: 0, alignItems: 'flex-start'}}>
                    {!this.props.member.member ?
                        <View style={{flexDirection: 'row', marginHorizontal: 23}}>
                            <View style={{flex: 1}}>
                                <Button onPress={this.onLogin.bind(this)} style={{backgroundColor: colors.orange, borderRadius: 40, margin: 5, borderWidth: 0, opacity: 0.2}} textStyle={{color: '#ddd', fontSize: 18}}>
                                    Login
                                </Button>
                            </View>
                            <View style={{flex: 1}}>
                                <Button onPress={this.onRegister.bind(this)} style={{backgroundColor: colors.orange, borderRadius: 40, margin: 5, borderWidth: 0, opacity: 0.2}} textStyle={{color: '#ddd', fontSize: 18}}>
                                    Daftar
                                </Button>
                            </View>
                        </View>
                        : null}
                    <Button onPress={this.onEnterApp.bind(this)} style={{backgroundColor: colors.orangeDark, borderRadius: 40, margin: 23, marginTop: 5, borderWidth: 0}} textStyle={{color: '#fff', fontSize: 18}}>
                        Masuk Aplikasi
                    </Button>
                </View>
            </View>
        )
    }
}

Intro = connect(state => ({
        member: state.member
    })
)(Intro);

export default Intro;
