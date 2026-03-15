import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slice/AuthSlice.js'
import serviceSlice from './Slice/ServiceSlice.js'
import doctorSlice from './Slice/DoctorSlice.js'
import aiSlice from './Slice/AISlice.js'
const store = configureStore({
    reducer:{
        authSlice: authSlice,
        services: serviceSlice,
        doctor: doctorSlice,
        AI: aiSlice,
    }
})

export default store;
