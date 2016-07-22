import {
    StyleSheet
} from 'react-native';
import colors from './colors';

var MainStyles = StyleSheet.create({
    toolbar: {
        backgroundColor: colors.orange,
        height: 60,
    },
    toolbarText: {
        color: '#fff',
        fontSize: 18,
        marginTop: 8
    }
});

export default MainStyles;
