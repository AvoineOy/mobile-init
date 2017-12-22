import React from 'react';
import { Text, View, StatusBar, Button } from 'react-native'
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MemberCard, Api } from '@avoine/mobile-components'
const { Me } = Api;

import * as actions from '../actions'
import { statusBar } from '../MainTabs'
import appConfig from '../../appConfig'


class MemberCardScreen extends React.Component {

  static navigationOptions = {
    title: 'Jäsenkortti',
    tabBarLabel: 'Jäsenkortti',
    headerBackTitle: null,
    tabBarVisible: true,
    tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
  }

  constructor(props) {
    super(props);

    this.state = {
      me: this.props.me
    }

    this.updateMeData = this.updateMeData.bind(this)
    this.getDataFromMeEndPoint = this.getDataFromMeEndPoint.bind(this)
    this.meDataNeedsUpdate = this.meDataNeedsUpdate.bind(this)
    this.myInfo = this.myInfo.bind(this)
  }

  getDataFromMeEndPoint = () => new Promise((resolve, reject) => {
    Me.get(appConfig.Api.urlMe, this.props.access_token)
      .then(data => {
        console.log('Me:', data)
        resolve(data)
      })
      .catch(err => {
        console.log('ERROR:', err)
        reject(err)
      })
  })

  updateMeData = () => {
    console.log('Update me data...')
    this.getDataFromMeEndPoint()
      .then(data => {
        const updated = (new Date()).getTime()
        this.props.updateMe({data, updated})
        this.setState({
          me: {data, updated}
        })
      })
      .catch(err => console.log('ERROR:', err))
  }

  componentWillMount = () => {
    const { me } = this.state

    if (Me.dataIsExpired(me.updated, appConfig.Api.meValidityInMinutesSoft)) {
      // If data is so old it should be considered not-trusted, remove data
      if (Me.dataIsExpired(me.updated, appConfig.Api.meValidityInMinutesHard)) {
        this.setState({
          me: {
            data: undefined,
            updated: this.state.me.updated
          }
        })
      }

      // Update data
      this.updateMeData()
    }
  }

  meDataNeedsUpdate = () => {
    return 
  }

  myInfo = () => {
    const { me } = this.state

    if (!me.data) {
      return (
        <Text>Tietojasi ei löytynyt.</Text>
      )
    } else {
      return (
        <Text>{me.data.firstname} {me.data.lastname}</Text>
      )
    }
  }

  render() {
    const date = '' + (new Date(this.state.me.updated))
    return (
      <View style={{flex: 1}}>
        <Text>{date}</Text>
        {this.myInfo()}
        <MemberCard />
      </View>
    );
  }
}

const mapStateToProps = (ownProps) => {
  return {
    isLoggedIn: ownProps.login.access_token !== undefined,
    access_token: ownProps.login.access_token,
    me: ownProps.me
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateMe: (obj) => {
      dispatch(actions.updateMe(obj))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberCardScreen)
