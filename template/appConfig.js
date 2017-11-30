import { buildConfig } from '@avoine/mobile-components'

const mainColor = '#ccc';
const secondaryColor = '#000';
const hilightColor = '#FDE311';
const inactiveMainColor = '#666';
const inactiveSecondaryColor = '#222';

let siteConfig = {
  storage: '@fi.avoine.mobileapp',

  mainColor,
  secondaryColor,
  hilightColor,
  inactiveMainColor,
  inactiveSecondaryColor,

  /**
   * Login
  */
  // Login: {
  //   url: 'https://tunnistus2.avoine.fi',
  //   instance: 'aaa_santa',
  //   //logo: require('./assets/batman.png'),
  //   codeText: 'Syötä lepakkonumerosi',
  //   codePlaceholder: 'Esim. BAT-001',
  //   codeButtonText: 'TILAA KOODI',
  //   codeButtonIcon: {
  //     name: 'arrow-right',
  //     type: 'material-community',
  //     size: 20,
  //     color: secondaryColor
  //   },
  //   useText: 'Syötä koodi',
  //   useButtonText: 'TUNNISTAUDU',
  //   useButtonIcon: {
  //     name: 'fingerprint',
  //     type: 'material',
  //     size: 32,
  //     color: secondaryColor
  //   },
  //   style: {
  //     outerContainer: {
  //       flex: 1,
  //       flexDirection: 'column',
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //       paddingTop: 0,
  //       paddingLeft: 20,
  //       paddingRight: 20,
  //       paddingBottom: 0,
  //       backgroundColor: secondaryColor,
  //     },
  //     logo: {
  //       width: 200,
  //       height: 100,
  //     },
  //     label: {
  //       fontWeight: 'bold',
  //       color: mainColor,
  //       lineHeight: 26,
  //       textAlign: "center",
  //       width: 300
  //     },
  //     input: {
  //       height: 70,
  //       width: 300,
  //       borderRadius: 10,
  //       backgroundColor: secondaryColor,
  //       borderColor: mainColor,
  //       borderWidth: 1,
  //       color: mainColor,
  //     },
  //     button: {
  //     },
  //     buttonContainer: {
  //       paddingTop: 10
  //     },
  //     buttonStyle: {
  //       backgroundColor: mainColor,
  //       borderRadius: 10,
  //       width: 300
  //     },
  //     buttonTextStyle: {
  //       color: secondaryColor
  //     },
  //   },
  // },

  // styles: {
  //   Login: {
  //     label: {},
  //     input: {},
  //     button: {},
  //   },
  //   navigation: {
  //     headerStyle: {
  //       backgroundColor: mainColor,
  //     },
  //     headerTitleStyle: {
  //       color: secondaryColor,
  //     },
  //     headerTintColor: secondaryColor,
  //     headerBackTitleStyle: {
  //       color: secondaryColor,
  //     },
  //     headerLeft: {
  //       outerContainer: {
  //         paddingLeft: 7
  //       },
  //       innerContainer: {
  //         width: 30,
  //         height: 30,
  //         borderRadius: 15,
  //         paddingLeft: 6,
  //         paddingTop: 5,
  //         backgroundColor: secondaryColor,
  //       }
  //     },
  //     headerRight: {
  //       outerContainer: {
  //         paddingRight: 5,
  //         paddingTop: 5,
  //       },
  //       innerContainer: {}
  //     },
  //     tabBarOptions: {
  //       inactiveTintColor: "#ccc",
  //       activeTintColor: mainColor,
  //       showLabel: true
  //     }
  //   },
  // },
}

const config = buildConfig(siteConfig)

export default config