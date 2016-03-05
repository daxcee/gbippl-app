import React from 'react-native';
import {
    View,
    Text,
    Image,
    Alert,
    ToolbarAndroid,
    ScrollView,
    Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import Button from 'apsl-react-native-button'
import WebIntent from 'react-native-webintent'
import ActionButton from 'react-native-action-button'

let styles = {
    toolbar: {
        backgroundColor: '#ff2561',
        height: 60
    },
    heading: {
        fontSize: 28,
        fontFamily: 'Gotham-Black',
        color: '#000'
    },
    address: {
        fontSize: 13,
        fontFamily: 'Gotham-Book',
        color: '#777'
    }
};

class CabangDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    onDirection() {
        const { cabang } = this.props;
        WebIntent.open(`http://maps.google.com/maps?q=loc:${cabang.lat},${cabang.lng} (${cabang.name})`);
    }
    componentDidMount() {
    }
    render() {
        const { state, actions, navigator, cabang } = this.props;
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    title={cabang.name}
                    style={styles.toolbar}
                    titleColor={'#fff'}
                    navIcon={{uri: 'back', isStatic: true}}
                    onIconClicked={() => this.props.navigator.pop()}
                    />
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <ScrollView>
                        <MapView
                            style={{height: 150}}
                            initialRegion={{
                                latitude: parseFloat(cabang.lat),
                                longitude: parseFloat(cabang.lng),
                                latitudeDelta: 0.006,
                                longitudeDelta: 0.006,
                            }}>
                            <MapView.Marker 
                                coordinate={{
                                    latitude: parseFloat(cabang.lat),
                                    longitude: parseFloat(cabang.lng)
                                }}
                                title={cabang.name}
                                description={cabang.address}
                            />
                        </MapView>
                        <View style={{padding: 15, marginBottom: 20}}>
                            <Text style={styles.heading}>
                                {cabang.name}
                            </Text>
                            <Text style={styles.address}>
                                {cabang.address}
                            </Text>
                        </View>
                        <Image source={{uri: cabang.image}} style={{resizeMode: 'cover', height: 150, left: 0, right: 0}}/>
                    </ScrollView>
                </View>
                <ActionButton 
                    buttonColor="#ff2561"
                    icon={<Icon name="android-compass" size={24} color="#fff"/>}
                    onPress={this.onDirection.bind(this)}
                />
            </View>
        );
    }
}

export default CabangDetail;