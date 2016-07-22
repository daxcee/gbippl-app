import React, {Component} from 'react';
import {
    Platform,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableNativeFeedback,
    DrawerLayoutAndroid,
    ScrollView
} from 'react-native';
import ViewPager from 'react-native-viewpager';
import colors from '../styles/colors';
import { connect } from 'react-redux';
import * as postActions from '../actions/postActions';
import * as menuActions from '../actions/menuActions';
import * as cabangActions from '../actions/cabangActions';
import { bindActionCreators } from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import Grid from '../components/grid';

import Icon from 'react-native-vector-icons/Ionicons';
var {ToolbarAndroid} = Icon;
import MainStyles from '../styles/mainStyles';

class WartaPage extends Component {
    constructor(props, context) {
        super(props, context);
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1.id !== p2.id,
        });
        this.state = {
            refresh: false,
            loaded: false,
            dataSource: dataSource.cloneWithPages(this.props.state.posts),
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.onRefresh();
        });
    }
    onRefresh() {
        this.setState({refresh: true});
        this.props.actions.post.fetchPost(1).then(() => {
            this.setState({refresh: false, dataSource: this.state.dataSource.cloneWithPages(this.props.state.posts)});
        });
        this.props.actions.cabang.fetchCabang().then(() => {
            this.setState({refresh: false});
        });
    }
    selectPost(post) {
        this.props.actions.post.changeActivePost(post.id);
        this.props.navigator.push({
            name: 'postDetail',
            data: post
        });
    }
    openDrawer() {
        this.refs.drawer.openDrawer();
    }
    selectCabang() {
        this.props.navigator.push({
            name: 'cabangPage'
        });
    }
    _renderPage(data, pageID) {
        return (
            <TouchableOpacity onPress={this.selectPost.bind(this, data)} style={{flex: 1}}>
                <View style={styles.slide}>
                    <Image source={{uri: data.image}} style={styles.image} />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.6)']}
                        style={styles.linearGradient}/>
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
                    <Image source={require('../../img/logo_drawer.png')} resizeMode={'contain'} style={{flex: 1, height: 60, width: 200}}/>
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
                        <TouchableNativeFeedback onPress={this.openJadwalIbadah.bind(this)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="md-information-circle" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 14}}>Jadwal Ibadah</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this.openPostPage.bind(this)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="md-document" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 14}}>Info Terbaru</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this.openEventPage.bind(this)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="md-calendar" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 14}}>Event</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this.openPekaPage.bind(this)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="ios-people" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 14}}>Komunitas Peka</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </ScrollView>
                </View>
            </View>
        );
        var {activeCabang} = this.props.state;
        var gridItems = [
            {
                name: 'Jadwal Ibadah', 
                image: activeCabang.image,
                onPress: this.openJadwalIbadah.bind(this)
            },
            {
                name: 'Peka', 
                image: 'http://gbippl.id/wp-content/uploads/2016/05/peka.png',
                onPress: this.openPekaPage.bind(this)
            },
            {
                name: 'Info Terbaru', 
                image: activeCabang.image,
                onPress: this.openPostPage.bind(this)
            },
            {
                name: 'Event', 
                image: activeCabang.image,
                onPress: this.openEventPage.bind(this)
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
                            <ViewPager
                                style={styles.viewPager}
                                dataSource={this.state.dataSource}
                                renderPage={this._renderPage.bind(this)}
                                isLoop={this.props.state.posts.length > 0}
                                autoPlay={this.props.state.posts.length > 0} />
                        </View>
                    )} />
            </View>
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
                            {content}
                        </View>
                    </DrawerLayoutAndroid>
                    :
                    <View style={{flex: 1, backgroundColor: colors.bg}}>
                        <View style={[MainStyles.toolbar, {alignItems: 'center'}]}>
                            <Image source={require('../../img/app_logo.png')} style={{width: 150, height: 80, resizeMode: 'contain'}}/>
                        </View>
                        <View style={{flex: 1}}>
                            {content}
                        </View>
                    </View>}
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
        marginBottom: 18
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
        state: {...state.posts, ...state.cabang}
    }),
    (dispatch) => ({
        actions: {
            post: bindActionCreators(postActions, dispatch),
            menu: bindActionCreators(menuActions, dispatch),
            cabang: bindActionCreators(cabangActions, dispatch),
        }
    })
)(WartaPage);

export default WartaPage;