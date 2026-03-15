/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosSecure from '../../Utilis/axiosSecure'

const initialState = {
    aiSymptomAnalyzeResponse: null,

    aiSymptomAnalyzeLoading:false,
    aiSymptomAnalyzeError:null,
    aiSymptomAnalyzeSuccess:false,
}

export const aiSymptomAnalyze = createAsyncThunk(
    'ai/aiSymptomAnalyze',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.post('/ai-symptom/analyze', formData)
            console.log('AI Symptom Analyze Response:', response.data.data) // Log the entire response for debugging
            return response.data.data.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    })

const AISlice = createSlice({
    name:'AI',
    initialState,
    reducers:{
        reset:state=>{

            state.aiSymptomAnalyzeLoading = false
            state.aiSymptomAnalyzeError = null
            state.aiSymptomAnalyzeSuccess = false
        }
    },
    extraReducers:builder=>{
        builder
        .addCase(aiSymptomAnalyze.pending,(state)=>{
            state.aiSymptomAnalyzeLoading = true
            state.aiSymptomAnalyzeError = null
            state.aiSymptomAnalyzeSuccess = false
        })
        .addCase(aiSymptomAnalyze.fulfilled,(state,action)=>{
            state.aiSymptomAnalyzeLoading = false
            state.aiSymptomAnalyzeError = null
            state.aiSymptomAnalyzeSuccess = true
            state.aiSymptomAnalyzeResponse = action.payload
        })
        .addCase(aiSymptomAnalyze.rejected,(state,action)=>{
            state.aiSymptomAnalyzeLoading = false
            state.aiSymptomAnalyzeError = action.payload.message || 'Failed to analyze symptoms'
            state.aiSymptomAnalyzeSuccess = false
        })
    }
})

export const {reset} = AISlice.actions
export default AISlice.reducer