import React from 'react'
import { Provider } from 'react-redux'
import { AsyncStorage, View, ActivityIndicator, Text } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import store from './store'
import reducers from './reducers'

import SampleMobileApp from './components/SampleMobileApp'
import * as actions from './actions'
import * as screens from './screens';
import appConfig from '../appConfig'
import { getSession, clearSession } from './session'
import { consoleLogger } from './middleware';
import { setTimeout } from 'core-js/library/web/timers';


export default class App extends React.Component {
  /**
   * Default state
   */
  state = {
    store: store,
    isLoading: true,
    isLoggedIn: false,
  }

  constructor(props) {
    super(props);

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.checkPriorLogin = this.checkPriorLogin.bind(this)
  }

  componentWillMount() {
    // clearSession()
    this.checkPriorLogin()

    // setTimeout(() => { this.state.store.dispatch(actions.login('fake login')) }, 5000)
  }

  componentWillUpdate() {
    console.log('App will update...')
  }

  async checkPriorLogin() {
    const self = this;
    const session = await getSession()

    if (!session) {
      this.setState({
        isLoading: false
      })

      return false;
    }

    /**
     * Create a new store to make sure
     */
    let initialStore = createStore(reducers, session, applyMiddleware(consoleLogger))
    const hash = session.login.access_token || undefined

    if (hash)  {
      self.setState({
        store: initialStore,
        isLoggedIn: true,
        isLoading: false
      });
    } else {
      self.setState({
        store: initialStore,
        isLoading: false
      })
    }

    return true;
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
      <Provider store={this.state.store}>
        <SampleMobileApp onLogout={this.onLogout} onLoginSuccess={this.onLoginSuccess} />
      </Provider>
    )
  }
}
