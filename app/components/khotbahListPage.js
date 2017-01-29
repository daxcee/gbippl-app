import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ViewPagerAndroid,
    ListView,
    Alert,
    RefreshControl,
    StyleSheet,
    ToolbarAndroid,
    Switch,
    Image
} from 'react-native';
import MapView from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import RowStyles from '../styles/rowStyles';
import colors from '../styles/colors';
import StringHelper from '../helpers/stringHelper';
import MainStyles from '../styles/mainStyles';
import Grid from '../components/grid';
import * as menuActions from '../actions/menuActions';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Toolbar from '../uikit/Toolbar';

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    zoomWrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#000'
    }
});

class KhotbahListPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(props.state.khotbah),
            isRefreshing: false,
            finish: false,
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.state.khotbah),
        });
    }
    componentDidMount() {
        this.setState({isRefreshing: true});
        this.props.actions.fetchKhotbah(1).then(() => {
            this.setState({isRefreshing: false});
        });
    }
    onClickKhotbah(rowData) {
        this.props.actions.changeActiveKhotbah(rowData);
        this.props.navigator.push({
            name: 'khotbahDetail'
        });
    }
    _loadMore() {
        if (!this.state.finish) {
            this.setState({isRefreshing: true});
            this.props.actions.fetchKhotbah(this.props.state.pageKhotbah + 1).then((khotbah) => {
                if (khotbah.length === 0) {
                    this.setState({finish: true});
                }
                this.setState({isRefreshing: false});
            });
        }
    }
    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={this.onClickKhotbah.bind(this, rowData)} style={{margin: 10, marginTop: 5, marginBottom: 5, borderRadius: 5}}>
                <View style={RowStyles.rowWrap}>
                    <View style={RowStyles.rowImageWrap}>
                        <Image source={{uri: rowData.image || ''}} style={RowStyles.rowImage}/>
                        <View style={RowStyles.rowItem}>
                            <View style={{position: 'absolute', top: 10, right: 10, backgroundColor: colors.orangeDark, borderRadius: 5, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10 }}>
                                <Text style={{color: 'white', fontSize: 10}}>
                                    {rowData.categories && rowData.categories[0] && rowData.categories[0].name}
                                </Text>
                            </View>
                            <View style={{position: 'absolute', top: 10, left: 10}}>
                                <Text style={{color: 'white', fontSize: 10}}>
                                    {rowData.date}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={RowStyles.rowInfo}>
                        <Text style={RowStyles.rowTitle}>{rowData.title}</Text>
                        <Text numberOfLines={2} style={RowStyles.rowExcerpt}>{StringHelper.cleanText(rowData.excerpt)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    onRefresh() {
        this.setState({isRefreshing: true, finish: false});
        this.props.actions.fetchKhotbah(1).then((khotbah) => {
            this.setState({isRefreshing: false});
        });
    }
    render() {
        var {isRefreshing} = this.state;
        var {state} = this.props;

        return (
            <View style={styles.container}>
                <Toolbar
                    title={'Ringkasan Khotbah'}
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
                            title="Memuat post..."
                            colors={[colors.orange, colors.orangeDark, colors.orange]}
                            progressBackgroundColor="#fff"
                        />
                    }
                    renderHeader={() => (
                        <View style={{height: 40, padding: 8, backgroundColor: '#fff', marginBottom: 10, flexDirection: 'row'}}>
                            <Switch
                                value={state.isAllCabang}
                                onValueChange={(checked) => {
                                    this.props.actions.setIsAllCabang(checked);
                                    this.onRefresh();
                                }}
                                />
                            <Text>Tampilkan Ringkasan Khotbah Semua Cabang</Text>
                        </View>
                    )}
                    onEndReached={this._loadMore.bind(this)}/>
            </View>
        )
    }
}


export default connect(state => ({
        state: state.menus
    }),
    (dispatch) => ({
        actions: bindActionCreators(menuActions, dispatch)
    })
)(KhotbahListPage);
