import LoginScreen from './LoginScreen'
import NewsScreen from './NewsScreen'
import NewsItemScreen from './NewsItemScreen'
import ProfileScreen from './ProfileScreen'

export function getScreen(screen) {

  const appScreens = {
    LoginScreen: {
      screen: LoginScreen,
    },
    NewsScreen: {
      screen: NewsScreen,
    },
    NewsItemScreen: {
      screen: NewsItemScreen,
    },
    ProfileScreen: {
      screen: ProfileScreen,
    }
  }

  if (!screen) {
    return null
  }

  if (!appScreens[screen]) {
    return null
  }

  return appScreens[screen]
};

export {  
  LoginScreen,
  NewsScreen,
  NewsItemScreen,
  ProfileScreen,
}
