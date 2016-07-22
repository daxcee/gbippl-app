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
    Liking
} from 'react-native';
import MapView from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import RowStyles from '../styles/rowStyles';
import colors from '../styles/colors';
import StringHelper from '../helpers/stringHelper';
var Mailer = require('NativeModules').RNMail;

let styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class Ministry extends React.Component {
    constructor(props, context) {
        super(props, context);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            activeView: 'list',
            dataSource: ds.cloneWithRows(props.ministry),
            isRefreshing: false,
            finish: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!this.props.active && nextProps.active) {
            setTimeout(() => {
                if (this.props.ministry.length == 0) {
                    this.setState({isRefreshing: true});
                    this.props.fetchMinistry(1).then(() => {
                        this.setState({isRefreshing: false});
                    });
                }
            });
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.ministry)
        });
    }
    componentDidMount() {
        // setTimeout(() => {
        //     this.props.fetchMinistry();
        // });
    }
    onClickMinistry(rowData) {
        this.props.navigator.push({
            name: 'ministryDetail',
            data: rowData
        });
    }
    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={this.onClickMinistry.bind(this, rowData)} style={{margin: 10, marginTop: 5, marginBottom: 5, borderRadius: 5}}>
                <View style={RowStyles.rowWrap}>
                    <View style={RowStyles.rowImageTitle}>
                        <Image source={{uri: rowData.image}} style={RowStyles.rowImage}/>
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.6)']}
                            style={RowStyles.linearGradient}/>
                        <View style={RowStyles.rowItem}>
                            {rowData.categories ?
                                <View style={{position: 'absolute', top: 10, right: 10, backgroundColor: colors.orangeDark, borderRadius: 5, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10 }}>
                                    <Text style={{color: 'white', fontSize: 10}}>
                                        {rowData.categories[0] && rowData.categories[0].name}
                                    </Text>
                                </View>
                                : null}
                            <View style={{position: 'absolute', top: 10, left: 10}}>
                                <Text style={{color: 'white', fontSize: 10}}>
                                    {rowData.date}
                                </Text>
                            </View>
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
    _loadMore() {
        if (!this.state.finish) {
            this.setState({isRefreshing: true});
            this.props.fetchMinistry(this.props.page + 1).then((ministry) => {
                if (ministry.length === 0) {
                    this.setState({finish: true});
                }
                this.setState({isRefreshing: false});
            });
        }
    }
    onEmail() {
        Mailer.mail({
            subject: 'Kirim Pesan',
            recipients: ['gbippl@gmail.com'],
            body: '',
        }, (error, event) => {
            if(error) {
              Alert.alert('Error', 'Tidak dapat mengirim email. Silakan kirim ke gbippl@gmail.com');
            }
        });
    }
    onRefresh() {
        this.setState({isRefreshing: true, finish: false});
        this.props.fetchMinistry(1).then(() => {
            this.setState({isRefreshing: false});
        });
    }
    render() {
        if (!this.props.active && this.props.ministry.length === 0) return null;
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
                        {this.props.ministry.map((marker, i) => {
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
                        }
                        onEndReached={this._loadMore.bind(this)}/>
                    }
                <ActionButton
                    buttonColor={colors.orange}
                    onPress={this.onEmail.bind(this)}
                    icon={<Icon name="ios-mail" size={24} color="#fff"/>}
                />
            </View>
        )
    }
}


export default Ministry;
