import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
// import additionalMiddleware from 'additional-middleware'
import logger from 'redux-logger';
// @ts-ignore
// import untypedMiddleware from 'untyped-middleware'
import throttle from 'lodash.throttle';
import rootReducer from '../redux/reducers';
import { saveState, loadState } from './localStorage';

type RootState = ReturnType<typeof rootReducer>

const configureStoreFunction = (id: string, initialConfig: any, autoSaveToLocalStorage: boolean) => {
  let store: Store;
  if (autoSaveToLocalStorage) {
    const loadedState = { ...initialConfig, ...loadState(`currState${id}`) };
    console.log('LOAD STATE ', `currState${id}`, loadedState);
    // configureStore({
    //     reducer: rootReducer,
    //     middleware: new MiddlewareArray().concat(additionalMiddleware, logger)
    // })
    //
    // configureStore({
    //     reducer: rootReducer,
    //     middleware: [additionalMiddleware, logger] as const
    // })

    store = configureStore({
      preloadedState: loadedState,
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        // .prepend(
        //     // correctly typed middlewares can just be used
        //     additionalMiddleware,
        //     // you can also type middlewares manually
        //     untypedMiddleware as Middleware<
        //         (action: Action<'specialAction'>) => number,
        //         RootState
        //         >
        // )
        // prepend and concat calls can be chained
        .concat(logger),
    });

    store.subscribe(throttle(() => {
      saveState(`currState${id}`,
        {
          ...store.getState(),
        },
        // home: {
        //         ...{
        //             layouts: {
        //                 lg: [], md: [], sm: [], xs: [], xxs: [],
        //             },
        //             elements: []
        //         },
        //         // ...store.getState().home
        //     }

      );
    }, 1000));
  } else {
    const loadedState = { ...initialConfig };
    if (initialConfig) {
      store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
          // .prepend(
          //     // correctly typed middlewares can just be used
          //     additionalMiddleware,
          //     // you can also type middlewares manually
          //     untypedMiddleware as Middleware<
          //         (action: Action<'specialAction'>) => number,
          //         RootState
          //         >
          // )
          // prepend and concat calls can be chained
          .concat(logger),
        preloadedState: loadedState,
      });

      // store = createStore(reducer, loadedState, applyMiddleware(...middlewares));
    } else {
      store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
          // .prepend(
          //     // correctly typed middlewares can just be used
          //     additionalMiddleware,
          //     // you can also type middlewares manually
          //     untypedMiddleware as Middleware<
          //         (action: Action<'specialAction'>) => number,
          //         RootState
          //         >
          // )
          // prepend and concat calls can be chained
          .concat(logger),
      });
    }
  }
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
