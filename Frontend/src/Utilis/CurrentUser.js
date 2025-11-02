/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { fetchUser, startLoading } from "../Redux/Slice/AuthSlice";
// import { getCategory } from "../Redux/Slice/CategorySlice";
import auth from "../Firebase/firebase.config";
import { useDispatch, useSelector } from "react-redux";

const CurrentUser = () => {
    const { user } = useSelector(state => state.authSlice);
    const  dispatch  = useDispatch();
    useEffect(() => {
      if(!sessionStorage.getItem('navOptions')){
        sessionStorage.setItem('navOptions','Home')
      }
    //   dispatch(getCategory())
        onAuthStateChanged(auth, currentUser => {
          if (currentUser?.email) {
            dispatch(fetchUser(currentUser.email))
          } else {
            localStorage.removeItem("userToken")
            dispatch(startLoading(false))
            // dispatch(toggleLoading())
          }
        })
      }, [dispatch, user?.token])
};

export default CurrentUser;