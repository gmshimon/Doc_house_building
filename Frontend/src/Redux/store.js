import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slice/AuthSlice.js'
import serviceSlice from './Slice/ServiceSlice.js'
import doctorSlice from './Slice/DoctorSlice.js'
const store = configureStore({
    reducer:{
        authSlice: authSlice,
        services: serviceSlice,
        doctors: doctorSlice
    }
})

export default store;
