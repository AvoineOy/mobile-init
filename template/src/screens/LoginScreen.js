import React from 'react';
import { View, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Login, defaultStyles } from '@avoine/mobile-components'
import appConfig from '../../appConfig'


class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    // this.styles.AvoineSSOLogin.TextInput.height = 70;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor={appConfig.secondaryColor}
          barStyle="light-content"
          hidden={false}
        />
        <Login
          config={appConfig}
          style={appConfig.Login.style}
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