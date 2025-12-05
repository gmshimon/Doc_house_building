import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slice/AuthSlice.js'
import serviceSlice from './Slice/ServiceSlice.js'
const store = configureStore({
    reducer:{
        authSlice: authSlice,
        services: serviceSlice
    }
})

export default store;