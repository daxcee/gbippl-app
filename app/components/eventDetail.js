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
import Button from 'apsl-react-native-button';
import WebIntent from 'react-native-webintent';
import ActionButton from 'react-native-action-button';
import HTMLView from 'react-native-htmlview';
if (Platform.OS === 'android')
    var SendIntentAndroid = require('react-native-send-intent');
import MainStyles from '../styles/mainStyles';

let styles = StyleSheet.create({
    heading: {
        fontSize: 28,
        color: '#000'
    },
    description: {
        fontSize: 13,
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
});

class EventDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageHeight: 300,
            imageResize: 'cover'
        }
    }
    toggleImageHeight() {
        this.setState({
            imageHeight: this.state.imageHeight === 300 ? 450 : 300,
            imageResize: this.state.imageHeight === 300 ? 'contain' : 'contain'
        });
    }
    onAddEvent() {
        const { event } = this.props;
        if (Platform.OS === 'android')
            SendIntentAndroid.addCalendarEvent({
                title: event.title,
                description: event.excerpt,
                startDate: event.date_format + ' ' + event.time,
                endDate: event.date_format + ' ' + event.time,
                recurrence: 'none'
            });
    }
    render() {
        const { state, actions, navigator, event } = this.props;
        return (
            <View style={{flex: 1}}>
                {Platform.OS === 'android' ? 
                    <ToolbarAndroid
                        title={event.title}
                        style={MainStyles.toolbar}
                        titleColor={'#fff'}
                        navIcon={{uri: 'back', isStatic: true}}
                        onIconClicked={() => this.props.navigator.pop()}
                        />
                    :
                    <View style={[MainStyles.toolbar, {alignItems: 'center', justifyContent: 'center'}]}>
                        <Text numberOfLines={1} style={MainStyles.toolbarText}>{event.title}</Text>
                    </View>}
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <ScrollView>
                        {event.image ?
                            <TouchableOpacity onPress={this.toggleImageHeight.bind(this)}>
                                <Image source={{uri: event.image}} style={{resizeMode: this.state.imageResize, height: this.state.imageHeight, left: 0, right: 0}}/>
                            </TouchableOpacity>
                            : null}
                        <View style={{padding: 15, marginBottom: 20}}>
                            <Text style={styles.description}>
                                <HTMLView
                                    value={event.content}
                                    onLinkPress={(url) => console.log('navigating to: ', url)}
                                    stylesheet={styles}
                                    />
                            </Text>
                            <View style={styles.dateTime}>
                                <Icon name="md-calendar" size={20} style={{width: 28, marginRight: 8, textAlign: 'center'}} color="#000"/>
                                <Text>{event.date}</Text>
                            </View>
                            <View style={styles.dateTime}>
                                <Icon name="md-clock" size={20} style={{width: 28, marginRight: 8, textAlign: 'center'}} color="#000"/>
                                <Text>{event.time}</Text>
                            </View>
                            <View style={styles.dateTime}>
                                <Icon name="md-pin" size={20} style={{width: 28, marginRight: 8, textAlign: 'center'}} color="#000"/>
                                <Text>{event.place}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                {Platform.OS === 'android' ?
                    <ActionButton
                        buttonColor="#ff2561"
                        icon={<Icon name="md-calendar" size={24} color="#fff"/>}
                        onPress={this.onAddEvent.bind(this)}
                    />
                    : null}
            </View>
        );
    }
}

export default EventDetail;
