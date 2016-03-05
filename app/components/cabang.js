import React, {
    View,
    Text,
    TouchableOpacity,
    ViewPagerAndroid,
    Image,
    ListView,
    Alert,
    PullToRefreshViewAndroid
} from 'react-native';
import MapView from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import RowStyles from './rowStyles';

let styles = {
    container: {
        flex: 1
    }
};

class Cabang extends React.Component {
    constructor(props, context) {
        super(props, context);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            activeView: 'list',
            dataSource: ds.cloneWithRows(props.cabang),
            isRefreshing: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!this.props.active && nextProps.active) {
            setTimeout(() => {
                this.props.fetchCabang();
            });
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.cabang)
        });
    }
    componentDidMount() {
        // setTimeout(() => {
        //     this.props.fetchCabang();
        // });
    }
    onClickCabang(rowData) {
        this.props.navigator.push({
            name: 'cabangDetail',
            data: rowData
        });
    }
    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={this.onClickCabang.bind(this, rowData)}>
                <View style={RowStyles.rowWrap}>
                    <Image source={{uri: rowData.image}} style={RowStyles.rowImage}/>
                    <LinearGradient
                        colors={['transparent', 'black']}
                        style={RowStyles.linearGradient}/>
                    <View style={RowStyles.rowItem}>
                        <Text style={RowStyles.rowTitle}>{rowData.name}</Text>
                        <Text style={RowStyles.rowExcerpt}>{rowData.address}</Text>
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
                    <PullToRefreshViewAndroid
                        style={{flex: 1}}
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh.bind(this)}
                        colors={['#f7913d', '#f7913d', '#f7913d']}
                        progressBackgroundColor={'#fff'}
                        >
                        <ListView 
                            style={{flex: 1}}
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow.bind(this)}
                        />
                    </PullToRefreshViewAndroid>}
                <ActionButton 
                    buttonColor="#ff2561"
                    onPress={this.onToggle.bind(this)}
                    icon={this.state.activeView == 'map' ?
                        <Icon name="android-list" size={24} color="#fff"/>
                        :
                        <Icon name="ios-location" size={24} color="#fff"/>}
                />
            </View>
        )
    }
}


export default Cabang;