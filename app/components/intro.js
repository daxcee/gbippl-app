import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Image,
    Dimensions,
    StyleSheet,
    Alert
} from 'react-native';

import Button from 'apsl-react-native-button';
import ViewPager from 'react-native-viewpager';
import colors from '../styles/colors';

let styles = StyleSheet.create({
    viewPager: {
        flex: 1,
    },
    pageStyle: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#000'
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
});

var splashImage = require('../../img/splash1.png');
var defaultSplash = {
    id: 0,
    image: splashImage
};

class Intro extends React.Component {
    constructor(props, context) {
        super(props, context);
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1.id !== p2.id,
        });
        this.state = {
            page: 0,
            loaded: false,
            progress: {
                position: 0,
                offset: 0,
            },
            dataSource: dataSource.cloneWithPages([defaultSplash]),
        }
    }
    componentDidMount() {
        
    }
    componentWillUnmount() {
        
    }
    _renderPage(data, pageID) {
        return (
            <View key={data.id} style={styles.pageStyle}>
                <Image source={data.image} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}} resizeMode={'cover'}/>
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
                this.setState({
                    dataSource: this.state.dataSource.cloneWithPages([defaultSplash, ...json]),
                    loaded: true
                });
            });
    }
    onPageSelected(e) {
        this.setState({page: e.nativeEvent.position});
    }

    onPageScroll(e) {
        this.setState({progress: e.nativeEvent});
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
                <ViewPager
                    style={styles.viewPager}
                    dataSource={this.state.dataSource}
                    renderPage={this._renderPage}
                    isLoop={this.state.loaded}
                    autoPlay={this.state.loaded} />
                
                <View style={{position: 'absolute', bottom: 30, left: 0, right: 0, alignItems: 'flex-start'}}>
                    <Button onPress={this.onEnterApp.bind(this)} style={{backgroundColor: colors.orangeDark, borderRadius: 40, margin: 23, padding: 30, borderWidth: 0}} textStyle={{color: '#fff', fontSize: 18}}>
                        Masuk Aplikasi
                    </Button>
                </View>
            </View>
        )
    }
}

export default Intro;
