import React from 'react';
import { ScrollView, Image, View, Dimensions, StatusBar, RefreshControl, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

import { NewsList } from '@avoine/mobile-components'

import { NavigationActions } from 'react-navigation'

import { statusBar } from '../MainTabs'
import appConfig from '../../appConfig'

class NewsScreen extends React.Component {
  static navigationOptions = {
    title: 'Avoinen uutiset',
    tabBarLabel: 'Uutiset',
    headerBackTitle: null,
    tabBarVisible: true,
    tabBarIcon: ({ tintColor }) => <Icon name="subject" size={35} color={tintColor} />
  }

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      newsLoading: true,
      refreshing: false
    }

    this.refreshNews = this.refreshNews.bind(this)
  }

  componentWillMount() {
    if (this.loginRequired && this.props.isLoggedIn === false) {
      const navigateAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login'})
        ]
      })
      
      this.props.navigation.dispatch(navigateAction)
    } else {
      this.refreshNews();
    }
  }

  readNews(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => resolve(response.json()))
        .catch(err => reject(err))
      ;
    });
  }

  refreshNews = () => {
    this.setState({refreshing: true});
    this.readNews(appConfig.NewsList.source)
      .then(json => {
        this.setState({
          items: json,
          refreshing: false
        })
      })
      .catch(err => {
        console.log('refreshNews() error:', err)
        this.setState({
          refreshing: false
        })
      })
  }

  // convertDate = (timestamp) => timestamp * 1000;
  convertDate = (input) => {
    const dateParts = /^(.*)\.(.*)\.(.*)$/.exec(input);
    const date = (new Date(dateParts[3] + '-' + dateParts[2] + '-' + dateParts[1]))

    return date.getTime();
  };

  render() {
    const { navigation, openNewsItem } = this.props;
    const deviceWidth = Dimensions.get("window").width;

    if (this.state.refreshing === false && this.state.items.length === 0) {
      return (
        <View
          style={[
            appConfig.style.mainContainer,
            {
              alignItems: 'center',
              justifyContent: 'center'
            }
          ]}
        >

          {statusBar()}

          <View
            style={{
              paddingBottom: 30,
              opacity: 0.7
            }}
          >
            <Image
              source={require('../assets/img/bam.gif')}
              style={{
                width: 100,
                height: 80
              }}
            />
          </View>
          <Text
            style={[appConfig.style.text, { textAlign: 'center' }]}
          >
            Pyhä jysäys, Batman!
            {'\n'}
            Yhtään uutista ei löytynyt!
          </Text>
        </View>
      )
    } else {
      return (
        <ScrollView
          horizontal={false}
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refreshNews.bind(this)}
            />
          }
        >

          {statusBar()}

          <NewsList
            items={this.state.items}
            style={appConfig.NewsList.style}
            appConfig={appConfig}
            map={{summary: 'cutBody', thumbnail: 'image' }}
            convertDate={this.convertDate}
            openNewsItem={this.props.openNewsItem(navigation)}
          />
        </ScrollView>
      );
    }
  }
}

NewsScreen.propTypes = {
  navigation: PropTypes.object,
  openNewsItem: PropTypes.func
}

const mapStateToProps = (ownProps) => {
  return {
    isLoggedIn: ownProps.login.access_token !== undefined,

    /**
     * This returns a function which will navigate to
     * `NewsItemScreen`.
     */
    openNewsItem: (navigation) => (newsItem, appConfig) => {
      navigation.navigate('NewsItemScreen', {
        item: newsItem,
        appConfig
      })
    }
  }
}

export default connect(
  mapStateToProps,
  null
)(NewsScreen)
