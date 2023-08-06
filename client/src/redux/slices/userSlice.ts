import { SignInDataType, SignUpDataType } from '@/dto';
import { AppState, ReduxThunk } from '../store';
import { createAction, createSlice } from '@reduxjs/toolkit';
import authService from '@/services/api/auth.service';
import localStorageService, { SetTokensProps } from '@/services/localStorage.service';
import { Actions } from '../featureKeys';
import { RequestStatuses } from '@/constants/enums';
import { AxiosError } from 'axios';
import { UserSliceType } from '../types/slicesTypes';
import { deleteCookie, setCookie } from 'cookies-next';
import { IUser } from '@/types/types';
import { ACCESS_TOKEN } from '@/constants/common';
import { HYDRATE } from 'next-redux-wrapper';

export type UserInitialState = {
  isLoading: boolean;
  error: string | null;
  auth: {
    userId: string | null;
  };
  isLoggedIn: boolean;
  status: RequestStatuses | null
  user: IUser | null
};

const initialState: UserInitialState = localStorageService.getAccessToken()
  ? {
    isLoading: true,
    error: null,
    auth: { userId: localStorageService.getUserId() },
    isLoggedIn: true,
    status: null,
    user: null,
  }
  : {
    isLoading: false,
    error: null,
    auth: { userId: null },
    isLoggedIn: false,
    status: null,
    user: null
  };

const usersSlice = createSlice({
  name: Actions.USERS,
  initialState: initialState,
  reducers: {
    setCurrentUser: (state: UserInitialState, { payload }: { payload: IUser }) => {
      state.user = payload
      state.auth.userId = payload._id
      console.log('111111111111', payload)
    },
    authRequested: (state: UserInitialState) => {
      state.error = null;
      state.status = RequestStatuses.REQUESTED;
    },
    authRequestSuccess: (state: UserInitialState, action) => {
      state.auth.userId = action.payload.userId;
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.status = RequestStatuses.SUCCEEDED
    },
    authRequestFailed: (state: UserInitialState, action) => {
      state.error = action.payload;
      state.status = RequestStatuses.FAILED
    },
    signUpRequested: (state: UserInitialState) => {
      state.error = null;
      state.status = RequestStatuses.REQUESTED;
    },
    signUpRequestSuccess: (state: UserInitialState) => {
      state.status = RequestStatuses.SUCCEEDED
    },
    signUpRequestFailed: (state: UserInitialState, action) => {
      state.error = action.payload;
      state.status = RequestStatuses.FAILED
    },
    statusReset: (state: UserInitialState) => {
      state.status = null
      state.error = null
    },
    userLoggedOut: (state: UserInitialState) => {
      state.isLoggedIn = false;
      state.auth.userId = null;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.user = action.payload.users.user
    },
  },

});

const { actions, reducer: usersReducer } = usersSlice;

export const {
  authRequested,
  authRequestSuccess,
  authRequestFailed,
  statusReset,
  userLoggedOut,
  signUpRequested,
  signUpRequestSuccess,
  signUpRequestFailed,
  setCurrentUser,
} = actions;

export const signIn =
  ({ payload }: { payload: SignInDataType }): ReduxThunk =>
    async dispatch => {
      const { username, password } = payload;
      dispatch(authRequested());
      try {
        const data: IUser = await authService.signIn({ username, password });
        const { access_token, refresh_token, _id } = data
        const localTokensObject: SetTokensProps = {
          access_token,
          refresh_token,
          _id
        }
        localStorageService.setTokens(localTokensObject);
        setCookie(ACCESS_TOKEN, data.access_token)
        dispatch(authRequestSuccess({ userId: data._id, user: data }));
      } catch (error: any) {
        if (error instanceof AxiosError) {
          dispatch(authRequestFailed(error.response?.data?.message));
        } else {
          dispatch(authRequestFailed(error.message));
        }
      }
    }

export const signUp =
  (payload: SignUpDataType): ReduxThunk =>
    async dispatch => {
      dispatch(signUpRequested());
      try {
        await authService.signUp(payload);
        dispatch(signUpRequestSuccess());
      } catch (error: any) {
        if (error instanceof AxiosError) {
          dispatch(signUpRequestFailed(error.response?.data?.message));
        } else {
          dispatch(signUpRequestFailed(error.message));
        }
      }
    };

export const logOut = (): ReduxThunk => async dispatch => {
  localStorageService.removeAuthData();
  deleteCookie(ACCESS_TOKEN)
  dispatch(userLoggedOut());
};

// export const getCurrentUserData = () => (state: RootState) => {
//   if (state.users.auth) {
//     return state.users.entities
//       ? state.users.entities.find((user: UserType) => user._id === state.users.auth.userId)
//       : null;
//   }
// };

export const getUsersLoadingStatus = () => (state: AppState) => state.users.isLoading;
export const getIsLoggedIn = () => (state: AppState) => state.users.isLoggedIn;
export const getStatus = () => (state: AppState) => state.users.status
export const getCurrentUserId = () => (state: AppState) => {
  return state.users.auth.userId;
};
export const getAuthErrors = () => (state: AppState) => state.users.error;
export const getCurrentUser = () => (state: AppState) => state.users.user

export default usersReducer;