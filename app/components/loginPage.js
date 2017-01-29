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
    Platform,
    Switch,
    Picker,
    TextInput
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'apsl-react-native-button';
import WebIntent from 'react-native-webintent';
import ActionButton from 'react-native-action-button';
import HTMLView from 'react-native-htmlview';
import MainStyles from '../styles/mainStyles';
import LinearGradient from 'react-native-linear-gradient';
import Toolbar from '../uikit/Toolbar';
import * as memberActions from '../actions/memberActions';
import colors from '../styles/colors';

let styles = StyleSheet.create({
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
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        height: 40,
        padding: 5 
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.orange,

    },
    buttonText: {
        color: 'white'
    }
});

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:  '',
        }
    }
    componentDidMount() {
        
    }
    onLogin() {
        this.props.actions.login(this.state).then((member) => {
            this.props.navigator.resetTo({
                name: 'cabangPage'
            });
        });
    }
    render() {
        const { actions, navigator } = this.props;
        return (
            <View style={{flex: 1}}>
                <Toolbar
                    title={'Login'}
                    style={MainStyles.toolbar}
                    titleColor={'#fff'}
                    navIconName={'md-arrow-back'}
                    onIconClicked={() => this.props.navigator.pop()}
                    />
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <ScrollView>
                        <View>
                            <TextInput style={styles.input} value={this.state.email} onChangeText={(email) => this.setState({email})} placeholder="Email"/>
                        </View>
                        <View>
                            <TextInput style={styles.input} value={this.state.password} onChangeText={(password) => this.setState({password})} secureTextEntry={true} placeholder="Password"/>
                        </View>
                        <View>
                            <TouchableOpacity onPress={this.onLogin.bind(this)}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Login</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

LoginPage = connect(state => ({
        member: state.member
    }),
    (dispatch) => ({
        actions: bindActionCreators(memberActions, dispatch)
    })
)(LoginPage);

export default LoginPage;
