import React from 'react';
import { View, Image, Alert, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import appConfig from '../appConfig'

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

import {
  NewsScreen,
  NewsItemScreen
} from './screens';

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
    News: {
      screen: NewsScreen,
      navigationOptions: stackNavigationOptions,
      screenProps: {
        requireLogin: true
      },
    },
  },
  {
    initialRouteName: 'News',
    animationEnabled: true,
    swipeEnabled: false,
    order: [
      'News',
    ],
    tabBarOptions: appConfig.style.navigation.tabBarOptions
  }
)

const stack = new StackNavigator(
  {
    Home: {
      screen: MainTabs,
    },
    NewsItem: {
      screen: NewsItemScreen,
      navigationOptions: Object.assign({}, stackNavigationOptions, {
        headerLeft: undefined,
        headerBackTitle: null
      })
    }
  },
  {
    initialRouteName: '',
  }
);

export default stack
export { statusBar }