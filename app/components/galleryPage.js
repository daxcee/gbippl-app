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
    Platform
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
import * as galleryActions from '../actions/galleryActions';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import ImageZoom from 'react-native-image-zoom';
import Toolbar from '../uikit/Toolbar';

if (Platform.OS == 'ios') {
    var {Image} = require('react-native');
    var ImageView = Image;
} else {
    var ImageView = ImageZoom;
}

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

class GalleryPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isRefreshing: false,
            finish: false,
            zoom: false,
            activeImage: null
        }
    }
    componentDidMount() {
        this.setState({isRefreshing: true});
        this.props.actions.fetchGallery(1).then(() => {
            this.setState({isRefreshing: false});
        });
    }
    onClickGallery(rowData) {
        this.setState({
            activeImage: rowData.image,
            zoom: true
        });
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
            this.props.actions.fetchGallery(this.props.page + 1).then((gallery) => {
                if (gallery.length === 0) {
                    this.setState({finish: true});
                }
                this.setState({isRefreshing: false});
            });
        }
    }
    onRefresh() {
        this.setState({isRefreshing: true, finish: false});
        this.props.actions.fetchGallery(1).then((gallery) => {
            this.setState({isRefreshing: false});
        });
    }
    render() {
        var {isRefreshing} = this.state;

        var gridItems = this.props.state.gallery.map(gallery => {
            return {
                name: gallery.title,
                image: gallery.image,
                onPress: this.onClickGallery.bind(this, gallery)
            }
        });
        return (
            <View style={styles.container}>
                <Toolbar
                    title={'Gallery'}
                    style={MainStyles.toolbar}
                    titleColor={'#fff'}
                    navIconName={'md-arrow-back'}
                    onIconClicked={() => this.props.navigator.pop()}
                    />
                <Grid
                    items={gridItems}
                    refresh={this.state.isRefreshing}
                    onRefresh={this.onRefresh.bind(this)}
                    onEndReached={this._loadMore.bind(this)}
                    />
                {this.state.zoom ?
                    <View style={styles.zoomWrap}>
                        <ImageView
                            style={{flex: 1}}
                            source={{
                                uri: this.state.activeImage
                            }}>
                        </ImageView>
                        <Text style={{color: '#fff'}} onPress={() => this.setState({activeImage: null, zoom: false})}>Tutup</Text>
                    </View>
                    : null}
            </View>
        )
    }
}


export default connect(state => ({
        state: state.gallery
    }),
    (dispatch) => ({
        actions: bindActionCreators(galleryActions, dispatch)
    })
)(GalleryPage);
