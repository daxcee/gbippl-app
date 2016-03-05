import React, {
    View,
    Text,
    TouchableNativeFeedback,
    ToolbarAndroid,
    DrawerLayoutAndroid,
    Image,
    ViewPagerAndroid,
    Alert,
    ScrollView
} from 'react-native';
import { Tab, TabLayout } from 'react-native-android-tablayout';
import Icon from 'react-native-vector-icons/Ionicons';

import CabangContainer from '../containers/cabangContainer';
import EventContainer from '../containers/eventContainer';
import MenuContainer from '../containers/menuContainer';
import PostContainer from '../containers/postContainer';
import ActionButton from 'react-native-action-button';
import LinearGradient from 'react-native-linear-gradient';

let styles = {
    toolbar: {
        backgroundColor: '#ff2561',
        height: 60,
    },
    viewPager: {
        flex: 1
    },
    content: {
        flex: 1
    }
};

/*
<Tab accessibilityLabel={'berita'} style={{width: 110, height: 48}} iconSize={110}>
    <Icon name="ios-paper-outline" size={32} color="#fff"/>
</Tab>
<Tab accessibilityLabel={'event'} style={{width: 110, height: 48}} iconSize={110}>
    <Icon name="ios-calendar-outline" size={32} color="#fff"/>
</Tab>
<Tab accessibilityLabel={'cabang'} style={{width: 110, height: 48}} iconSize={110}>
    <Icon name="ios-location-outline" size={32} color="#fff"/>
</Tab>
<Tab accessibilityLabel={'komunitas'} style={{width: 110, height: 48}} iconSize={110}>
    <Icon name="ios-people-outline" size={32} color="#fff"/>
</Tab>
<Tab accessibilityLabel={'profil'} style={{width: 110, height: 48}} iconSize={110}>
    <Icon name="ios-home-outline" size={32} color="#fff"/>
</Tab>*/

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iconPaper: '',
            iconCalendar: '',
            iconLocation: '',
            iconPeople: '',
            iconHome: '',
            pagePosition: 0,
        }
    }
    openDrawer() {
        this.refs.drawer.openDrawer();
    }
    componentDidMount() {
        Icon.getImageSource('android-document', 32, 'white').then(source => {
            this.setState({ iconPaper: source.uri });
        });
        Icon.getImageSource('android-calendar', 32, 'white').then(source => {
            this.setState({ iconCalendar: source.uri });
        });
        Icon.getImageSource('android-pin', 32, 'white').then(source => {
            this.setState({ iconLocation: source.uri });
        });
        Icon.getImageSource('person-stalker', 32, 'white').then(source => {
            this.setState({ iconPeople: source.uri });
        });
        Icon.getImageSource('android-home', 32, 'white').then(source => {
            this.setState({ iconHome: source.uri });
        });
    }
    _setPagePosition(e:Event) {
        const pagePosition = e.nativeEvent.position;
        this.setState({ pagePosition });
        this.viewPager.setPage(pagePosition);
    }
    _setPage(page) {
        this.setState({ pagePosition: page });
        this.viewPager.setPage(page);
        this.refs.drawer.closeDrawer();
    }
    render() {
        var navigationView = (
            <View style={{flex: 1,
                backgroundColor: '#ff2561',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch'}}>
                <LinearGradient
                    colors={['#f05d50', '#ff2561']}
                    style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}/>
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
                        <TouchableNativeFeedback onPress={this._setPage.bind(this, 0)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="android-document" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontFamily: 'Gotham-Book', fontSize: 16}}>Berita</Text>
                            </View> 
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this._setPage.bind(this, 1)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="android-calendar" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontFamily: 'Gotham-Book', fontSize: 16}}>Event</Text>
                            </View> 
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this._setPage.bind(this, 2)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="android-pin" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontFamily: 'Gotham-Book', fontSize: 16}}>Cabang</Text>
                            </View> 
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this._setPage.bind(this, 3)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="person-stalker" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontFamily: 'Gotham-Book', fontSize: 16}}>Komunitas</Text>
                            </View> 
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this._setPage.bind(this, 4)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
                                <Icon name="android-home" size={28} style={{width: 50, marginLeft: 10, marginRight: 10, textAlign: 'center'}} color={'#fff'} />
                                <Text style={{color: '#fff', fontFamily: 'Gotham-Book', fontSize: 16}}>Tentang</Text>
                            </View> 
                        </TouchableNativeFeedback>
                    </ScrollView>
                </View>
            </View>
        );

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <DrawerLayoutAndroid
                    ref="drawer"
                    drawerWidth={300}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={() => navigationView}>
                    
                    <View style={{flex: 1}}>
                        <ToolbarAndroid
                            logo={require('../../img/app_logo.png')}
                            title=""
                            style={styles.toolbar}
                            navIcon={{uri: 'menu', isStatic: true}}
                            onIconClicked={this.openDrawer.bind(this)}
                            />
                        <View>
                            {/*f96332*/}
                            <TabLayout 
                                style={{backgroundColor: '#ff2561', height: 60, paddingTop: 20}} 
                                selectedTabIndicatorColor={'#fff'}
                                selectedTab={this.state.pagePosition}
                                onTabSelected={this._setPagePosition.bind(this)}>
                                <Tab name="Berita"
                                    textColor={'#ff2561'}
                                    iconSize={24}
                                    iconUri={this.state.iconPaper}/>
                                <Tab name="Event"
                                    textColor={'#ff2561'}
                                    iconSize={24}
                                    iconUri={this.state.iconCalendar}/>
                                <Tab name="Cabang"
                                    textColor={'#ff2561'}
                                    iconSize={24}
                                    iconUri={this.state.iconLocation}/>
                                <Tab name="komunitas"
                                    textColor={'#ff2561'}
                                    iconSize={24}
                                    iconUri={this.state.iconPeople}/>
                                <Tab name="Profil"
                                    textColor={'#ff2561'}
                                    iconSize={24}
                                    iconUri={this.state.iconHome}/>
                            </TabLayout>
                        </View>
                        <View style={{flex: 1}}>
                            <ViewPagerAndroid
                                style={styles.viewPager}
                                ref={viewPager => { this.viewPager = viewPager; }}
                                onPageSelected={this._setPagePosition.bind(this)}>
                                <View style={styles.content}>
                                    <PostContainer active={this.state.pagePosition === 0} navigator={this.props.navigator}/>
                                </View>
                                <View style={styles.content}>
                                    <EventContainer active={this.state.pagePosition === 1} navigator={this.props.navigator}/>
                                </View>
                                <View style={styles.content}>
                                    <CabangContainer active={this.state.pagePosition === 2} navigator={this.props.navigator}/>
                                </View>
                                <View style={styles.content}>
                                    <MenuContainer active={this.state.pagePosition === 3} navigator={this.props.navigator} type={'komunitas'} />
                                </View>
                                <View style={styles.content}>
                                    <MenuContainer active={this.state.pagePosition === 4} navigator={this.props.navigator} type={'profil'} />
                                </View>
                            </ViewPagerAndroid>
                        </View>
                    </View>
                  </DrawerLayoutAndroid>
            </View>
        );
    }
}

export default Home;