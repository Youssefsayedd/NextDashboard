import { configureStore } from '@reduxjs/toolkit';
import UserDataReducer from './userDataslice';

export const store = configureStore({
    reducer: {
        UserData: UserDataReducer,
    }
});

export default store;