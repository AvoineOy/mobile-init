import React from 'react';
import { ScrollView, Image, View, Dimensions, StatusBar, RefreshControl, Text, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

import { NewsList } from '@avoine/mobile-components'

import { statusBar } from '../MainTabs'
import appConfig from '../../appConfig'
import * as actions from '../actions'
import { ext, LoginScreen } from '../screens'

class ProfileScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  static navigationOptions = {
    title: 'Omat tiedot',
    tabBarLabel: 'Omat tiedot',
    headerBackTitle: null,
    tabBarVisible: true,
    tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
  }

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      refreshing: false
    }
  }

  render() {
    if (!this.props.isLoggedIn) {
      return (<LoginScreen />)
    }

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

        <Text>Is logged:</Text>

        <Text>
          {this.props.isLoggedIn ? 'true' : 'false'}
        </Text>

        <Button onPress={this.props.logout} title='logout' />
      </ScrollView>
    );
  }
}

const mapStateToProps = (ownProps) => {
  return {
    isLoggedIn: ownProps.login.access_token !== undefined,
    access_token: ownProps.login.access_token || 'undefined',
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(actions.logout())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);