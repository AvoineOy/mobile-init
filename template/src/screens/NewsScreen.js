import React from 'react';
import { ScrollView, Image, View, Dimensions, StatusBar, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

import { loginRequired } from '../loginRequired'
import { defaultStyles, NewsList } from '@avoine/mobile-components'

import appConfig from '../../appConfig'

class NewsScreen extends React.Component {
  static navigationOptions = {
    title: 'Uutiset',
    tabBarLabel: 'Uutiset',
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
    this.refreshNews();
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
      .catch(err => console.log('refreshNews() error:', err))
  }

  convertDate = (timestamp) => timestamp * 1000;

  render() {
    const { navigation, openNewsItem } = this.props;
    const deviceWidth = Dimensions.get("window").width;
    let styles = defaultStyles;

    return (
      <ScrollView
        horizontal={false}
        style={{
          flex: 1
        }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refreshNews.bind(this)}
          />
        }
      >
        <StatusBar
          backgroundColor="#cb005c"
          barStyle="light-content"
          hidden={false}
        />
        <NewsList
          items={this.state.items}
          style={styles}
          navigation={navigation}
          map={{id: 'node_id', date: 'created_date' , thumbnail: 'image' }}
          convertDate={this.convertDate}
        />
      </ScrollView>
    );
  }
}

NewsScreen.propTypes = {
  navigation: PropTypes.object,
  openNewsItem: PropTypes.func
}

const mapStateToProps = (ownProps) => {
  return {
    isLoggedIn: ownProps.login.access_token !== undefined,
    openNewsItem: (newsItem) => {
      ownProps.navigation.navigate('NewsItem', {newsItem: newsItem})
    }
  }
}

export default loginRequired(connect(
  mapStateToProps,
  null
)(NewsScreen), true);