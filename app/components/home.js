import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback,
    DrawerLayoutAndroid,
    Image,
    ViewPagerAndroid,
    Alert,
    ScrollView,
    StyleSheet,
    Platform
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import TabBar from './tabBar';
import Icon from 'react-native-vector-icons/Ionicons';
var {ToolbarAndroid} = Icon;
import { connect } from 'react-redux';

import CabangContainer from '../containers/cabangContainer';
import EventContainer from '../containers/eventContainer';
import MenuContainer from '../containers/menuContainer';
import PekaContainer from '../containers/pekaContainer';
import MinistryContainer from '../containers/ministryContainer';
import PostContainer from '../containers/postContainer';
import WartaPage from '../components/wartaPage';
import InfoPage from '../components/infoPage';

import ActionButton from 'react-native-action-button';
import LinearGradient from 'react-native-linear-gradient';
import MainStyles from '../styles/mainStyles';
import colors from '../styles/colors';

let styles = StyleSheet.create({
    viewPager: {
        flex: 1,
    },
    content: {
        flex: 1
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pagePosition: 0,
        }
    }
    openDrawer() {
        this.refs.drawer.openDrawer();
    }
    setPagePosition(page, e) {
        this.refs.drawer.closeDrawer();
        this.setState({pagePosition: page});
    }
    selectCabang() {
        this.props.navigator.push({
            name: 'cabangPage'
        });
    }
    onNavigate(page) {
        this.setPagePosition(page);
    }
    render() {
        var navigationView = (
            <View style={{flex: 1,
                backgroundColor: colors.orange,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch'}}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 60,
                    }}>
                    <Image source={require('../../img/logo_big.png')} resizeMode={'contain'} style={{flex: 1, height: 60, width: 200}}/>
                </View>
                <View style={{
                    flex: 2,
                }}>
                    <ScrollView>
                        <TouchableNativeFeedback onPress={this.selectCabang.bind(this)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="md-repeat" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 14}}>{'Ganti Cabang ' + this.props.state.activeCabang.name}</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this.setPagePosition.bind(this, 0)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="md-home" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 14}}>Warta</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this.setPagePosition.bind(this, 1)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="md-information-circle" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 14}}>Jadwal Ibadah</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this.setPagePosition.bind(this, 2)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="md-document" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 14}}>Berita</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this.setPagePosition.bind(this, 3)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="md-calendar" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 14}}>Event</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this.setPagePosition.bind(this, 4)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="ios-people" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 14}}>Komunitas Peka</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </ScrollView>
                </View>
            </View>
        );
        
        var tabView = (
            <ScrollableTabView
                tabBarUnderlineColor={'#fff'}
                tabBarBackgroundColor={colors.orange}
                initialPage={0}
                page={this.state.pagePosition}
                renderTabBar={() => <TabBar />}
                onChangeTab={(e) => this.setState({pagePosition: e.i})}
                >
                <View tabLabel="md-home" style={styles.content}>
                    <WartaPage active={this.state.pagePosition === 0} navigator={this.props.navigator} onNavigate={this.onNavigate.bind(this)} activeCabang={this.props.state.activeCabang}/>
                </View>
                <View tabLabel="md-information-circle" style={styles.content}>
                    <InfoPage active={this.state.pagePosition === 1} navigator={this.props.navigator}/>
                </View>
                <View tabLabel="md-document" style={styles.content}>
                    <PostContainer active={this.state.pagePosition === 2} navigator={this.props.navigator}/>
                </View>
                <View tabLabel="md-calendar" style={styles.content}>
                    <EventContainer active={this.state.pagePosition === 3} navigator={this.props.navigator}/>
                </View>
                <View tabLabel="ios-people" style={styles.content}>
                    <PekaContainer active={this.state.pagePosition === 4} navigator={this.props.navigator} />
                </View>
            </ScrollableTabView>
        );

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                {Platform.OS === 'android' ?
                    <DrawerLayoutAndroid
                        ref="drawer"
                        drawerWidth={300}
                        drawerPosition={DrawerLayoutAndroid.positions.Left}
                        renderNavigationView={() => navigationView}>
                        <View style={{flex: 1, backgroundColor: colors.bg}}>
                            <ToolbarAndroid
                                title={"PPL " + this.props.state.activeCabang.name}
                                style={MainStyles.toolbar}
                                titleColor="#fff"
                                navIconName={'md-menu'}
                                onIconClicked={this.openDrawer.bind(this)}
                                />
                            {tabView}
                        </View>
                    </DrawerLayoutAndroid>
                    :
                    <View style={{flex: 1, backgroundColor: colors.bg}}>
                        <View style={[MainStyles.toolbar, {alignItems: 'center'}]}>
                            <Image source={require('../../img/app_logo.png')} style={{width: 150, height: 80, resizeMode: 'contain'}}/>
                        </View>
                        <View style={{flex: 1}}>
                            {tabView}
                        </View>
                    </View>}
            </View>
        );
    }
}

Home = connect(state => ({
        state: state.cabang
    }),
    (dispatch) => ({})
)(Home);

export default Home;
