import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import configureStoreFunction from './utils/configureStore';
import Test from './layouts/Test';
import {HashRouter, Switch, Route, BrowserRouter} from 'react-router-dom';

import './style/app.less';

import indexRoutes from './routes'

import 'intl';
import { IntlProvider } from 'react-intl';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/it';
// import { HashRouter, Switch, Route } from 'react-router-dom';
// declare module localeData {
//     export const en: string;
//     export const it: string;
// }
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


// Our translated strings
// import localeData from './i18n/data.json';

import it from './i18n/it.json';
import en from './i18n/en.json';

// interface ILocaleData {
//     it: object,
//     en: object
// }
//
// const localeData: ILocaleData = {
//     it: it,
//     en: en,
// };

const localeData: any = {
  'it': it,
    'en': en
}

if (!Intl.PluralRules) {
    require('@formatjs/intl-pluralrules/polyfill');
    require('@formatjs/intl-pluralrules/locale-data/en'); // Add locale data for de
    require('@formatjs/intl-pluralrules/locale-data/it'); // Add locale data for de
}

if (!Intl.DateTimeFormat) {
    require('@formatjs/intl-relativetimeformat/polyfill');
    require('@formatjs/intl-relativetimeformat/locale-data/en'); // Add locale data for de
    require('@formatjs/intl-relativetimeformat/locale-data/it'); // Add locale data for de
}

const theme = createMuiTheme({
    palette: {
        success: {
            main : "#bac778",
        },
    },

});

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        status: {
            success: React.CSSProperties['color'],
        }
    }
//     interface ThemeOptions {
//         status: {
//             success: React.CSSProperties['color']
//         }
//     }
}

declare module "@material-ui/core/styles/createPalette" {
    interface Palette {
        success: Palette['primary'];
    }
    // interface PaletteOptions {
    //     success: PaletteOptions['primary'];
    // }
}

class App extends React.Component {
  store: Store;

  constructor(props: any) {
    super(props);

    // let data = dataFile;

    this.store = configureStoreFunction('aurora',
      {
        home: {
          layouts: {
            lg: [], md: [], sm: [], xs: [], xxs: [],
          },
          elements: [],
        },

      },
      false);
  }

  render() {
      const language = navigator.language; //|| navigator.userLanguage;
      const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
      // Try full locale, try locale without region code, fallback to 'en'
      const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.it;

      // moment.locale(language);

      return (
      <Provider store={this.store}>
          <IntlProvider locale={language} messages={messages}>
              <ThemeProvider  theme={theme}>

              <HashRouter>
                  {/* <ResponsiveContainer/> */}
                  <Switch>
                      {indexRoutes.map((prop, key) => <Route path={prop.path} component={prop.component} key={key.toString()} />)}
                  </Switch>
              </HashRouter >
              </ThemeProvider >
            {/*<Test backgroundColor="red" />*/}
          </IntlProvider>
      </Provider>
    );
  }
}

export default App;
