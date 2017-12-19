import { buildConfig } from '@avoine/mobile-components'

const mainColor = '#222';
const inactiveMainColor = '#666';

const secondaryColor = '#fff';
const inactiveSecondaryColor = '#ccc';

const hilightColor = '#ca005d';
const inactiveHilightColor = '#dd92b5'

const config = buildConfig(
  {
    storage: '@fi.avoine.sampleapp',
    mainColor,
    inactiveSecondaryColor,
    secondaryColor,
    inactiveSecondaryColor,
    hilightColor,
    inactiveHilightColor,
    statusBarHidden: false,
    statusBarStyle: 'light-content', // 'default' || 'light-content' || 'dark-content'
    config: {
      Login: {
        logo: null,
        codeText: 'Et ole kirjautuneena' + `\n` + 'Syötä numerosi tai emailisi',
      },
    }
  }
)

console.log(config);

config.NewsList.source = 'https://blog.avoine.fi/mobilefeed/'

export default config