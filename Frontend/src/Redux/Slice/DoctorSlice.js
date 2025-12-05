/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../Utilis/axios'

const initialState = {
  doctors: [],

  getDoctorsLoading: false,
  getDoctorsSuccess: false,
  getDoctorsError: null,

  createDoctorsLoading: false,
  createDoctorsSuccess: false,
  createDoctorsError: null,

  editDoctorsLoading: false,
  editDoctorsSuccess: false,
  editDoctorsError: null,

  deleteDoctorsLoading: false,
  deleteDoctorsSuccess: false,
  deleteDoctorsError: null
}

export const getDoctors = createAsyncThunk(
  'doctor/getDoctors',
  async (name = null, thunkAPI) => {
    try {
      let query = ''
      if (name) {
        query = `?name=${name}`
      }
      const response = await axios.get(`/doctor${query}`)
      return response.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const DoctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    reset: state => {
      state.getDoctorsLoading = false
      state.getDoctorsSuccess = false
      state.getDoctorsError = null

      state.createDoctorsLoading = false
      state.createDoctorsSuccess = false
      state.createDoctorsError = null

      state.editDoctorsLoading = false
      state.editDoctorsSuccess = false
      state.editDoctorsError = null

      state.deleteDoctorsLoading = false
      state.deleteDoctorsSuccess = false
      state.deleteDoctorsError = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getDoctors.pending, state => {
        state.getDoctorsLoading = true
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.getDoctorsLoading = false
        state.getDoctorsSuccess = true
        state.doctors = action.payload
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.getDoctorsLoading = false
        state.getDoctorsError = action.payload
      })
  }
})

const { reset } = DoctorSlice.actions
export default DoctorSlice.reducer
