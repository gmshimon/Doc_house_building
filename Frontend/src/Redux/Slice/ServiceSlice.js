/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../Utilis/axios'
import axiosSecure from '../../Utilis/axiosSecure'
const initialState ={
    services: [],
    
    getServicesLoading: false,
    getServicesSuccess: false,
    getServicesError: null,

    createServicesLoading: false,
    createServicesSuccess: false,
    createServicesError: null,

    editServicesLoading: false,
    editServicesSuccess: false,
    editServicesError: null,

    deleteServicesLoading: false,
    deleteServicesSuccess: false,
    deleteServicesError: null,
}

export const getServices = createAsyncThunk(
    'service/getServices',
    async (name=null, thunkAPI) => {
        try {
            let query = ''
            if(name){
                query = `?name=${name}`
            }
            const response = await axios.get(`/services${query}`)
            return response.data.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const createService = createAsyncThunk(
    'service/createService',
    async (serviceData, thunkAPI) => {
        try {
            const response = await axiosSecure.post('/services', serviceData)
            return response.data.data
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deleteService = createAsyncThunk(
    'service/deleteService',
    async (serviceId, thunkAPI) => {
        try {
            await axiosSecure.delete(`/services/${serviceId}`)
            return serviceId
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const updateService = createAsyncThunk(
    'service/updateService',
    async ( {serviceId, serviceData }, thunkAPI) => {
        try {
            console.log('serviceData', serviceData)
            const response = await axiosSecure.put(`/services/${serviceId}`, serviceData)
            return response.data.data
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const ServiceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        reset: (state) => {
            state.getServicesLoading = false
            state.getServicesSuccess = false
            state.getServicesError = null
            
            state.createServicesLoading = false
            state.createServicesSuccess = false
            state.createServicesError = null
        
            state.editServicesLoading = false
            state.editServicesSuccess = false
            state.editServicesError = null
                
            state.deleteServicesLoading = false
            state.deleteServicesSuccess = false
            state.deleteServicesError = null
        }
    },
    extraReducers: (builder) => {
        // get services
        builder.addCase(getServices.pending, (state) => {
            state.getServicesLoading = true
        })
        builder.addCase(getServices.fulfilled, (state, action) => {
            state.getServicesLoading = false
            state.getServicesSuccess = true
            state.services = action.payload
        })
        builder.addCase(getServices.rejected, (state, action) => {
            state.getServicesLoading = false
            state.getServicesError = action.payload
        })

        // create service
        builder.addCase(createService.pending, (state) => {
            state.createServicesLoading = true
        })
        builder.addCase(createService.fulfilled, (state, action) => {
            state.createServicesLoading = false
            state.createServicesSuccess = true
            state.services.push(action.payload)
        })
        builder.addCase(createService.rejected, (state, action) => {
            state.createServicesLoading = false
            state.createServicesError = action.payload
        })

        // delete service
        builder.addCase(deleteService.pending, (state) => {
            state.deleteServicesLoading = true
        })
        builder.addCase(deleteService.fulfilled, (state, action) => {
            state.deleteServicesLoading = false
            state.deleteServicesSuccess = true
            state.services = state.services.filter(
                service => service.id !== action.payload
            )
        })
        builder.addCase(deleteService.rejected, (state, action) => {
            state.deleteServicesLoading = false
            state.deleteServicesError = action.payload
        })

        // update service
        builder.addCase(updateService.pending, (state) => {
            state.editServicesLoading = true
        })
        builder.addCase(updateService.fulfilled, (state, action) => {
            state.editServicesLoading = false
            state.editServicesSuccess = true
            const index = state.services.findIndex(
                service => service.id === action.payload
            )
            if (index !== -1) {
                state.services[index] = action.payload
            }
        })
        builder.addCase(updateService.rejected, (state, action) => {
            state.editServicesLoading = false
            state.editServicesError = action.payload
        })
    }
})

export const { reset } = ServiceSlice.actions
export default ServiceSlice.reducer