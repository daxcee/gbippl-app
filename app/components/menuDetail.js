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

class MenuDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchSingleMenu(this.props.type, this.props.activeMenu.page_id);
    }
    render() {
        const { state, actions, navigator, activeMenu } = this.props;
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    title={activeMenu.title}
                    style={styles.toolbar}
                    titleColor={'#fff'}
                    navIcon={{uri: 'back', isStatic: true}}
                    onIconClicked={() => this.props.navigator.pop()}
                    />
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <ScrollView>
                        <View style={{padding: 15, marginBottom: 20}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{width: 32, height: 32, margin: 8}}>
                                    <Image source={{uri: activeMenu.icon || null}} style={{width: 32, height: 32}}/>
                                </View>
                                <Text style={styles.heading}>
                                    {activeMenu.title}
                                </Text>
                            </View>

                            <Text style={styles.description}>
                                <HTMLView
                                    value={activeMenu.content}
                                    onLinkPress={(url) => console.log('navigating to: ', url)}
                                    stylesheet={styles}
                                    />
                            </Text>
                        </View>
                        <Image source={{uri: activeMenu.image}} style={{resizeMode: 'cover', height: 150, left: 0, right: 0}}/>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default MenuDetail;