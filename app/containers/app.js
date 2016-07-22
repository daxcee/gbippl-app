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
import Home from '../components/home';
import CabangDetail from '../components/cabangDetail';
import CabangPage from '../components/cabangPage';
import PekaDetail from '../components/pekaDetail';
import MinistryDetail from '../components/ministryDetail';
import EventDetail from '../components/eventDetail';
import PostDetail from '../components/postDetail';
import PostContainer from './postContainer';
import PekaContainer from './pekaContainer';
import EventContainer from './eventContainer';
import PageDetail from '../components/pageDetail';
import WartaPage from '../components/wartaPage';
import InfoPage from '../components/infoPage';
import MenuContainer from './menuContainer';
import colors from '../styles/colors';
import OneSignal from 'react-native-onesignal';
import { changeActivePost } from '../actions/postActions';

const load = storage.createLoader(engine);
load(store)
    .then((newState) => console.log('Loaded state '))
    .catch(() => console.log('Failed to load previous state'));

let _navigator;

OneSignal.configure({
    onNotificationOpened: function(message, data, isActive) {
        switch (data.type) {
            case 'post':
                changeActivePost(data.data.id);
                _navigator.push({
                    name: 'postDetail',
                    data: data.data
                });
                break;
            case 'event':
                _navigator.push({
                    name: 'eventDetail',
                    data: data.data
                });
                break;
            case 'ministry':
                _navigator.push({
                    name: 'ministryDetail',
                    data: data.data
                });
                break;
        }
    }
});


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
                <View style={{flex: 1}}>
                    <StatusBar
                        backgroundColor={colors.orangeDark}
                        />
                    <Navigator
                        initialRoute={{name: 'intro'}}
                        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
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
                                case 'cabangDetail':
                                    return <CabangDetail cabang={route.data} navigator={navigator}/>
                                case 'pekaDetail':
                                    return <PekaDetail peka={route.data} navigator={navigator}/>
                                case 'eventDetail':
                                    return <EventDetail event={route.data} navigator={navigator}/>
                                case 'ministryDetail':
                                    return <MinistryDetail component={MinistryDetail} ministry={route.data} navigator={navigator}/>
                                case 'postDetail':
                                    return <PostContainer component={PostDetail} post={route.data} navigator={navigator}/>
                                case 'pageDetail':
                                    return <MenuContainer component={PageDetail} menu={route.data} type={route.type} navigator={navigator}/>
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
