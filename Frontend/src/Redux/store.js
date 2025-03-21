import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slice/AuthSlice.js'
const store = configureStore({
    reducer:{
        authSlice: authSlice
    }
})

export default store;