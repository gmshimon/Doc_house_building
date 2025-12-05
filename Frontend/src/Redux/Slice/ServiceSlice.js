/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../Utilis/axios'
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
    }
})

const { reset } = ServiceSlice.actions
export default ServiceSlice.reducer