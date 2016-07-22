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
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import Button from 'apsl-react-native-button';
import ActionButton from 'react-native-action-button';
import MainStyles from '../styles/mainStyles';
import RowStyles from '../styles/rowStyles';
import LinearGradient from 'react-native-linear-gradient';
import HTMLView from 'react-native-htmlview';

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

class PekaDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageHeight: 190,
            imageResize: 'cover'
        }
    }
    toggleImageHeight() {
        this.setState({
            imageHeight: this.state.imageHeight === 190 ? 400 : 190,
            imageResize: this.state.imageHeight === 190 ? 'contain' : 'cover'
        });
    }
    onDirection() {
        const { peka } = this.props;
        Linking.openURL(`http://maps.google.com/maps?q=loc:${peka.lat},${peka.lng} (${peka.name})`).catch(err => console.error('An error occurred', err));
    }
    componentDidMount() {

    }
    render() {
        const { state, actions, navigator, peka } = this.props;
        console.log(peka.menus);
        return (
            <View style={{flex: 1}}>
                {Platform.OS === 'android' ? 
                    <ToolbarAndroid
                        title={peka.title}
                        style={MainStyles.toolbar}
                        titleColor={'#fff'}
                        navIcon={{uri: 'back', isStatic: true}}
                        onIconClicked={() => this.props.navigator.pop()}
                        />
                    :
                    <View style={[MainStyles.toolbar, {alignItems: 'center', justifyContent: 'center'}]}>
                        <Text numberOfLines={1} style={MainStyles.toolbarText}>{peka.title}</Text>
                    </View>}
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <ScrollView>
                        {peka.image ?
                            <TouchableOpacity onPress={this.toggleImageHeight.bind(this)}>
                                <Image source={{uri: peka.image}} style={{resizeMode: this.state.imageResize, height: this.state.imageHeight, left: 0, right: 0}}/>
                            </TouchableOpacity>
                            : null}
                        <View style={{padding: 15, marginBottom: 20}}>
                            <Text style={styles.address}>
                                {peka.address}
                            </Text>
                            <Text style={styles.description}>
                                <HTMLView
                                    value={peka.content}
                                    onLinkPress={(url) => console.log('navigating to: ', url)}
                                    stylesheet={styles}
                                    />
                            </Text>
                        </View>
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

export default PekaDetail;
