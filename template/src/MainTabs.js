import React from 'react';
import { View, Image, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import appConfig from '../appConfig'

import {
  NewsScreen,
  NewsItemScreen
} from './screens';

const stackNavigationOptions = {
  headerLeft: (
    <View style={appConfig.styles.navigation.headerLeft.outerContainer}>
      <View style={appConfig.styles.navigation.headerLeft.innerContainer}>
      {/* One could add an icon or image here */}
      </View>
    </View>
  ),
  headerRight: (
    <View style={appConfig.styles.navigation.headerRight.outerContainer}>
      <View style={appConfig.styles.navigation.headerRight.innerContainer}>
        <Icon
          name="view-headline"
          size={30}
          color={appConfig.styles.navigation.mainColor}
          onPress={() => Alert.alert('Push', 'Tökkäsit nappulaa!')}
        />
      </View>
    </View>
  ),
  headerStyle: appConfig.styles.navigation.headerStyle,
  headerTitleStyle: appConfig.styles.navigation.headerTitleStyle,
  headerTintColor: appConfig.styles.navigation.headerTintColor,
  headerBackTitleStyle: appConfig.styles.navigation.headerBackTitleStyle,
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
    tabBarOptions: appConfig.styles.navigation.tabBarOptions
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
        headerBackTitle: "Takaisin"
      })
    }
  },
  {
    initialRouteName: '',
  }
);

export default stack;