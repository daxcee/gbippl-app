import React, {Component} from 'react';
import {
	View,
	Text,
    Linking,
    TouchableOpacity,
    StyleSheet,
    Platform,
    ScrollView,
    Image,
    ToolbarAndroid
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
import colors from '../styles/colors';

class InfoPage extends Component {
	componentDidMount() {
        
    }
    onDirection() {
        const { cabang } = this.props;
        Linking.openURL(`http://maps.google.com/maps?q=loc:${cabang.lat},${cabang.lng} (${cabang.name})`).catch(err => console.error('An error occurred', err));
    }
	render() {
        var {state} = this.props;
		return (
			<View style={{flex: 1}}>
                <ToolbarAndroid
                    title={state.activeCabang.name}
                    style={MainStyles.toolbar}
                    titleColor={'#fff'}
                    navIcon={{uri: 'back', isStatic: true}}
                    onIconClicked={() => this.props.navigator.pop()}
                    />
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <ScrollView>
                        <Image source={{uri: state.activeCabang.image}} style={{resizeMode: 'cover', height: 150, left: 0, right: 0}}/>
                        <View style={{padding: 15, marginBottom: 20}}>
                            <Text style={styles.address}>
                                {state.activeCabang.address}
                            </Text>
                            <Text style={styles.address}>
                                {state.activeCabang.jadwal}
                            </Text>
                        </View>

                    </ScrollView>
                </View>
                <ActionButton
                    buttonColor={colors.orange}
                    icon={<Icon name="md-compass" size={24} color="#fff"/>}
                    onPress={this.onDirection.bind(this)}
                />
            </View>
		);
	}
}

let styles = StyleSheet.create({
    heading: {
        fontSize: 28,
        color: '#000'
    },
    address: {
        fontSize: 13,
        color: '#777',
        marginBottom: 12
    }
});

InfoPage = connect(state => ({
        state: state.cabang
    }),
    (dispatch) => ({
        actions: bindActionCreators(menuActions, dispatch)
    })
)(InfoPage);

export default InfoPage;