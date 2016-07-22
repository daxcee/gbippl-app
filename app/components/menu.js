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
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../styles/colors';

let styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

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
                this.setState({isRefreshing: true});
                this.props.fetchMenu(this.props.type).then(() => {
                    this.setState({isRefreshing: false});
                });
            });
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.menus)
        });
    }
    onClickMenu(rowData) {
        this.props.changeActivePage(this.props.type, rowData.page_id);
        this.props.navigator.push({
            name: 'pageDetail',
            data: rowData,
            type: this.props.type
        });
    }
    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={this.onClickMenu.bind(this, rowData)}>
                <View style={{height: 70, padding: 15, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
                    <View style={{width: 40, height: 40, position: 'absolute', right: 15}}>
                        <Image source={{uri: rowData.icon || null}} style={{width: 48, height: 48}}/>
                    </View>
                    <Text>{rowData.title}</Text>
                </View>
            </TouchableOpacity>
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
        var {isRefreshing} = this.state;
        return (
            <View style={styles.container}>
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
            </View>
        )
    }
}

Menu.defaultProps = {
    type: 'profil'
};


export default Menu;
