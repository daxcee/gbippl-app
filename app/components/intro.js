import React, {
    View,
    Text,
    TouchableHighlight,
    ViewPagerAndroid,
    Image,
} from 'react-native';

import Button from 'apsl-react-native-button'

let styles = {
    viewPager: {
        flex: 1,
    },
    pageStyle: {
        alignItems: 'center',
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
};


class Intro extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 0,
            progress: {
                position: 0,
                offset: 0,
            },
        }
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            let currentPage = this.state.page;
            let nextPage = currentPage + 1;
            if (nextPage > 4) nextPage = 0;
            this.viewPager.setPage(nextPage);
            this.setState({page: nextPage});
        }, 3000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }
    
    onPageSelected(e) {
        this.setState({page: e.nativeEvent.position});
    }

    onPageScroll(e) {
        this.setState({progress: e.nativeEvent});
    }

    onEnterApp() {
        this.props.changeIntro();
        this.props.navigator.resetTo({
            name: 'home',
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <ViewPagerAndroid
                    style={styles.viewPager}
                    initialPage={0}
                    onPageScroll={this.onPageScroll.bind(this)}
                    onPageSelected={this.onPageSelected.bind(this)}
                    ref={viewPager => { this.viewPager = viewPager; }}>
                    <View style={styles.pageStyle}>
                        <Image source={require('../../img/splash1.jpg')} style={{flex: 1}} resizeMode={'cover'}/>
                    </View>
                    <View style={styles.pageStyle}>
                        <Image source={require('../../img/peka.jpg')} style={{flex: 1}} resizeMode={'cover'}/>
                    </View>
                    <View style={styles.pageStyle}>
                        <Image source={require('../../img/genneo.jpg')} style={{flex: 1}} resizeMode={'cover'}/>
                    </View>
                    <View style={styles.pageStyle}>
                        <Image source={require('../../img/wbi.jpg')} style={{flex: 1}} resizeMode={'cover'}/>
                    </View>
                    <View style={styles.pageStyle}>
                        <Image source={require('../../img/mk.jpg')} style={{flex: 1}} resizeMode={'cover'}/>
                    </View>
                </ViewPagerAndroid>
                <View style={{position: 'absolute', bottom: 80, left: 0, right: 0, alignItems: 'flex-start'}}>
                    <Button onPress={this.onEnterApp.bind(this)} style={{backgroundColor: '#f96332', borderRadius: 50, margin: 30, padding: 40, borderWidth: 0}} textStyle={{color: '#fff', fontSize: 30, fontFamily: 'Gotham-Book'}}>
                        Masuk Aplikasi
                    </Button>
                </View>
            </View>
        )
    }
}

export default Intro;