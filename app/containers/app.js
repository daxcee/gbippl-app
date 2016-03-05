import React, { Text, Navigator, BackAndroid } from 'react-native';
import * as storage from 'redux-storage'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';
import asyncStore from 'react-native-simple-store';
import StatusBarAndroid from 'react-native-android-statusbar';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
const engine = createEngine('gbippl');
const storeMiddleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(thunk, storeMiddleware)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

import IntroContainer from './introContainer';
import Home from '../components/home';
import CabangDetail from '../components/cabangDetail';
import EventDetail from '../components/eventDetail';
import PostDetail from '../components/postDetail';
import PostContainer from './postContainer';
import MenuDetail from '../components/menuDetail';
import MenuContainer from './menuContainer';

const load = storage.createLoader(engine);
load(store)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'));

store.subscribe(() => {
    console.log(store.getState());
});

let _navigator;

StatusBarAndroid.setHexColor('#ff5382');
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
                <Navigator
                    initialRoute={{name: 'intro'}}
                    configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
                    renderScene={(route, navigator) => {
                        _navigator = navigator;
                        switch (route.name) {
                            case 'intro':
                                return <IntroContainer navigator={navigator}/>;
                            case 'home':
                                return <Home navigator={navigator}/>;
                            case 'cabangDetail':
                                return <CabangDetail cabang={route.data} navigator={navigator}/>
                            case 'eventDetail':
                                return <EventDetail event={route.data} navigator={navigator}/>
                            case 'postDetail':
                                return <PostContainer component={PostDetail} post={route.data} navigator={navigator}/>
                            case 'menuDetail':
                                return <MenuContainer component={MenuDetail} menu={route.data} type={route.type} navigator={navigator}/>
                            default: 
                                return <Text>Not Found</Text>;
                        }
                    }}
                />
            </Provider>
        );
    }
}

export default App;