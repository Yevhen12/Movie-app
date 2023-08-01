import { CounterState } from "@/redux/slices/counterSlice";
import { PayloadAction, Slice } from "@reduxjs/toolkit";
import { UserInitialState } from "../slices/userSlice";

export type CounterSliceType = Slice<CounterState, {
    setCounter: (state: CounterState, { payload }: PayloadAction<number>) => void;
}, string>

export type UserSliceType = Slice<UserInitialState, {
    authRequested: (state: UserInitialState) => void;
    authRequestSuccess: (state: UserInitialState, action: {
        payload: any;
        type: string;
    }) => void;
    authRequestFailed: (state: UserInitialState, action: {
        payload: any;
        type: string;
    }) => void;
    statusReset: (state: UserInitialState) => void;
    userLoggedOut: (state: UserInitialState) => void;
}, string>
