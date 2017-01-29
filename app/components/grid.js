import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    RefreshControl,
    Image,
    TouchableOpacity,
    ListView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../styles/colors';

class Grid extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var items = this.generateItems(props.items);
        this.state = {
            dataSource: ds.cloneWithRows(items),
        }
        this.scrollOffsetY = 0;
        this.height = 0;
        this.willComputeRowsToRender = false;
        this.timeoutHandle = 0;
        this.nextSectionToScrollTo = null;
        this.scrollDirection = 'down';
    }
    componentWillReceiveProps(nextProps) {
        var items = this.generateItems(nextProps.items);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items),
        });
    }
    generateItems(items) {
        var resultItems = [];
        for (var i = 0; i < items.length; i++) {
            if (i % 2 == 0) {
                if (items[i + 1]) {
                    resultItems.push([items[i], items[i + 1]]);
                } else {
                    resultItems.push(items[i]);
                }
            }
        }
        return resultItems;
    }
    splitItems (items, column) {
        var strands = [];

        for (var i = 0; i < column; i++) {
            strands.push([]);
        }
        
        for (var i = 0, n = items.length; i < n; i++) {
            strands[i % column].push(items[i]);
        }

        return strands;
    }

    getScrollDirection() {
        if (this.scrollOffsetY - this.prevScrollOffsetY >= 0) {
            return 'down';
        } else {
            return 'up';
        }
    }

    onScroll(e) {
        this.prevScrollOffsetY = this.scrollOffsetY || 0;
        this.scrollOffsetY = e.nativeEvent.contentOffset.y;
        this.scrollDirection = this.getScrollDirection();
        this.height = e.nativeEvent.layoutMeasurement.height;

        if ((this.scrollOffsetY + this.height) >= (e.nativeEvent.contentSize.height - 50) && this.scrollDirection == 'down') {
            this.props.onEndReached();
        }
    }

    render() {
        if (this.props.type != 'listview') {
            var {items} = this.props;

            // var strandsTest = this.splitItems(items, 2);
            // console.log('STRAND', strandsTest);

            items = items.map((item, i) => {
                return (
                    <TouchableOpacity key={i} onPress={item.onPress.bind(this)}>
                        <View style={styles.item}>
                            <Image source={{uri: item.image || ''}} style={styles.image} resizeMode={'cover'}/>
                            <View
                                style={styles.linearGradient}/>
                            <Text style={styles.text}>  
                                {item.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })

            var strands = this.splitItems(items, 2);

            var productColumns = (
                <View style={styles.row}>
                    <View style={styles.col}>
                        {strands[0]}
                    </View>
                    <View style={styles.col}>
                        {strands[1]}
                    </View>
                </View>
            );
            return (
                <ScrollView
                    style={{flex: 1}}
                    onScroll={this.onScroll.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.refresh}
                            onRefresh={this.props.onRefresh}
                            tintColor={colors.orange}
                            title="Memuat data..."
                            colors={[colors.orange, colors.orangeDark, colors.orange]}
                            progressBackgroundColor="#fff"
                        />
                    }>
                    {this.props.header}
                    {productColumns}
                </ScrollView>
            );
        } else {
            return (
                <ListView
                    style={{flex: 1}}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.refresh}
                            onRefresh={this.props.onRefresh}
                            tintColor={colors.orange}
                            title="Memuat event..."
                            colors={[colors.orange, colors.orangeDark, colors.orange]}
                            progressBackgroundColor="#fff"
                        />
                    }
                    onEndReached={this.props.onEndReached.bind(this)}
                    renderHeader={this.props.header} />
            );
        }
    }
}

Grid.defaultProps = {
    items: [],
    onEndReached: () => {}
};

var styles = StyleSheet.create({
    col: {
        flex: 1,
    },
    item: {
        height: 180,
        backgroundColor: '#ff0',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: colors.orange,
        flex: 1,
        margin: 1
    },
    row: {
        flexDirection: 'row'
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 180,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    text: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        margin: 10,
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
    image: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 180,
        resizeMode: 'cover'
    }
});

export default Grid;