import React, {
    View,
    Text,
    TouchableOpacity,
    ViewPagerAndroid,
    Image,
    ListView,
    Alert,
    PullToRefreshViewAndroid,
    ProgressBarAndroid,
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

class Post extends React.Component {
    constructor(props, context) {
        super(props, context);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(props.posts),
            isRefreshing: false,
            isLoaded: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!this.props.active && nextProps.active) {
            setTimeout(() => {
                this.props.fetchPost();
            });
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.posts),
            isLoaded: true
        });
    }
    componentDidMount() {
        setTimeout(() => {
            this.props.fetchPost();
        }, 100);
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
            <TouchableOpacity onPress={this.onClickPost.bind(this, rowData)}>
                <View style={RowStyles.rowWrap} renderToHardwareTextureAndroid={true}>
                    <Image source={{uri: rowData.image}} style={RowStyles.rowImage}/>
                    <LinearGradient
                        colors={['transparent', 'black']}
                        style={RowStyles.linearGradient}/>
                    <View style={RowStyles.rowItem}>
                        <View style={{position: 'absolute', top: 10, right: 10, backgroundColor: '#ff2561', borderRadius: 10, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10 }}>
                            <Text style={{color: 'white', fontSize: 10}}>
                                {rowData.categories[0] && rowData.categories[0].name}
                            </Text>
                        </View>
                        <View style={{position: 'absolute', top: 10, left: 10}}>
                            <Text style={{color: 'white', fontSize: 10}}>
                                {rowData.date}
                            </Text>
                        </View>
                        <Text style={RowStyles.rowTitle}>{rowData.title}</Text>
                        <Text numberOfLines={1} style={RowStyles.rowExcerpt}>{rowData.excerpt}</Text>
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
        this.props.fetchPost().then(() => {
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
        if (!this.state.isLoaded)
            return this.renderLoadingView();
        return (
            <View style={styles.container}>
                <PullToRefreshViewAndroid
                    style={{flex: 1}}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.onRefresh.bind(this)}
                    colors={['#ff2561', '#ff2561', '#ff2561']}
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


export default Post;