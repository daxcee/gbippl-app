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
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

let styles = {
    container: {
        flex: 1
    }
};

class Menu extends React.Component {
    constructor(props, context) {
        super(props, context);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(props.menus),
            isRefreshing: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!this.props.active && nextProps.active) {
            setTimeout(() => {
                this.props.fetchMenu(this.props.type);
            });
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.menus)
        });
    }
    onClickMenu(rowData) {
        this.props.changeActiveMenu(this.props.type, rowData.page_id);
        this.props.navigator.push({
            name: 'menuDetail',
            data: rowData,
            type: this.props.type
        });
    }
    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableNativeFeedback onPress={this.onClickMenu.bind(this, rowData)}>
                <View style={{height: 70, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
                    <View style={{width: 48, height: 48, margin: 8}}>
                        <Image source={{uri: rowData.icon || null}} style={{width: 48, height: 48}}/>
                    </View>
                    <Text style={{fontFamily: 'Gotham-Book', fontSize: 16}}>{rowData.title}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
    onRefresh() {
        this.setState({isRefreshing: true});
        this.props.fetchMenu(this.props.type).then(() => {
            this.setState({isRefreshing: false});
        });
    }
    render() {
        if (!this.props.active && this.props.menus.length === 0) return null;
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

Menu.defaultProps = {
    type: 'profil'
};


export default Menu;