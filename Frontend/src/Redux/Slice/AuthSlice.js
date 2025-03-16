/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth'
import axios from '../../Utilis/axios'
import axiosSecure from '../../Utilis/axiosSecure'
import auth from '../../Firebase/firebase.config'

const initialState = {
  userDetails:null,
  adminDetails:null,
  user: null,
  users: [],
  isLoading: true,
  isLoginLoading: false,
  isLoginError: false,
  isLoginSuccess: false,
  isCreateUserLoading: false,
  isCreateUserError: false,
  isCreateUserSuccess: false,
  isLoginWithGoogleLoading: false,
  isLoginWithGoogleSuccess: false,
  isLoginWithGoogleError: false,
  isGetUserDataLoading: false,
  isGetUserDataSuccess: false,
  isGetUserDataError: false,
  isGetUsersLoading: false,
  isGetUsersSuccess: false,
  isGetUsersError: false,
  isAdminDataLoading: false,
  isAdminDataSuccess: false,
  isAdminDataError:false
}

export const saveUserData = async userData => {
  const response = await axios.post('/user', userData)
  const data = response.data.data
  const tokenExpiration = new Date().getTime() + 3 * 60 * 60 * 1000 // 8 hours from now
  localStorage.setItem(
    'userToken',
    JSON.stringify({
      access_token: response.data.token,
      expiration: tokenExpiration
    })
  )
  return data
}

export const fetchUser = createAsyncThunk('fetchUser', async email => {
  const response = await axios.post(`/user/get-user`, { email: email })
  return response.data.data
})

export const loginUser = createAsyncThunk(
  'loginUser',
  async ({ email, password }) => {
    const res = await signInWithEmailAndPassword(auth, email, password)
    const data = await saveUserData({
      name: res?.user?.displayName,
      email: res?.user?.email
    })
    return data
  }
)

export const createUser = createAsyncThunk(
  'createUser',
  async ({ name, email, password }) => {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const result = updateProfile(auth.currentUser, {
      displayName: name
    })
    const data = await saveUserData({
      name: result?.user?.displayName,
      email: result?.user?.email
    })
    return data
  }
)

export const loginWithGoogle = createAsyncThunk('loginWithGoogle', async () => {
  const provider = new GoogleAuthProvider()
  const response = await signInWithPopup(auth, provider)
  const data = await saveUserData({
    name: response?.user?.displayName,
    email: response?.user?.email
  })
  return data
})

export const getAllUsers = createAsyncThunk('getAllUsers', async () => {
  const response = await axios.get('/user')
  return response.data.data
})

export const getUserDetails = createAsyncThunk('getUserDetails', async () => {
  const response = await axiosSecure.get('/user/get-details')
  return response.data.data
})

export const getAdminDetails = createAsyncThunk('getAdminDetails', async () => {
  const response = await axiosSecure.get('/user/admin-details')
  return response?.data?.data
})

export const logOut = createAsyncThunk('logOut', async () => {
  const response = await signOut(auth)
  localStorage.removeItem('userToken')
  return response
})

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      (state.isLoginLoading = false),
        (state.isLoginError = false),
        (state.isLoginSuccess = false),
        (state.isCreateUserLoading = false)
      state.isCreateUserError = false
      state.isCreateUserSuccess = false
      state.isLoginWithGoogleLoading = false
      state.isLoginWithGoogleSuccess = false
      state.isLoginWithGoogleError = false
      state.isGetUserDataLoading = false
      state.isGetUserDataSuccess = false
      state.isGetUserDataError = false
      state.isGetUsersLoading = false
      state.isGetUsersSuccess = false
      state.isGetUsersError = false
      state.isAdminDataLoading= false
      state.isAdminDataSuccess= false
      state.isAdminDataError=false
    },
    startLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setUser: (state, action) => {
      state.isLoading = false
      state.user = action.payload
    },
    logout: async (state, action) => {
      signOut(auth).then(() => {
        state.user = null
        localStorage.removeItem('userToken')
      })
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoginLoading = true
        state.isLoginError = false
        state.isLoginSuccess = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoginLoading = false
        state.isLoginSuccess = true
        state.isLoginError = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoginLoading = false
        state.isLoginError = true
        state.isLoginSuccess = false
      })
      .addCase(createUser.pending, state => {
        state.isCreateUserLoading = true
        state.isCreateUserError = false
        state.isCreateUserSuccess = false
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isCreateUserError = false
        state.isCreateUserSuccess = true
        state.isCreateUserLoading = false
        state.user = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isCreateUserLoading = false
        state.isCreateUserError = true
        state.isCreateUserSuccess = false
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.user = null
      })
      .addCase(logOut.rejected, (state, action) => {
      })
      .addCase(loginWithGoogle.pending, state => {
        state.isLoginWithGoogleLoading = true
        state.isLoginWithGoogleError = false
        state.isLoginWithGoogleSuccess = false
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoginWithGoogleLoading = false
        state.isLoginWithGoogleSuccess = true
        state.isLoginWithGoogleError = false
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoginWithGoogleLoading = false
        state.isLoginWithGoogleError = true
        state.isLoginWithGoogleSuccess = false
      })
      .addCase(getAllUsers.pending, (state, action) => {
        state.isGetUsersLoading = true
        state.isGetUsersSuccess = false
        state.isGetUsersError = false
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload
        state.isGetUsersLoading = false
        state.isGetUsersSuccess = true
        state.isGetUsersError = false
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isGetUsersLoading = false
        state.isGetUsersSuccess = false
        state.isGetUsersError = true
      })
      .addCase(fetchUser.pending, (state, action) => {
        state.isGetUserDataLoading = true
        state.isGetUserDataSuccess = false
        state.isGetUserDataError = false
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
        state.isGetUserDataLoading = false
        state.isGetUserDataSuccess = true
        state.isGetUserDataError = false
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isGetUserDataLoading = false
        state.isGetUserDataSuccess = false
        state.isGetUserDataError = true
      })
      .addCase(getUserDetails.fulfilled,(state, action) => {
        state.userDetails = action.payload
      })
      .addCase(getUserDetails.pending,(state, action) =>{
        state.isAdminDataLoading= true
        state.isAdminDataSuccess= false
        state.isAdminDataError=false
      })
      .addCase(getAdminDetails.fulfilled, (state, action) => {
        state.isAdminDataLoading= false
        state.isAdminDataSuccess= true
        state.isAdminDataError=false
        state.adminDetails = action.payload
      })
      .addCase(getAdminDetails.rejected, (state, action) => {
        state.isAdminDataLoading= false
        state.isAdminDataSuccess= false
        state.isAdminDataError=true
      })
  }
})

export const { reset, setUser, logout, startLoading } = AuthSlice.actions
export default AuthSlice.reducer