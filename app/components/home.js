import React, {
    View,
    Text,
    TouchableHighlight,
    ToolbarAndroid,
    DrawerLayoutAndroid,
    Image,
    ViewPagerAndroid,
} from 'react-native';
import { Tab, TabLayout } from 'react-native-android-tablayout';
import Icon from 'react-native-vector-icons/Ionicons';

import CabangContainer from '../containers/cabangContainer';
import EventContainer from '../containers/eventContainer';

let styles = {
    toolbar: {
        backgroundColor: '#f96332',
        height: 60,
    },
    viewPager: {
        flex: 1
    },
    content: {
        flex: 1
    }
};

/*
<Tab accessibilityLabel={'berita'} style={{width: 110, height: 48}} iconSize={110}>
    <Icon name="ios-paper-outline" size={32} color="#fff"/>
</Tab>
<Tab accessibilityLabel={'event'} style={{width: 110, height: 48}} iconSize={110}>
    <Icon name="ios-calendar-outline" size={32} color="#fff"/>
</Tab>
<Tab accessibilityLabel={'cabang'} style={{width: 110, height: 48}} iconSize={110}>
    <Icon name="ios-location-outline" size={32} color="#fff"/>
</Tab>
<Tab accessibilityLabel={'komunitas'} style={{width: 110, height: 48}} iconSize={110}>
    <Icon name="ios-people-outline" size={32} color="#fff"/>
</Tab>
<Tab accessibilityLabel={'profil'} style={{width: 110, height: 48}} iconSize={110}>
    <Icon name="ios-home-outline" size={32} color="#fff"/>
</Tab>*/

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iconPaper: '',
            iconCalendar: '',
            iconLocation: '',
            iconPeople: '',
            iconHome: '',
            pagePosition: 2,
        }
    }
    openDrawer() {
        this.refs.drawer.openDrawer();
    }
    componentDidMount() {
        Icon.getImageSource('ios-paper-outline', 32, 'white').then(source => {
            this.setState({ iconPaper: source.uri });
        });
        Icon.getImageSource('ios-calendar-outline', 32, 'white').then(source => {
            this.setState({ iconCalendar: source.uri });
        });
        Icon.getImageSource('ios-location-outline', 32, 'white').then(source => {
            this.setState({ iconLocation: source.uri });
        });
        Icon.getImageSource('ios-people-outline', 32, 'white').then(source => {
            this.setState({ iconPeople: source.uri });
        });
        Icon.getImageSource('ios-home-outline', 32, 'white').then(source => {
            this.setState({ iconHome: source.uri });
        });
    }
    _setPagePosition(e:Event) {
        const pagePosition = e.nativeEvent.position;
        this.setState({ pagePosition });
        this.viewPager.setPage(pagePosition);
    }
    render() {
        var navigationView = (
            <View style={{flex: 1,
                backgroundColor: '#f96332',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch'}}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 60,
                    }}>
                    <Image source={require('../../img/logo_big.png')} resizeMode={'contain'} style={{flex: 1, height: 60, width: 200}}/>
                </View>
                <View style={{
                    flex: 2,
                    backgroundColor: '#f96332',
                }}>
                    <Text style={{color: 'white'}}>Hello World</Text>
                </View>
            </View>
        );

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Text>Hello</Text>
            </View>
        );
    }
}

export default Home;