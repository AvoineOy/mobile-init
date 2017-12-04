import React from 'react';
import { View, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Login } from '@avoine/mobile-components'
import { statusBar } from '../MainTabs'
import appConfig from '../../appConfig'


class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>

        {statusBar({
          barStyle: 'dark-content'
        })}

        <Login
          config={appConfig}
          onLogin={this.props.onLoginSuccess}
        />
      </View>
    );
  }
}

LoginScreen.displayName = 'LoginScreen'
LoginScreen.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired
}

const mapStateToProps = (ownProps) => {
  return {
    isLoggedIn: ownProps.login.access_token !== undefined
  }
}

export default connect(
  mapStateToProps,
  null
)(LoginScreen)