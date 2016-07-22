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
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import RowStyles from '../styles/rowStyles';
import colors from '../styles/colors';
import { connect } from 'react-redux';
import * as cabangActions from '../actions/cabangActions';
import { bindActionCreators } from 'redux';
import Header from './header';
import Grid from './grid';
import ViewPager from 'react-native-viewpager';
var wHeight = Dimensions.get('window').height;
const contentHeight = parseInt(wHeight - 120);

class CabangPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1.id !== p2.id,
        });
        this.state = {
            refresh: false,
            loaded: false,
            dataSource: dataSource.cloneWithPages(this.props.state.cabang),
        }
    }

    selectCabang(cabang) {
        this.props.actions.selectCabang(cabang);
        this.props.navigator.push({
            name: 'wartaPage'
        });
    }

    _renderPage(data, pageID) {
        return (
            <View style={styles.slide} key={data.id}>
                <View style={styles.card}>
                    <View style={styles.cardImage}>
                        <Image
                            source={{uri: data.image}}
                            style={styles.cardImageView}
                            resizeMode={'cover'}
                            />
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>
                            {data.name}
                        </Text>
                        <Text style={styles.cardDesc}>
                            {data.address}
                        </Text>
                        <View style={styles.cardAction}>
                            <TouchableOpacity style={styles.cardButton} onPress={this.selectCabang.bind(this, data)}>
                                <View style={styles.cardButtonView}>
                                    <Text style={styles.cardButtonText}>
                                        PILIH
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    componentDidMount() {
        console.log('INIT', this.props.state.cabang);
        this.onRefresh();
    }

    onRefresh() {
        this.setState({refresh: true});
        this.props.actions.fetchCabang().then(() => {
            this.setState({refresh: false, loaded: true, dataSource: this.state.dataSource.cloneWithPages(this.props.state.cabang)});
        });
    }
   
    render() {
        return (
            <View style={styles.container}>
                <Header title="Pilih Cabang" noBack={true} navigator={this.props.navigator}/>
                <View style={styles.blue}>
                </View>
                <View style={styles.content}>
                    <ViewPager
                        style={styles.viewPager}
                        dataSource={this.state.dataSource}
                        renderPage={this._renderPage.bind(this)}
                        isLoop={this.props.state.cabang.length > 0}
                        autoPlay={false} />
                </View>
            </View>
        );
    }
}

CabangPage = connect(state => ({
        state: state.cabang
    }),
    (dispatch) => ({
        actions: bindActionCreators(cabangActions, dispatch)
    })
)(CabangPage);

let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    blue: {
        backgroundColor: colors.orange,
        height: 160,
    },
    content: {
        backgroundColor: 'transparent',
        flex: 1,
        marginTop: -100
    },
    viewPager: {
        flex: 1,
    },
    card: {
        backgroundColor: '#fff',
        flex: 1,
        marginBottom: 80,
        marginHorizontal: 40,
        borderRadius: 4
    },
    cardInfo: {
        padding: 10
    },
    cardTitle: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        color: '#000',
        marginBottom: 5
    },
    cardDesc: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 5
    },
    cardBold: {
        fontWeight: '700'
    },
    cardAction: {
        flexDirection: 'row',
        marginTop: 12,
        marginBottom: 8
    },
    cardButton: {
        flex: 1,
    },
    cardButtonText: {
        textAlign: 'center'
    },
    cardButtonView: {
        flex: 1,
        marginHorizontal: 8,
        borderWidth: 1,
        borderColor: colors.orange,
        borderRadius: 4,
        paddingVertical: 10,
    },
    cardButtonText: {
        color: colors.orange,
        textAlign: 'center'
    },
    cardImage: {
        flex: 1
    },
    cardImageView: {
        flex: 1,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    slide: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});

export default CabangPage;
