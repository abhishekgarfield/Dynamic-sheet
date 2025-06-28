import {Middleware, configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import {errorLogger} from './middleware/logger';

const middlewares: [Middleware] = [errorLogger];

export const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: {warnAfter: 128},
      serializableCheck: {warnAfter: 128},
    }).concat(middlewares),
  devTools: __DEV__,
});

export type AppStore = typeof store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
