import React from 'react';
import { Provider, AnyIfEmpty } from 'react-redux';
import { Store } from 'redux';
import configureStoreFunction from './utils/configureStore';
import Test from './layouts/Test';

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
    return (
      <Provider store={this.store}>
        <Test backgroundColor="red" />
      </Provider>
    );
  }
}

export default App;
