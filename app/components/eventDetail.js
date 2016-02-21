import React from 'react-native'
import {
    View,
    Text,
    Image,
    Alert,
    ToolbarAndroid,
    ScrollView,
    Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Button from 'apsl-react-native-button'
import WebIntent from 'react-native-webintent'
import ActionButton from 'react-native-action-button'
import HTMLView from 'react-native-htmlview'

let styles = {
    toolbar: {
        backgroundColor: '#f96332',
        height: 60
    },
    heading: {
        fontSize: 28,
        fontFamily: 'Gotham-Black',
        color: '#000'
    },
    description: {
        fontSize: 13,
        fontFamily: 'Gotham-Book',
        color: '#777'
    },
    a: {
        fontWeight: '300',
        color: '#f96332',
    },
};

class EventDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        const { state, actions, navigator, event } = this.props;
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    title={event.name}
                    style={styles.toolbar}
                    titleColor={'#fff'}
                    navIcon={{uri: 'back', isStatic: true}}
                    onIconClicked={() => this.props.navigator.pop()}
                    />
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <ScrollView>
                        <View style={{padding: 15, marginBottom: 20}}>
                            <Text style={styles.heading}>
                                {event.name}
                            </Text>
                            <Text style={styles.description}>
                                <HTMLView
                                    value={event.description}
                                    onLinkPress={(url) => console.log('navigating to: ', url)}
                                    stylesheet={styles}
                                    />
                            </Text>
                        </View>
                        <Image source={{uri: event.image}} style={{resizeMode: 'cover', height: 150, left: 0, right: 0}}/>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default EventDetail;