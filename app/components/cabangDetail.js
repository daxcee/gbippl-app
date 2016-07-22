import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Alert,
    ToolbarAndroid,
    ScrollView,
    Linking,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as menuActions from '../actions/menuActions';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import Button from 'apsl-react-native-button';
import ActionButton from 'react-native-action-button';
import MainStyles from '../styles/mainStyles';
import RowStyles from '../styles/rowStyles';
import LinearGradient from 'react-native-linear-gradient';


let styles = StyleSheet.create({
    heading: {
        fontSize: 28,
        color: '#000'
    },
    address: {
        fontSize: 13,
        color: '#777'
    }
});

class CabangDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    onDirection() {
        const { cabang } = this.props;
        Linking.openURL(`http://maps.google.com/maps?q=loc:${cabang.lat},${cabang.lng} (${cabang.name})`).catch(err => console.error('An error occurred', err));
    }
    componentDidMount() {
        this.props.actions.receiveMenu('cabang', this.props.cabang.menus);
    }
    onClickMenu(menu) {
        this.props.actions.changeActivePage('cabang', menu.id);
        this.props.navigator.push({
            name: 'pageDetail',
            data: menu,
            type: 'cabang'
        });
    }
    _renderRow(menu) {
        return (
            <TouchableOpacity key={menu.id} onPress={this.onClickMenu.bind(this, menu)} style={{margin: 10, marginTop: 5, marginBottom: 5, borderRadius: 5}}>
                <View style={RowStyles.rowWrap}>
                    <View style={RowStyles.rowImageTitle}>
                        <Image source={{uri: menu.image}} style={RowStyles.rowImage}/>
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.6)']}
                            style={RowStyles.linearGradient}/>
                        <View style={RowStyles.rowItem}>
                            <Text numberOfLines={1} style={RowStyles.rowTitle}>{menu.title}</Text>
                        </View>
                    </View>
                    <View style={RowStyles.rowInfo}>
                        <Text numberOfLines={2} style={RowStyles.rowExcerpt}>{menu.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        const { state, actions, navigator, cabang } = this.props;
        
        return (
            <View style={{flex: 1}}>
                {Platform.OS === 'android' ? 
                    <ToolbarAndroid
                        title={cabang.name}
                        style={MainStyles.toolbar}
                        titleColor={'#fff'}
                        navIcon={{uri: 'back', isStatic: true}}
                        onIconClicked={() => this.props.navigator.pop()}
                        />
                    :
                    <View style={[MainStyles.toolbar, {alignItems: 'center', justifyContent: 'center'}]}>
                        <Text numberOfLines={1} style={MainStyles.toolbarText}>{cabang.name}</Text>
                    </View>}
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <ScrollView>
                        <Image source={{uri: cabang.image}} style={{resizeMode: 'cover', height: 150, left: 0, right: 0}}/>
                        <View style={{padding: 15, marginBottom: 20}}>
                            <Text style={styles.address}>
                                {cabang.address}
                            </Text>
                            <Text style={styles.address}>
                                {cabang.jadwal}
                            </Text>
                        </View>

                        {cabang.menus.map(menu => this._renderRow(menu))}
                    </ScrollView>
                </View>
                <ActionButton
                    buttonColor="#ff2561"
                    icon={<Icon name="md-compass" size={24} color="#fff"/>}
                    onPress={this.onDirection.bind(this)}
                />
            </View>
        );
    }
}

// export default CabangDetail;
export default connect(state => ({
        state: state.menus
    }),
    (dispatch) => ({
        actions: bindActionCreators(menuActions, dispatch)
    })
)(CabangDetail);
