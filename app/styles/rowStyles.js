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
        color: '#000',
        fontSize: 20,
    },
    rowWrap: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
        elevation: 3,
        backgroundColor: colors.orange,
        marginBottom: 1,
        flexDirection: 'row'
    },
    rowImageWrap: {
        height: 125,
        width: 125,
        backgroundColor: 'transparent'
    },
    rowInfo: {
        backgroundColor: '#fff',
        padding: 15,
        flex: 1,
    },
    rowExcerpt: {
        color: '#888',
        fontSize: 13,
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
        color: '#333',
        fontSize: 13,
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
