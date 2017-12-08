import React from 'react'
import { Provider } from 'react-redux'
import { AsyncStorage, View, ActivityIndicator, Text } from 'react-native'
import { createStore } from 'redux'
import store from './reducers'

import SampleMobileApp from './components/SampleMobileApp'
import * as actions from './actions'
import * as screens from './screens';
import appConfig from '../appConfig'
import { LOGIN } from './actions';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const storeState = store.getState();

    this.state = {
      isLoading: true,
      isLoggedIn: storeState.login.access_token !== undefined
    }

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentWillMount() {
    const hash = this.checkPriorLogin()
      .then(hash => {
        if (hash !== undefined) {
          this.setState({
            isLoggedIn: true,
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          })
        }
      });
  }

  async checkPriorLogin() {
    const hash = await AsyncStorage.getItem(appConfig.storage + ':' + 'access_token')
      .then(foo => foo);

    return hash || undefined;
  }

  onLoginSuccess(access_token) {
    store.dispatch(actions.login(access_token));
    this.setState({ isLoggedIn: true });
  }

  onLogout() {
    store.dispatch(actions.logout());
    this.setState({ isLoggedIn: false });
  }

  render() {
    const state = store.getState();

    if (this.state.isLoading) {
      return (
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center'
        }}
        >
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 20,
              fontWeight: "bold"
            }}
          >Tietoja noudetaan...</Text>
          <ActivityIndicator
            size="large"
            animating={this.state.isLoading}
          />
        </View>
      );
    }

    return (
      <Provider store={store}>
        <SampleMobileApp onLogout={this.onLogout} onLoginSuccess={this.onLoginSuccess} />
      </Provider>
    )
  }
}
