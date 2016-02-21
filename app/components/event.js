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

class Event extends React.Component {
    constructor(props, context) {
        super(props, context);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(props.event),
            isRefreshing: false
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.event)
        });
    }
    componentDidMount() {
        this.props.fetchEvent();
    }
    onClickEvent(rowData) {
        this.props.navigator.push({
            name: 'eventDetail',
            data: rowData
        });
    }
    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableNativeFeedback onPress={this.onClickEvent.bind(this, rowData)}>
                <View style={{height: 100, borderBottomWidth: 1, borderColor: '#ddd', marginBottom: 1}}>
                    <Image source={{uri: rowData.image}} style={{position: 'absolute', left: 0, right: 0, top: 0, height: 100, resizeMode: 'cover'}}/>
                    <View style={{backgroundColor: 'rgba(0,0,0,.65)', position: 'absolute', left: 0, right: 0, top: 0, height: 100, padding: 20, justifyContent: 'center'}}>
                        <Text style={{color: '#fff', fontSize: 20, fontFamily: 'Gotham-Black'}}>{rowData.name}</Text>
                        <Text numberOfLines={1} style={{color: 'rgba(255,255,255,.7)', fontSize: 13, fontFamily: 'Gotham-Book'}}>{rowData.description}</Text>
                        <Text style={{color: 'rgba(255,255,255,.7)', fontSize: 13, fontFamily: 'Gotham-Book'}}>{rowData.date} • {rowData.time} • {rowData.place}</Text>
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
        this.props.fetchEvent().then(() => {
            this.setState({isRefreshing: false});
        });
    }
    render() {
        return (
            <View style={styles.container}>
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
                </PullToRefreshViewAndroid>
            </View>
        )
    }
}


export default Event;