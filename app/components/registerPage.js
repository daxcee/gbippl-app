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

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nama: '',
            alamat: '',
            handphone: '',
            email: '',
            password:  '',
            cabang: ''
        }
    }
    componentDidMount() {
        
    }
    onDaftar() {
        this.props.actions.register(this.state).then((member) => {
            this.props.navigator.resetTo({
                name: 'loginPage'
            });
        });
    }
    render() {
        const { actions, navigator } = this.props;
        return (
            <View style={{flex: 1}}>
                <Toolbar
                    title={'Daftar Anggota Jemaat'}
                    style={MainStyles.toolbar}
                    titleColor={'#fff'}
                    navIconName={'md-arrow-back'}
                    onIconClicked={() => this.props.navigator.pop()}
                    />
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <ScrollView>
                        <View>
                            <TextInput style={styles.input} value={this.state.nama} onChangeText={(nama) => this.setState({nama})} placeholder="Nama"/>
                        </View>
                        <View>
                            <TextInput style={styles.input} value={this.state.email} onChangeText={(email) => this.setState({email})} placeholder="Email"/>
                        </View>
                        <View>
                            <TextInput style={styles.input} value={this.state.password} onChangeText={(password) => this.setState({password})} placeholder="Password" secure={true}/>
                        </View>
                        <View>
                            <TextInput style={styles.input} value={this.state.alamat} onChangeText={(alamat) => this.setState({alamat})} placeholder="Alamat"/>
                        </View>
                        <View>
                            <TextInput style={styles.input} value={this.state.handphone} onChangeText={(handphone) => this.setState({handphone})} placeholder="Nomor HP"/>
                        </View>
                        <View>
                            <Picker
                                style={{backgroundColor: 'transparent', width: 150, color: '#000'}}
                                selectedValue={this.state.cabang}
                                onValueChange={(cabang) => this.setState({cabang})}>
                                <Picker.Item label="Pilih Cabang" value={''} />
                                <Picker.Item label="Riau" value={'riau'} />
                                <Picker.Item label="Setiabudhi" value={'setiabudhi'} />
                                <Picker.Item label="Citylink" value={'citylink'} />
                                <Picker.Item label="Kota Baru Parahyangan" value={'kbp'} />
                                <Picker.Item label="Kopo" value={'kopo'} />
                                <Picker.Item label="Majesty" value={'majesty'} />
                                <Picker.Item label="Cirebon" value={'cirebon'} />
                            </Picker>
                        </View>
                        <View>
                            <TouchableOpacity onPress={this.onDaftar.bind(this)}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Daftar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

RegisterPage = connect(state => ({
        member: state.member
    }),
    (dispatch) => ({
        actions: bindActionCreators(memberActions, dispatch)
    })
)(RegisterPage);

export default RegisterPage;
