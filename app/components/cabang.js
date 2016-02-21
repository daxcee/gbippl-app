import React, {
    View,
    Text,
    TouchableNativeFeedback,
    ViewPagerAndroid,
    Image,
    ListView,
    Alert,
    PullToRefreshViewAndroid
} from 'react-native';
// import MapView from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

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
            activeView: 'map',
            dataSource: ds.cloneWithRows(props.cabang),
            isRefreshing: false
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.cabang)
        });
    }
    componentDidMount() {
        this.props.fetchCabang();
    }
    onClickCabang(rowData) {
        this.props.navigator.push({
            name: 'cabangDetail',
            data: rowData
        });
    }
    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableNativeFeedback onPress={this.onClickCabang.bind(this, rowData)}>
                <View style={{height: 100, borderBottomWidth: 1, borderColor: '#ddd', marginBottom: 1}}>
                    <Image source={{uri: rowData.image}} style={{position: 'absolute', left: 0, right: 0, top: 0, height: 100, resizeMode: 'cover'}}/>
                    <View style={{backgroundColor: 'rgba(0,0,0,.65)', position: 'absolute', left: 0, right: 0, top: 0, height: 100, padding: 20, justifyContent: 'center'}}>
                        <Text style={{color: '#fff', fontSize: 20, fontFamily: 'Gotham-Black'}}>{rowData.name}</Text>
                        <Text style={{color: 'rgba(255,255,255,.7)', fontSize: 13, fontFamily: 'Gotham-Book'}}>{rowData.address}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
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
        return (
            <View style={styles.container}>
                {this.state.activeView == 'map' ?
                    <div />
                    // <MapView
                    //     style={{flex: 1}}
                    //     initialRegion={{
                    //         latitude: -6.906872,
                    //         longitude: 107.612695,
                    //         latitudeDelta: 0.08,
                    //         longitudeDelta: 0.08,
                    //     }}>
                    //     {this.props.cabang.map((marker, i) => {
                    //         return (
                    //             <MapView.Marker
                    //                 key={i} 
                    //                 coordinate={{
                    //                     latitude: parseFloat(marker.lat),
                    //                     longitude: parseFloat(marker.lng)
                    //                 }}
                    //                 title={marker.name}
                    //                 description={marker.address}
                    //             />
                    //         );
                    //     })}
                    // </MapView>
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
                    buttonColor="rgba(231,76,60,1)"
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