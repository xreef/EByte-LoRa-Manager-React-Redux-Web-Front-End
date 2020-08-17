import {configureStore, MiddlewareArray} from '@reduxjs/toolkit';
import { Store } from 'redux';
// import additionalMiddleware from 'additional-middleware'
import logger from 'redux-logger';
// @ts-ignore
// import untypedMiddleware from 'untyped-middleware'
import throttle from 'lodash.throttle';
import rootReducer from '../redux/reducers';
import { saveState, loadState } from './localStorage';

import logic from '../redux/logic';
import {createLogicMiddleware} from "redux-logic";
import axios from 'axios';

const deps = { // injected dependencies for redux.logic
    httpClient: axios
};

type RootState = ReturnType<typeof rootReducer>


const configureStoreFunction = (id: string, initialConfig: any, autoSaveToLocalStorage: boolean) => {
  let store: Store;

    const logicMiddleware = createLogicMiddleware(logic, deps);

    type StoreDispatch = typeof store.dispatch;


    let middlewares = new MiddlewareArray().concat(logicMiddleware, logger)
    // if (process.env.NODE_ENV !== 'production') middlewares.concat(logger);

    if (autoSaveToLocalStorage) {
    const loadedState = { ...initialConfig, ...loadState(`currState${id}`) };
    console.log('LOAD STATE ', `currState${id}`, loadedState);

    store = configureStore({
      preloadedState: loadedState,
      reducer: rootReducer,
        middleware: middlewares
    });

    store.subscribe(throttle(() => {
      saveState(`currState${id}`,
          {
              //   ...store.getState(),
              // },
              home: {
                  ...{
                      layouts: {
                          lg: [], md: [], sm: [], xs: [], xxs: [],
                      },
                      elements: []
                  },
                  ...store.getState().home
              },
              configurationPage: {
                  ...{
                      layouts: {
                          lg: [], md: [], sm: [], xs: [], xxs: [],
                      },
                      elements: []
                  },
                  ...store.getState().configurationPage
              },
              sendReceiveDataPage: {
                  ...{
                      layouts: {
                          lg: [], md: [], sm: [], xs: [], xxs: [],
                      },
                      elements: []
                  },
                  ...store.getState().sendReceiveDataPage
              }
          }
      );
    }, 1000));
  } else {
    const loadedState = { ...initialConfig };
    if (initialConfig) {
      store = configureStore({
        reducer: rootReducer,
          middleware: middlewares,

        preloadedState: loadedState,
      });

      // store = createStore(reducer, loadedState, applyMiddleware(...middlewares));
    } else {
      store = configureStore({
        reducer: rootReducer,
          middleware: middlewares

          // middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        //   // .prepend(
        //   //     // correctly typed middlewares can just be used
        //   //     additionalMiddleware,
        //   //     // you can also type middlewares manually
        //   //     untypedMiddleware as Middleware<
        //   //         (action: Action<'specialAction'>) => number,
        //   //         RootState
        //   //         >
        //   // )
        //   // prepend and concat calls can be chained
        //   .concat(logger),
      });
    }
  }
    // logicMiddleware.addDeps({ dispatch: store.dispatch });

    return store;
};

export default configureStoreFunction;
// const store = configureStore({
//     reducer: rootReducer,
//     middleware: getDefaultMiddleware =>
//         getDefaultMiddleware()
//             // .prepend(
//             //     // correctly typed middlewares can just be used
//             //     additionalMiddleware,
//             //     // you can also type middlewares manually
//             //     untypedMiddleware as Middleware<
//             //         (action: Action<'specialAction'>) => number,
//             //         RootState
//             //         >
//             // )
//             // prepend and concat calls can be chained
//             .concat(logger)
// })
//
// type AppDispatch = typeof store.dispatch
