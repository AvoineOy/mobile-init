import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import MainTabs from '../MainTabs'
import actions from '../actions'

class SampleMobileApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;

    return (
      <MainTabs screenProps={{onLogout: this.props.onLogout}} />
    )
  }
}

/**
 * Define prop types
 */
SampleMobileApp.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired
}

const mapStateToProps = (ownProps) => {
  return {
    isLoggedIn: ownProps.login.access_token !== undefined
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLoginState: (login) => {
      if (login)
        dispatch(actions.login('foobar'));
      else
        dispatch(actions.logout());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleMobileApp);