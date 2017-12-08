import React from 'react';
import { ScrollView, Image, View, Dimensions, StatusBar, RefreshControl, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

import { loginRequired } from '../loginRequired'
import { NewsList } from '@avoine/mobile-components'

import { statusBar } from '../MainTabs'
import appConfig from '../../appConfig'
import { ext } from '../screens'

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Omat tiedot',
    tabBarLabel: 'Omat tiedot',
    headerBackTitle: null,
    tabBarVisible: true,
    tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
  }

  constructor(props) {
    super(props);

    // this.loginRequired = true

    this.state = {
      items: [],
      refreshing: false
    }
  }

  componentWillMount() {
    /* if (this.loginRequired && this.props.isLoggedIn === false) {
      const navigateAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'LoginScreen' })
        ]
      })
      
      this.props.navigation.dispatch(navigateAction)
    } */
  }

  render() {
    return (
      <ScrollView
        horizontal={false}
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => {}}
          />
        }
      >

        {statusBar()}

        <Text>Token:</Text>

        <Text>
          {this.props.access_token}
        </Text>
      </ScrollView>
    );
  }
}

ProfileScreen.propTypes = {
  navigation: PropTypes.object,
  access_token: PropTypes.object,
}

const mapStateToProps = (ownProps) => {
  return {
    isLoggedIn: ownProps.login.access_token !== undefined,
    access_token: ownProps.login.access_token || null,
  }
}

export default loginRequired(connect(
  mapStateToProps,
  null
)(ProfileScreen), true);