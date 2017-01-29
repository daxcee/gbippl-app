import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ViewPagerAndroid,
    Image,
    ListView,
    Alert,
    RefreshControl,
    ProgressBarAndroid,
    StyleSheet,
    ToolbarAndroid
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import RowStyles from '../styles/rowStyles';
import MainStyles from '../styles/mainStyles';
import colors from '../styles/colors';
import StringHelper from '../helpers/stringHelper';
import Toolbar from '../uikit/Toolbar';
// import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import Swiper from 'react-native-swiper';

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    tabbar: {
        backgroundColor: colors.orange,
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        backgroundColor: '#fff',
    },
    label: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 8
    },
    slide: {
        flex: 1,
        backgroundColor: colors.orange,
        height: 100,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    image: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: 100,
    },
    heading: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 18,
        backgroundColor: 'transparent'
    },
});

class Post extends React.Component {
    constructor(props, context) {
        super(props, context);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            index: 0,
            dataSource: ds.cloneWithRows([]),
            data: [],
            isRefreshing: false,
            finish: false,
            routes: [
                { key: '1', title: 'Info' },
                { key: '2', title: 'Kategori' }
            ],
            loaded: false,
        }
    }
    _handleChangeTab(index) {
        this.setState({
            index,
        });
    }
    _renderHeader(props) {
        return (
            <TabBarTop
                {...props}
                scrollEnabled
                pressColor='rgba(0, 0, 0, .2)'
                indicatorStyle={styles.indicator}
                style={styles.tabbar}
                labelStyle={styles.label}
                />
        );
    }
    _renderScene({ route }) {
        if (Math.abs(this.state.index - this.state.routes.indexOf(route)) > 1) {
            return null;
        }
        if (this.props.appSettings) {
            var category = this.props.appSettings.categories[parseInt(route.key)];
            var {isRefreshing} = this.state;
            return (
                <View style={{flex: 1}} key={category + parseInt(route.key)}>
                    <ListView
                        style={{flex: 1}}
                        dataSource={this.state.data[parseInt(route.key)] || this.state.dataSource}
                        renderRow={this._renderRow.bind(this)}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={this.onRefresh.bind(this)}
                                tintColor={colors.orange}
                                title="Memuat post..."
                                colors={[colors.orange, colors.orangeDark, colors.orange]}
                                progressBackgroundColor="#fff"
                            />
                        }
                        onEndReached={this._loadMore.bind(this)}/>
                </View>
            );
        } else {
            return <View />;
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.appSettings && nextProps.appSettings.categories) {
            var data = [];
            var routes = [];
            nextProps.appSettings.categories.forEach((category, i) => {
                routes.push({key: i + '', title: category});
                data.push(this.state.dataSource.cloneWithRows(nextProps.posts.filter((post) => {
                    return post.categories.filter((item) => item.name.toLowerCase() === category.toLowerCase()).length > 0;
                })));
            })
            this.setState({
                data,
                routes,
                loaded: true
            });
        }
    }
    componentDidMount() {
        this.setState({isRefreshing: true, finish: false});
        this.props.fetchPost(1).then(() => {
            this.setState({isRefreshing: false});
        });
        this.props.fetchAppSettings().then(() => {
            this.setState({refresh: false});
        });
    }
    onClickPost(rowData) {
        this.props.changeActivePost(rowData);
        this.props.navigator.push({
            name: 'postDetail',
            data: rowData
        });
    }
    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={this.onClickPost.bind(this, rowData)} style={{margin: 10, marginTop: 5, marginBottom: 5, borderRadius: 5}}>
                <View style={RowStyles.rowWrap}>
                    <View style={RowStyles.rowImageWrap}>
                        <Image source={{uri: rowData.image || ''}} style={RowStyles.rowImage}/>
                        <View style={RowStyles.rowItem}>
                            <View style={{position: 'absolute', top: 10, right: 10, backgroundColor: colors.orangeDark, borderRadius: 5, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10 }}>
                                <Text style={{color: 'white', fontSize: 10}}>
                                    {rowData.categories && rowData.categories[0] && rowData.categories[0].name}
                                </Text>
                            </View>
                            <View style={{position: 'absolute', top: 10, left: 10}}>
                                <Text style={{color: 'white', fontSize: 10}}>
                                    {rowData.date}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={RowStyles.rowInfo}>
                        <Text style={RowStyles.rowTitle}>{rowData.title}</Text>
                        <Text numberOfLines={2} style={RowStyles.rowExcerpt}>{StringHelper.cleanText(rowData.excerpt)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    onToggle() {
        if (this.state.activeView == 'map')
            this.setState({activeView: 'list'})
        else
            this.setState({activeView: 'map'})
    }
    _loadMore() {
        if (!this.state.finish) {
            this.setState({isRefreshing: true});
            this.props.fetchPost(this.props.page + 1).then((posts) => {
                if (posts.length === 0) {
                    this.setState({finish: true});
                }
                this.setState({isRefreshing: false});
            });
        }
    }
    onRefresh() {
        this.setState({isRefreshing: true, finish: false});
        this.props.fetchPost(1).then((posts) => {
            this.setState({isRefreshing: false});
        });
    }
    renderLoadingView() {
        return (
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <ProgressBarAndroid styleAttr="Small"/>
                <Text style={{textAlign: 'center'}}>
                    Memuat konten...
                </Text>
            </View>
        )
    }
    selectPost(post) {
        this.props.actions.post.changeActivePost(post);
        this.props.navigator.push({
            name: 'postDetail',
            data: post
        });
    }
    _renderItem(data) {
        return (
            <TouchableOpacity key={data.id} onPress={this.selectPost.bind(this, data)} style={{flex: 1}}>
                <View style={styles.slide}>
                    <Image source={{uri: data.image}} style={styles.image} />
                    <Text style={styles.heading}>{data.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        if (!this.props.active && this.props.posts.length === 0) return null;
        var {isRefreshing} = this.state;
        // var swiper = (
        //     <Swiper
        //         height={100}
        //         loop={this.props.pinned.length > 0}
        //         autoplay={this.props.pinned.length > 0}
        //         key={'swiper-'+this.props.pinned.length}>
        //         {this.props.pinned.map(post => {
        //             return this._renderItem(post);
        //         })}
        //     </Swiper>
        // );
        return (
            <View style={styles.container}>
                <Toolbar
                    title={'Info Terbaru'}
                    style={MainStyles.toolbar}
                    titleColor={'#fff'}
                    navIconName={'md-arrow-back'}
                    onIconClicked={() => this.props.navigator.pop()}
                    />
                {/*swiper*/}
                <TabViewAnimated
                    style={{flex: 1}}
                    navigationState={this.state}
                    renderScene={this._renderScene.bind(this)}
                    renderHeader={this._renderHeader.bind(this)}
                    onRequestChangeTab={this._handleChangeTab.bind(this)}
                    />
            </View>
        )
    }
}


export default Post;
