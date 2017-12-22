import React from 'react';
import { Text, View, Image, Alert, StatusBar, Button } from 'react-native';
import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';

import * as screens from './screens'
import appConfig from '../appConfig'
import { getSession } from './session';

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
      navigationOptions: stackNavigationOptions,
      myProperty: 'foobar'
    },
    
    ProfileScreen: {
      screen: screens.ProfileScreen,
      navigationOptions: stackNavigationOptions
    },

    MemberCardScreen: {
      screen: screens.MemberCardScreen,
      navigationOptions: stackNavigationOptions
    }
  },
  {
    initialRouteName: 'NewsScreen',
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: appConfig.style.navigation.tabBarOptions,
    lazy: true
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

export default stackNavigator
export { statusBar }