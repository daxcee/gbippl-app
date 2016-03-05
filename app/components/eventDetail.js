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
import SendIntentAndroid from 'react-native-send-intent'

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
    description: {
        fontSize: 13,
        fontFamily: 'Gotham-Book',
        color: '#777'
    },
    a: {
        fontWeight: '300',
        color: '#ff2561',
    },
    dateTime: {
        flexDirection: 'row',
        alignItems: 'center'
    }
};

class EventDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    onAddEvent() {
        const { event } = this.props; 
        SendIntentAndroid.addCalendarEvent({
            title: event.title,
            description: event.excerpt,
            startDate: event.date_format + ' ' + event.time,
            endDate: event.date_format + ' ' + event.time,
            reccurence: ''
        });
    }
    render() {
        const { state, actions, navigator, event } = this.props;
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    title={event.title}
                    style={styles.toolbar}
                    titleColor={'#fff'}
                    navIcon={{uri: 'back', isStatic: true}}
                    onIconClicked={() => this.props.navigator.pop()}
                    />
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <ScrollView>
                        <View style={{padding: 15, marginBottom: 20}}>
                            <Text style={styles.heading}>
                                {event.title}
                            </Text>
                            <Text style={styles.description}>
                                <HTMLView
                                    value={event.content}
                                    onLinkPress={(url) => console.log('navigating to: ', url)}
                                    stylesheet={styles}
                                    />
                            </Text>
                            <View style={styles.dateTime}>
                                <Icon name="calendar" size={20} style={{width: 28, marginRight: 8, textAlign: 'center'}} color="#000"/>
                                <Text>{event.date}</Text>
                            </View>
                            <View style={styles.dateTime}>
                                <Icon name="clock" size={20} style={{width: 28, marginRight: 8, textAlign: 'center'}} color="#000"/>
                                <Text>{event.time}</Text>
                            </View>
                            <View style={styles.dateTime}>
                                <Icon name="location" size={20} style={{width: 28, marginRight: 8, textAlign: 'center'}} color="#000"/>
                                <Text>{event.place}</Text>
                            </View>
                        </View>
                        <Image source={{uri: event.image}} style={{resizeMode: 'cover', height: 150, left: 0, right: 0}}/>
                    </ScrollView>
                </View>
                <ActionButton 
                    buttonColor="#ff2561"
                    icon={<Icon name="android-calendar" size={24} color="#fff"/>}
                    onPress={this.onAddEvent.bind(this)}
                />
            </View>
        );
    }
}

export default EventDetail;