import React, {Component} from 'react';
import {
    View,
    Text,
    Navigator,
    BackAndroid,
    StatusBar
} from 'react-native';
import * as storage from 'redux-storage'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';
import asyncStore from 'react-native-simple-store';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
const engine = createEngine('gbippl');
const storeMiddleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(thunk, storeMiddleware)(createStore);
const reducer = storage.reducer(combineReducers(reducers))  ;
const store = createStoreWithMiddleware(reducer);

import IntroContainer from './introContainer';
import CabangDetail from '../components/cabangDetail';
import CabangPage from '../components/cabangPage';
import PekaDetail from '../components/pekaDetail';
import EventDetail from '../components/eventDetail';
import PostDetail from '../components/postDetail';
import PostContainer from './postContainer';
import PekaContainer from './pekaContainer';
import EventContainer from './eventContainer';
import PageDetail from '../components/pageDetail';
import KhotbahDetail from '../components/khotbahDetail';
import WartaPage from '../components/wartaPage';
import WeeklyNewsPage from '../components/weeklyNewsPage';
import InfoPage from '../components/infoPage';
import KhotbahListPage from '../components/khotbahListPage';
import AboutPage from '../components/aboutPage';
import GalleryPage from '../components/galleryPage';
import SettingsPage from '../components/settingsPage';
import RegisterPage from '../components/registerPage';
import LoginPage from '../components/loginPage';

import MenuContainer from './menuContainer';
import colors from '../styles/colors';
// import OneSignal from 'react-native-onesignal';
import { changeActivePost } from '../actions/postActions';

const load = storage.createLoader(engine);
load(store)
    .then((newState) => console.log('Loaded state '))
    .catch(() => console.log('Failed to load previous state'));

let _navigator;

// OneSignal.configure({
//     onNotificationOpened: function(message, data, isActive) {
//         switch (data.type) {
//             case 'post':
//                 changeActivePost(data.data);
//                 _navigator.push({
//                     name: 'postDetail',
//                     data: data.data
//                 });
//                 break;
//             case 'event':
//                 _navigator.push({
//                     name: 'eventDetail',
//                     data: data.data
//                 });
//                 break;
//         }
//     }
// });

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

class App extends React.Component {
    componentDidMount() {
        // asyncStore.get('IntroLoaded')
        //     .then((loaded) => {
        //         if (loaded) {
        //             _navigator.resetTo({name: 'home'});
        //         }
        //     });
    }
    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1, backgroundColor: '#eee'}}>
                    <StatusBar
                        backgroundColor={colors.orangeDark}
                        barStyle="light-content"
                        />
                    <Navigator
                        initialRoute={{name: 'intro'}}
                        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
                        renderScene={(route, navigator) => {
                            _navigator = navigator;
                            switch (route.name) {
                                case 'intro':
                                    return <IntroContainer navigator={navigator}/>;
                                // case 'home':
                                //     return <Home navigator={navigator}/>;
                                case 'wartaPage':
                                    return <WartaPage navigator={navigator}/>;
                                case 'infoPage':
                                    return <InfoPage navigator={navigator}/>;
                                case 'pekaPage':
                                    return <PekaContainer navigator={navigator}/>
                                case 'eventPage':
                                    return <EventContainer navigator={navigator}/>
                                case 'postPage':
                                    return <PostContainer navigator={navigator}/>
                                case 'cabangPage':
                                    return <CabangPage navigator={navigator}/>
                                case 'galleryPage':
                                    return <GalleryPage navigator={navigator}/>
                                case 'aboutPage':
                                    return <AboutPage navigator={navigator}/>
                                case 'khotbahListPage':
                                    return <KhotbahListPage navigator={navigator}/>
                                case 'khotbahDetail':
                                    return <KhotbahDetail navigator={navigator}/>
                                case 'cabangDetail':
                                    return <CabangDetail cabang={route.data} navigator={navigator}/>
                                case 'pekaDetail':
                                    return <PekaDetail peka={route.data} navigator={navigator}/>
                                case 'eventDetail':
                                    return <EventDetail event={route.data} navigator={navigator}/>
                                case 'postDetail':
                                    return <PostContainer component={PostDetail} post={route.data} navigator={navigator}/>
                                case 'pageDetail':
                                    return <MenuContainer component={PageDetail} menu={route.data} type={route.type} navigator={navigator}/>
                                case 'weeklyNewsPage':
                                    return <WeeklyNewsPage navigator={navigator}/>;
                                case 'settingsPage':
                                    return <SettingsPage navigator={navigator}/>;
                                case 'registerPage':
                                    return <RegisterPage navigator={navigator}/>;
                                case 'loginPage':
                                    return <LoginPage navigator={navigator}/>;
                                default:
                                    return <Text>Not Found</Text>;
                            }
                        }}
                    />
                </View>
            </Provider>
        );
    }
}

export default App;
