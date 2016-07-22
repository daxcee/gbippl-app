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

let styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class Post extends React.Component {
    constructor(props, context) {
        super(props, context);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(props.posts),
            isRefreshing: false,
            finish: false
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.posts),
        });
    }
    componentDidMount() {
        this.setState({isRefreshing: true, finish: false});
        this.props.fetchPost(1).then(() => {
            this.setState({isRefreshing: false});
        });
    }
    onClickPost(rowData) {
        this.props.changeActivePost(rowData.id);
        this.props.navigator.push({
            name: 'postDetail',
            data: rowData
        });
    }
    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={this.onClickPost.bind(this, rowData)} style={{margin: 10, marginTop: 5, marginBottom: 5, borderRadius: 5}}>
                <View style={RowStyles.rowWrap}>
                    <View style={RowStyles.rowImageTitle}>
                        <Image source={{uri: rowData.image}} style={RowStyles.rowImage}/>
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.6)']}
                            style={RowStyles.linearGradient}/>
                        <View style={RowStyles.rowItem}>
                            <View style={{position: 'absolute', top: 10, right: 10, backgroundColor: colors.orangeDark, borderRadius: 5, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10 }}>
                                <Text style={{color: 'white', fontSize: 10}}>
                                    {rowData.categories[0] && rowData.categories[0].name}
                                </Text>
                            </View>
                            <View style={{position: 'absolute', top: 10, left: 10}}>
                                <Text style={{color: 'white', fontSize: 10}}>
                                    {rowData.date}
                                </Text>
                            </View>
                            <Text numberOfLines={1} style={RowStyles.rowTitle}>{rowData.title}</Text>
                        </View>
                    </View>
                    <View style={RowStyles.rowInfo}>
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
    render() {
        if (!this.props.active && this.props.posts.length === 0) return null;
        var {isRefreshing} = this.state;
        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    title={'Event'}
                    style={MainStyles.toolbar}
                    titleColor={'#fff'}
                    navIcon={{uri: 'back', isStatic: true}}
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
                            title="Memuat post..."
                            colors={[colors.orange, colors.orangeDark, colors.orange]}
                            progressBackgroundColor="#fff"
                        />
                    }
                    onEndReached={this._loadMore.bind(this)}/>
            </View>
        )
    }
}


export default Post;
