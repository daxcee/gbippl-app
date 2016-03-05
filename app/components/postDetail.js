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
        color: '#777',
        lineHeight: 20,
        marginTop: 20
    },
    a: {
        fontWeight: '300',
        color: '#ff2561',
    },
};

class PostDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchSinglePost(this.props.activePost.id);
    }
    render() {
        const { state, actions, navigator, activePost } = this.props;
        const { pastor, pastor_data } = activePost;
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    title={activePost.title}
                    style={styles.toolbar}
                    titleColor={'#fff'}
                    navIcon={{uri: 'back', isStatic: true}}
                    onIconClicked={() => this.props.navigator.pop()}
                    />
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <ScrollView>
                        <View style={{padding: 15, marginBottom: 20}}>
                            <Text style={styles.heading}>
                                {activePost.title}
                            </Text>
                            <Text style={{textAlign: 'right'}}>{activePost.date}</Text>
                            {pastor_data ? 
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Image source={{uri: pastor_data.thumb}} style={{height: 32, width: 32, marginRight: 10, borderRadius: 32}} />
                                    <Text>{pastor}</Text>
                                </View> 
                                : null}
                            <Text style={styles.description}>
                                <HTMLView
                                    value={activePost.content}
                                    onLinkPress={(url) => console.log('navigating to: ', url)}
                                    stylesheet={styles}
                                    />
                            </Text>
                        </View>
                        <Image source={{uri: activePost.image}} style={{resizeMode: 'cover', height: 150, left: 0, right: 0}}/>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default PostDetail;