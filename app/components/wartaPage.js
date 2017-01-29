import React, {Component} from 'react';
import {
    Platform,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    DrawerLayoutAndroid,
    ScrollView,
    Dimensions
} from 'react-native';

import colors from '../styles/colors';
import { connect } from 'react-redux';
import * as postActions from '../actions/postActions';
import * as menuActions from '../actions/menuActions';
import * as cabangActions from '../actions/cabangActions';
import * as memberActions from '../actions/memberActions';

import { bindActionCreators } from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import Grid from '../components/grid';

import Icon from 'react-native-vector-icons/Ionicons';
import MainStyles from '../styles/mainStyles';

// const SideMenu = require('react-native-side-menu');
var DrawerLayout = require('react-native-drawer-layout');
import Toolbar from '../uikit/Toolbar';
import Swiper from 'react-native-swiper';

class WartaPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            refresh: false,
            loaded: false,
            posts: this.props.state.posts,
            isDrawerOpened: false
        }
    }
    componentDidMount() {
        console.log('MEMBER', this.props.state.member);
        setTimeout(() => {
            this.onRefresh();
        });
    }
    onRefresh() {
        this.setState({refresh: true});
        this.props.actions.post.fetchPinned().then(() => {
            this.setState({refresh: false});
        });
        this.props.actions.post.fetchAppSettings().then(() => {
            this.setState({refresh: false});
        });
        this.props.actions.cabang.fetchCabang().then(() => {
            this.setState({refresh: false});
        });
    }
    selectPost(post) {
        this.props.actions.post.changeActivePost(post);
        this.props.navigator.push({
            name: 'postDetail',
            data: post
        });
    }
    openDrawer() {
        // this.setState({
        //     isDrawerOpened: true
        // });
        this.drawer && this.drawer.openDrawer();
    }
    selectCabang() {
        this.props.navigator.push({
            name: 'cabangPage'
        });
    }
    _renderPage(data) {
        return (
            <TouchableOpacity key={data.id} onPress={this.selectPost.bind(this, data)} style={{flex: 1}}>
                <View style={styles.slide}>
                    <Image source={{uri: data.image || ''}} style={styles.image} />
                    
                    <Text style={styles.heading}>{data.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    openJadwalIbadah() {
        this.props.navigator.push({
            name: 'infoPage'
        });
    }
    openPekaPage() {
        this.props.navigator.push({
            name: 'pekaPage'
        });
    }
    openEventPage() {
        this.props.navigator.push({
            name: 'eventPage'
        });
    }
    openPostPage() {
        this.props.navigator.push({
            name: 'postPage'
        });
    }
    openGalleryPage() {
        this.props.navigator.push({
            name: 'galleryPage'
        });
    }
    openAboutPage() {
        this.props.navigator.push({
            name: 'aboutPage'
        });
    }
    openKhotbahListPage() {
        this.props.navigator.push({
            name: 'khotbahListPage'
        });   
    }
    openWeeklyNewsPage() {
        this.props.navigator.push({
            name: 'weeklyNewsPage'
        }); 
    }
    openSettingsPage() {
        this.props.navigator.push({
            name: 'settingsPage'
        }); 
    }
    onLogout() {
        console.log(this.props.state.member);
        this.props.actions.member.logout();
        this.props.navigator.resetTo({
            name: 'intro'
        })
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
                    height: 30,
                    }}>
                    <Image source={require('../../img/logo_drawer.png')} resizeMode={'contain'} style={{flex: 1, height: 30, width: 200}}/>
                </View>
                <View style={{
                    flex: 3,
                }}>
                    <ScrollView>
                        <TouchableOpacity onPress={this.selectCabang.bind(this)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="md-repeat" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 14}}>{'Ganti Cabang ' + this.props.state.activeCabang.name}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.openWeeklyNewsPage.bind(this)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="md-play" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 14}}>Weekly News</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.openPostPage.bind(this)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="md-document" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 14}}>Info Terbaru</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.openEventPage.bind(this)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="md-calendar" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 14}}>Event</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.openPekaPage.bind(this)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="ios-people" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 14}}>Komunitas Peka</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.openGalleryPage.bind(this)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="md-image" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 14}}>Gallery</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.openKhotbahListPage.bind(this)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="md-information-circle" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 14}}>Ringkasan Khotbah</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.openSettingsPage.bind(this)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="md-settings" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 14}}>Pengaturan</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.openAboutPage.bind(this)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="md-help-circle" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 14}}>Tentang GBI PPL</Text>
                            </View>
                        </TouchableOpacity>
                        {this.props.state.member ?
                            <TouchableOpacity onPress={this.onLogout.bind(this)}>
                                <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                    <Icon name="md-lock" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                    <Text style={{color: '#fff', fontSize: 14}}>Logout</Text>
                                </View>
                            </TouchableOpacity>
                            : null}
                    </ScrollView>
                </View>
            </View>
        );
        var {activeCabang} = this.props.state;
        var thumbnails = this.props.state.appSettings && this.props.state.appSettings.thumbnails || {};
        var gridItems = [
            {
                name: 'Jadwal Ibadah', 
                image: activeCabang.image,
                onPress: this.openJadwalIbadah.bind(this)
            },
            {
                name: 'Weekly News', 
                image: thumbnails.weeklynews,
                onPress: this.openWeeklyNewsPage.bind(this)
            },
            {
                name: 'Peka', 
                image: 'http://gbippl.id/wp-content/uploads/2016/05/peka.png',
                onPress: this.openPekaPage.bind(this)
            },
            {
                name: 'Info Terbaru', 
                image: thumbnails.posts,
                onPress: this.openPostPage.bind(this)
            },
            {
                name: 'Ringkasan Khotbah', 
                image: thumbnails.khotbah,
                onPress: this.openKhotbahListPage.bind(this)
            },
            {
                name: 'Event', 
                image: thumbnails.event,
                onPress: this.openEventPage.bind(this)
            },
            {
                name: 'Gallery', 
                image: thumbnails.gallery,
                onPress: this.openGalleryPage.bind(this)
            },
        ];
        gridItems = [...gridItems, ...activeCabang.menus.map(item => {
            return {
                name: item.title,
                image: item.image,
                onPress: () => {
                    this.props.actions.menu.changeActivePage(item);
                    this.props.navigator.push({
                        name: 'pageDetail',
                        data: item,
                        type: 'cabang'
                    });
                }
            }
        })];

        var content = (
            <View style={{flex: 1}}>
                <Grid
                    items={gridItems}
                    refresh={this.state.refresh}
                    onRefresh={this.onRefresh.bind(this)}
                    header={(
                        <View style={styles.viewPager}>
                            <Swiper
                                height={180}
                                loop={this.props.state.pinned.length > 0}
                                autoplay={this.props.state.pinned.length > 0}
                                key={'swiper-'+this.props.state.pinned.length}>
                                {this.props.state.pinned.map(post => {
                                    return this._renderPage(post);
                                })}
                            </Swiper>
                        </View>
                    )} />
            </View>
        );
        
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <DrawerLayout
                    onDrawerStateChanged={(e) => console.log(e)}
                    drawerWidth={275}
                    ref={(drawer) => { return this.drawer = drawer }}
                    keyboardDismissMode="on-drag"
                    renderNavigationView={() => navigationView}>
                    <View style={{flex: 1, backgroundColor: colors.bg}}>
                        <Toolbar
                            title={"PPL " + this.props.state.activeCabang.name}
                            style={MainStyles.toolbar}
                            titleColor="#fff"
                            navIconName={'md-menu'}
                            onIconClicked={this.openDrawer.bind(this)}
                            />
                        {content}
                    </View>
                </DrawerLayout>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    blue: {
        backgroundColor: colors.orange,
        height: 160,
    },
    content: {
        backgroundColor: 'transparent',
        flex: 1,
        marginTop: -100
    },
    viewPager: {
        height: 180,
    },
    slide: {
        flex: 1,
        backgroundColor: colors.orange,
        height: 180,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    heading: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 18,
        backgroundColor: 'transparent'
    },
    image: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: 180,
    },
    linearGradient: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: 180,
    }
});

WartaPage = connect(state => ({
        state: {...state.posts, ...state.cabang, ...state.member}
    }),
    (dispatch) => ({
        actions: {
            post: bindActionCreators(postActions, dispatch),
            menu: bindActionCreators(menuActions, dispatch),
            cabang: bindActionCreators(cabangActions, dispatch),
            member: bindActionCreators(memberActions, dispatch),
        }
    })
)(WartaPage);

export default WartaPage;