/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../Utilis/axios'

const initialState = {
  doctors: [],
  availability: [],
  doctorDetails: null,

  getDoctorsLoading: false,
  getDoctorsSuccess: false,
  getDoctorsError: null,

  getDoctorDetailsLoading: false,
  getDoctorDetailsSuccess: false,
  getDoctorDetailsError: null,

  createDoctorsLoading: false,
  createDoctorsSuccess: false,
  createDoctorsError: null,

  editDoctorsLoading: false,
  editDoctorsSuccess: false,
  editDoctorsError: null,

  deleteDoctorsLoading: false,
  deleteDoctorsSuccess: false,
  deleteDoctorsError: null,

  getDoctorAvailabilityLoading: false,
  getDoctorAvailabilitySuccess: false,
  getDoctorAvailabilityError: null,

  makeAppointmentLoading: false,
  makeAppointmentSuccess: false,
  makeAppointmentError: null
}

export const createDoctor = createAsyncThunk(
  'doctor/createDoctor',
  async (doctorData, thunkAPI) => {
    try {
      const response = await axios.post('/doctor', doctorData)
      return response.data.data
    }
    catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

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

export const getDoctorById = createAsyncThunk(
  'doctor/getDoctorById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/doctor/${id}`)
      return response.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const getDoctorAvailability = createAsyncThunk(
  'doctor/getDoctorAvailability',
  async ({ doctorId, date, serviceId }, thunkAPI) => {
    try {
      const response = await axios.get(`/doctor/${doctorId}/availability?serviceId=${serviceId}&date=${date}`)
      return response.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const makeAppointment = createAsyncThunk(
  'doctor/makeAppointment',
  async (appointmentData, thunkAPI) => {
    try {
      const response = await axios.post('/appointment', appointmentData)
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

      state.getDoctorDetailsLoading = false
      state.getDoctorDetailsSuccess = false
      state.getDoctorDetailsError = null

      state.createDoctorsLoading = false
      state.createDoctorsSuccess = false
      state.createDoctorsError = null

      state.editDoctorsLoading = false
      state.editDoctorsSuccess = false
      state.editDoctorsError = null

      state.deleteDoctorsLoading = false
      state.deleteDoctorsSuccess = false
      state.deleteDoctorsError = null

      state.getDoctorAvailabilityLoading = false
      state.getDoctorAvailabilitySuccess = false
      state.getDoctorAvailabilityError = null

      state.makeAppointmentLoading = false
      state.makeAppointmentSuccess = false
      state.makeAppointmentError = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createDoctor.pending, state => {
        state.createDoctorsLoading = true
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.createDoctorsLoading = false
        state.createDoctorsSuccess = true
        state.doctors.push(action.payload)
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.createDoctorsLoading = false
        state.createDoctorsError = action.payload
      })

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
      .addCase(getDoctorById.pending, state => {
        state.getDoctorDetailsLoading = true
        state.getDoctorDetailsSuccess = false
        state.getDoctorDetailsError = null
      })
      .addCase(getDoctorById.fulfilled, (state, action) => {
        state.getDoctorDetailsLoading = false
        state.getDoctorDetailsSuccess = true
        state.doctorDetails = action.payload
      })
      .addCase(getDoctorById.rejected, (state, action) => {
        state.getDoctorDetailsLoading = false
        state.getDoctorDetailsError = action.payload
      })

      .addCase(getDoctorAvailability.pending, state => {
        state.getDoctorAvailabilityLoading = true
        state.getDoctorAvailabilitySuccess = false
        state.getDoctorAvailabilityError = null
      })
      .addCase(getDoctorAvailability.fulfilled, (state, action) => {
        state.getDoctorAvailabilityLoading = false
        state.getDoctorAvailabilitySuccess = true
        state.availability = action.payload
      })
      .addCase(getDoctorAvailability.rejected, (state, action) => {
        state.getDoctorAvailabilityLoading = false
        state.getDoctorAvailabilityError = action.payload
      })

      .addCase(makeAppointment.pending, state => {
        state.makeAppointmentLoading = true
        state.makeAppointmentSuccess = false
        state.makeAppointmentError = null
      })
      .addCase(makeAppointment.fulfilled, state => {
        state.makeAppointmentLoading = false
        state.makeAppointmentSuccess = true
      })
      .addCase(makeAppointment.rejected, (state, action) => {
        state.makeAppointmentLoading = false
        state.makeAppointmentError = action.payload
      })
  }
})

export const { reset } = DoctorSlice.actions
export default DoctorSlice.reducer
