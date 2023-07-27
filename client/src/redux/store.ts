import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { IS_DEV } from '@/constants/common';

import { counterReducer } from './slices/counterSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer
    },
    devTools: IS_DEV,
  });
}

export const store = makeStore();
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type ReduxThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export const nextReduxWrapper = createWrapper<AppStore>(makeStore, { debug: IS_DEV });