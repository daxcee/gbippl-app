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
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import RowStyles from './rowStyles';

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
            isRefreshing: false,
            isLoaded: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!this.props.active && nextProps.active) {
            setTimeout(() => {
                this.props.fetchEvent();
            });
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.event),
            isLoaded: true
        });
    }
    onClickEvent(rowData) {
        this.props.navigator.push({
            name: 'eventDetail',
            data: rowData
        });
    }
    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={this.onClickEvent.bind(this, rowData)}>
                <View style={RowStyles.rowWrap} renderToHardwareTextureAndroid={true}>
                    <Image source={{uri: rowData.image}} style={RowStyles.rowImage}/>
                    <LinearGradient
                        colors={['transparent', 'black']}
                        style={RowStyles.linearGradient}/>
                    <View style={RowStyles.rowItem}>
                        <Text style={RowStyles.rowTitle}>{rowData.title}</Text>
                        <Text numberOfLines={1} style={RowStyles.rowExcerpt}>{rowData.excerpt}</Text>
                        <Text style={RowStyles.rowMeta}>{rowData.date} • {rowData.time} • {rowData.place}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    onRefresh() {
        this.setState({isRefreshing: true});
        this.props.fetchEvent().then(() => {
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
    render() {
        if (!this.props.active && this.props.event.length === 0) return null;
        if (!this.state.isLoaded)
            return this.renderLoadingView();
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