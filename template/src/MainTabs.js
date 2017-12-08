import React from 'react';
import { Text, View, Image, Alert, StatusBar, Button } from 'react-native';
import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';

import * as screens from './screens'
import appConfig from '../appConfig'
import store from './reducers'

const statusBar = (config = {}) => {
  const backgroundColor = config.backgroundColor || appConfig.statusBarBackgroundColor
  const barStyle = config.barStyle || appConfig.statusBarStyle
  const hidden = config.hidden || appConfig.statusBarHidden

  return (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={barStyle}
      hidden={hidden}
    />
  )
}


const stackNavigationOptions = {
  headerLeft: (
    <View style={appConfig.style.navigation.headerLeft.outerContainer}>
      {/*<View style={appConfig.style.navigation.headerLeft.innerContainer}>
        One could add an icon or image here
      </View> */}
    </View>
  ),
  headerRight: (
    <View style={appConfig.style.navigation.headerRight.outerContainer}>
      <View style={appConfig.style.navigation.headerRight.innerContainer}>
        <Icon
          name="view-headline"
          size={30}
          color={appConfig.secondaryColor}
          onPress={() => Alert.alert('Sukkelat sormet!', 'Tökkäsit nappulaa!')}
        />
      </View>
    </View>
  ),
  headerStyle: appConfig.style.navigation.headerStyle,
  headerTitleStyle: appConfig.style.navigation.headerTitleStyle,
  headerTintColor: appConfig.style.navigation.headerTintColor,
  headerBackTitleStyle: appConfig.style.navigation.headerBackTitleStyle,
}

const MainTabs = TabNavigator(
  {
    NewsScreen: {
      screen: screens.NewsScreen,
      navigationOptions: stackNavigationOptions
    },
    
    ProfileScreen: {
      screen: screens.ProfileScreen,
      navigationOptions: stackNavigationOptions
    },
  },
  {
    initialRouteName: 'NewsScreen',
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: appConfig.style.navigation.tabBarOptions,
  }
)

const stackNavigator = new StackNavigator(
  {
    Home: {
      screen: MainTabs,
    },

    LoginScreen: {
      screen: screens.LoginScreen,
      navigationOptions: ({navigation}) => {
        return Object.assign({}, stackNavigationOptions, {
          title: 'Kirjautuminen',
          headerLeft: ({tintColor}) => (<Icon name="chevron-left" size={35} onPress={() => navigation.goBack()} color={tintColor} />),
          headerLeftStyle: {
            color: '#fff'
          },
          headerRight: null
        })
      }
    },

    NewsItemScreen: {
      screen: screens.NewsItemScreen,
      navigationOptions: Object.assign({}, stackNavigationOptions, {
        headerLeft: undefined,
        headerBackTitle: null
      })
    }
  },
  {
    initialRouteName: 'Home',
  }
)

const defaultGetStateForAction = stackNavigator.router.getStateForAction;

stackNavigator.router.getStateForAction = (action, state) => {

  console.log(action, state)
  let screenToRequest = undefined
  let defaultState = undefined

  const isInitial = action.type === 'Navigation/INIT'

  /**
   * If action is Navigation/INIT, which is the initial state,
   * we need to check if login is required for initial route/screen.
   * 
   * defaultState is an object like this:
   * 
   * {
   *   index: int,
   *   routes: [
   *     { key: string, routeName: string }
   *     ...
   *   ]
   * }
   * 
   * Routes contains available routes and index tells us which route
   * is the default one.
   */
  if (isInitial) {
    defaultState = MainTabs.router.getStateForAction('Navigation/INIT')
    screenToRequest = defaultState.routes[defaultState.index].routeName
  } else if (action.type === 'Navigation/NAVIGATE') {
    screenToRequest = action.routeName
  }

  if (screenToRequest) {
    const screen = screens.getScreen(screenToRequest)
    console.log(`Is login required for ${screenToRequest}`, screen.screen.loginRequired)

    const storeState = store.getState();

    if (screen.screen.loginRequired && !storeState.login.access_token) {

      const previousRoutes = isInitial ? {} : state.routes

      const routes = [
        ...previousRoutes,
        {
          key: 'LoginScreen',
          routeName: 'LoginScreen',
          params: {
            showBackButton: !isInitial
          }
        }
      ]

      return {
        ...state,
        routes,
        index: routes.length-1
      }
    }
  }
  
  return defaultGetStateForAction(action, state);
};


export default stackNavigator
export { statusBar }