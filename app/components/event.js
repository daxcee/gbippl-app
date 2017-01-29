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
    ToolbarAndroid
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import RowStyles from '../styles/rowStyles';
import colors from '../styles/colors';
import MainStyles from '../styles/mainStyles';
import Toolbar from '../uikit/Toolbar';

let styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class Event extends React.Component {
    constructor(props, context) {
        super(props, context);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(props.event),
            isRefreshing: false,
            finish: false
        }
    }
    componentDidMount() {
        setTimeout(() => {
            if (this.props.event.length == 0) {
                this.setState({isRefreshing: true});
                this.props.fetchEvent(1).then(() => {
                    this.setState({isRefreshing: false});
                });
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.event)
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
            <TouchableOpacity onPress={this.onClickEvent.bind(this, rowData)} style={{margin: 10, marginTop: 5, marginBottom: 5, borderRadius: 5}}>
                <View style={RowStyles.rowWrap}>
                    <View style={RowStyles.rowImageWrap}>
                        <Image source={{uri: rowData.image || ''}} style={RowStyles.rowImage}/>
                    </View>
                    <View style={RowStyles.rowInfo}>
                        <Text style={RowStyles.rowTitle}>{rowData.title}</Text>
                        <Text numberOfLines={2} style={RowStyles.rowExcerpt}>{rowData.excerpt}</Text>
                        <Text style={RowStyles.rowMeta}>{rowData.date} • {rowData.time} • {rowData.place}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    _loadMore() {
        if (!this.state.finish) {
            this.setState({isRefreshing: true});
            this.props.fetchEvent(this.props.page + 1).then((event) => {
                if (event.length === 0) {
                    this.setState({finish: true});
                }
                this.setState({isRefreshing: false});
            });
        }
    }
    onRefresh() {
        this.setState({isRefreshing: true, finish: false});
        this.props.fetchEvent(1).then((event) => {
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
        // if (!this.props.active && this.props.event.length === 0) return null;
        var {isRefreshing} = this.state;

        return (
            <View style={styles.container}>
                <Toolbar
                    title={'Event'}
                    style={MainStyles.toolbar}
                    titleColor={'#fff'}
                    navIconName={'md-arrow-back'}
                    onIconClicked={() => this.props.navigator.pop()}
                    />
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
            </View>
        )
    }
}


export default Event;
