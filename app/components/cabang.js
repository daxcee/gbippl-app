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
    StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import RowStyles from '../styles/rowStyles';
import colors from '../styles/colors';

let styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class Cabang extends React.Component {
    constructor(props, context) {
        super(props, context);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            activeView: 'list',
            dataSource: ds.cloneWithRows(props.cabang),
            isRefreshing: false,
            initialPosition: {coords: {latitude: 0, longitude: 0}}
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!this.props.active && nextProps.active) {
            setTimeout(() => {
                if (this.props.cabang.length === 0) {
                    this.setState({isRefreshing: true});
                    this.props.fetchCabang().then(() => {
                        this.setState({isRefreshing: false});
                    });
                }
            });
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.cabang)
        });
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = position;
                this.setState({initialPosition});
            },
            (error) => console.log(error.message),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        );
    }
    onClickCabang(rowData) {
        this.props.navigator.push({
            name: 'cabangDetail',
            data: rowData
        });
    }
    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={this.onClickCabang.bind(this, rowData)} style={{margin: 10, marginTop: 5, marginBottom: 5, borderRadius: 5}}>
                <View style={RowStyles.rowWrap}>
                    <View style={RowStyles.rowImageTitle}>
                        <Image source={{uri: rowData.image}} style={RowStyles.rowImage}/>
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.6)']}
                            style={RowStyles.linearGradient}/>
                        <View style={RowStyles.rowItem}>
                            <Text numberOfLines={1} style={RowStyles.rowTitle}>{rowData.name}</Text>
                        </View>
                    </View>
                    <View style={RowStyles.rowInfo}>
                        <Text numberOfLines={2} style={RowStyles.rowExcerpt}>{rowData.address}</Text>
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
    onRefresh() {
        this.setState({isRefreshing: true});
        this.props.fetchCabang().then(() => {
            this.setState({isRefreshing: false});
        });
    }
    render() {
        if (!this.props.active && this.props.cabang.length === 0) return null;
        var {isRefreshing} = this.state;
        return (
            <View style={styles.container}>
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
                        {this.props.cabang.map((marker, i) => {
                            return (
                                <MapView.Marker
                                    key={i}
                                    coordinate={{
                                        latitude: parseFloat(marker.lat),
                                        longitude: parseFloat(marker.lng)
                                    }}
                                    title={marker.name}
                                    description={marker.address}
                                />
                            );
                        })}
                    </MapView>
                    :
                    <ListView
                        style={{flex: 1}}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow.bind(this)}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={this.onRefresh.bind(this)}
                                tintColor={colors.orange}
                                title="Memuat event..."
                                colors={[colors.orange, colors.orangeDark, colors.orange]}
                                progressBackgroundColor="#fff"
                            />
                        }/>
                    }
                <ActionButton
                    buttonColor={colors.orange}
                    onPress={this.onToggle.bind(this)}
                    icon={this.state.activeView == 'map' ?
                        <Icon name="ios-list" size={24} color="#fff"/>
                        :
                        <Icon name="md-pin" size={24} color="#fff"/>}
                />
            </View>
        )
    }
}


export default Cabang;
