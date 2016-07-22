import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';

const TabBar = React.createClass({
    tabIcons: [],

    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
    },

    render() {
        const tabWidth = this.props.containerWidth / this.props.tabs.length;
        const left = this.props.scrollValue.interpolate({
            inputRange: [0, 1, ], outputRange: [0, tabWidth, ],
        });

        return (
            <View>
                <View style={[styles.tabs, this.props.style]}>
                    {this.props.tabs.map((tab, i) => {
                        return (
                            <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
                                <Icon
                                    name={tab}
                                    size={23}
                                    color={'#fff'}
                                    ref={(icon) => { this.tabIcons[i] = icon; }}
                                    />
                            </TouchableOpacity>
                        );})}
                </View>
                <Animated.View style={[styles.tabUnderlineStyle, { width: tabWidth }, { left, }, ]} />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    tabs: {
        height: 60,
        flexDirection: 'row',
        paddingTop: 5,
        borderWidth: 0,
        backgroundColor: colors.orange
    },
    tabUnderlineStyle: {
        position: 'absolute',
        height: 3,
        backgroundColor: '#fff',
        bottom: 0,
    },
});

export default TabBar;
