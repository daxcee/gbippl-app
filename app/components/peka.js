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
    StyleSheet,
    ToolbarAndroid,
    ScrollView,
    Switch
} from 'react-native';
import MapView from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import RowStyles from '../styles/rowStyles';
import colors from '../styles/colors';
import StringHelper from '../helpers/stringHelper';
import MainStyles from '../styles/mainStyles';
import Grid from '../components/grid';
import Toolbar from '../uikit/Toolbar';
import Swiper from 'react-native-swiper';
import * as postActions from '../actions/postActions';

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    slide: {
        flex: 1,
        backgroundColor: colors.orange,
        height: 170,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    image: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: 170,
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

class Peka extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activeView: 'list',
            isRefreshing: false,
            finish: false,
            initialPosition: {coords: {latitude: 0, longitude: 0}}
        }
    }
    componentDidMount() {
        this.setState({isRefreshing: true});
        this.props.fetchPekaPost().then(() => {
            this.setState({isRefreshing: false});
        });
        this.props.fetchPeka(1).then(() => {
            this.setState({isRefreshing: false});
        });
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = position;
                // Alert.alert('ppl', JSON.stringify(initialPosition));
                this.setState({initialPosition});
            },
            (error) => console.log(error.message),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        );
    }
    onClickPeka(rowData) {
        this.props.navigator.push({
            name: 'pekaDetail',
            data: rowData
        });
    }
    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={this.onClickPeka.bind(this, rowData)} style={{margin: 10, marginTop: 5, marginBottom: 5, borderRadius: 5}}>
                <View style={RowStyles.rowWrap}>
                    <View style={RowStyles.rowImageTitle}>
                        <Image source={{uri: rowData.image || ''}} style={RowStyles.rowImage}/>
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.6)']}
                            style={RowStyles.linearGradient}/>
                        <View style={RowStyles.rowItem}>
                            <Text numberOfLines={1} style={RowStyles.rowTitle}>{rowData.title}</Text>
                        </View>
                    </View>
                    <View style={RowStyles.rowInfo}>
                        <Text numberOfLines={2} style={RowStyles.rowExcerpt}>{StringHelper.cleanText(rowData.content)}</Text>
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
            this.props.fetchPeka(this.props.page + 1).then((peka) => {
                if (peka.length === 0) {
                    this.setState({finish: true});
                }
                this.setState({isRefreshing: false});
            });
        }
    }
    onRefresh() {
        this.setState({isRefreshing: true, finish: false});
        this.props.fetchPeka(1).then((peka) => {
            this.setState({isRefreshing: false});
        });
    }
    selectPost(post) {
        this.props.changeActivePost(post);
        this.props.navigator.push({
            name: 'postDetail',
            data: post
        });
    }
    _renderPage(data) {
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
        var {isRefreshing} = this.state;
        var swiper = (
            <Swiper
                height={170}
                loop={this.props.pinned.length > 0}
                autoplay={this.props.pinned.length > 0}
                key={'swiper-'+this.props.pinned.length}>
                {this.props.pinned.map(post => {
                    return this._renderPage(post);
                })}
            </Swiper>
        );
        var gridItems = this.props.peka.map(peka => {
            return {
                name: peka.title,
                image: peka.image,
                onPress: this.onClickPeka.bind(this, peka)
            }
        });
        return (
            <View style={styles.container}>
                <Toolbar
                    title={'Peka'}
                    style={MainStyles.toolbar}
                    titleColor={'#fff'}
                    navIconName={'md-arrow-back'}
                    onIconClicked={() => this.props.navigator.pop()}
                    />
                {this.state.activeView == 'map' ?
                    <MapView
                        style={{flex: 1}}
                        initialRegion={{
                            latitude: -6.906872,
                            longitude: 107.612695,
                            latitudeDelta: 0.08,
                            longitudeDelta: 0.08,
                        }}>
                        <MapView.Marker 
                            coordinate={{
                                latitude: parseFloat(this.state.initialPosition && this.state.initialPosition.coords.latitude || 0),
                                longitude: parseFloat(this.state.initialPosition && this.state.initialPosition.coords.longitude || 0),
                            }}
                            pinColor={'green'}
                            title={'Posisi Saya'}
                            description={'Posisi Sekarang'} />
                        {this.props.peka.map((marker, i) => {
                            if (marker.lat && marker.lng) {
                                return (
                                    <MapView.Marker
                                        key={i}
                                        coordinate={{
                                            latitude: parseFloat(marker.lat),
                                            longitude: parseFloat(marker.lng)
                                        }}
                                        title={marker.title}
                                        description={marker.address}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </MapView>
                    :
                    <Grid
                        items={gridItems}
                        refresh={this.state.isRefreshing}
                        onRefresh={this.onRefresh.bind(this)}
                        onEndReached={this._loadMore.bind(this)}
                        header={(
                            <View>
                                {swiper}
                                <View style={{height: 40, padding: 8, backgroundColor: '#fff', marginBottom: 10, flexDirection: 'row'}}>
                                    <Switch
                                        value={this.props.isAll}
                                        onValueChange={(checked) => {
                                            this.props.setIsAll(checked);
                                            this.onRefresh();
                                        }}
                                        />
                                    <Text>Tampilkan Peka Semua Cabang</Text>
                                </View>
                            </View>
                        )}
                        />
                    }
                <ActionButton
                    buttonColor={colors.orange}
                    onPress={this.onToggle.bind(this)}
                    icon={this.state.activeView == 'map' ?
                        <Icon name="md-list" size={24} color="#fff"/>
                        :
                        <Icon name="md-pin" size={24} color="#fff"/>}
                />
            </View>
        )
    }
}


export default Peka;
