import {
    StyleSheet
} from 'react-native';
import colors from './colors';

var RowStyles = StyleSheet.create({
	rowItem: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 125,
        padding: 15,
        justifyContent: 'flex-end'
    },
    rowTitle: {
        color: '#fff',
        fontSize: 20,
    },
    rowWrap: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
        elevation: 5,
        backgroundColor: colors.orange,
        marginBottom: 1
    },
    rowImageTitle: {
        height: 125,
        backgroundColor: 'transparent'
    },
    rowInfo: {
        backgroundColor: '#fff',
        padding: 15,
    },
    rowExcerpt: {
        color: '#9d9d9d',
        fontSize: 11,
    },
    rowImage: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 125,
        resizeMode: 'cover'
    },
    rowMeta: {
        color: '#9d9d9d',
        fontSize: 10,
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 125,
    }
});

export default RowStyles;
