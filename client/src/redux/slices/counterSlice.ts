import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { Actions } from '../featureKeys';
import { CounterSliceType } from '../types/slicesTypes';

export type CounterState = {
  counter: number;
};

const initialState: CounterState = {
  counter: 0,
};

export const counterSlice: CounterSliceType = createSlice({
  name: Actions.COUNTER,
  initialState,
  reducers: {
    setCounter: (
      state: CounterState,
      { payload }: PayloadAction<number>,
    ) => {
      state.counter = payload;
    },
  },
});

export const { setCounter } = counterSlice.actions;

export const getCounter = ({ counter }: AppState) => counter;

export const counterReducer = counterSlice.reducer;