import { CounterState } from "@/redux/slices/counterSlice";
import { PayloadAction, Slice } from "@reduxjs/toolkit";

export type CounterSliceType = Slice<CounterState, {
    setCounter: (state: CounterState, { payload }: PayloadAction<number>) => void;
}, string>
