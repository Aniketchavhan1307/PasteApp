import {configureStore} from "@reduxjs/toolkit"
import pasteReducer from "./pasteSlice"

export const store = configureStore({
  reducer:{
      paste: pasteReducer
  }
})