import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((item) => item._id === paste._id)

      if (index >= 0) {
        // If the course is already in the Pastes, do not modify the quantity
        toast.error("Paste already exist")
        return
      }
      // If the course is not in the Pastes, add it to the Pastes
      state.pastes.push(paste)
      
      // Update to localstorage
      localStorage.setItem("pastes", JSON.stringify(state.pastes))
      // show toast
      toast.success("Paste added")
    },

    updatePastes: (state, action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((item) => item._id === paste._id)

      if (index >= 0) {
        // If the course is found in the Pastes, update it
        state.pastes[index] = paste
        // Update to localstorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        // show toast
        toast.success("Paste updated")
      }
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload

      console.log(pasteId)
      const index = state.pastes.findIndex((item) => item._id === pasteId)

      if (index >= 0) {
        // If the course is found in the Pastes, remove it
        state.pastes.splice(index, 1)
        // Update to localstorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        // show toast
        toast.success("Paste deleted")
      }
    },
    resetPaste: (state) => {
      state.pastes = []
      // Update to localstorage
      localStorage.removeItem("pastes")
    },
  },
})

export const { addToPastes, removeFromPastes, updatePastes } = pasteSlice.actions

export default pasteSlice.reducer











// import { createSlice } from '@reduxjs/toolkit'
// import toast from 'react-hot-toast';

// const initialState = {
//     pastes : localStorage.getItem('pastes')
//     ? JSON.parse(localStorage.getItem('pastes')) : []
  
// }

// export const pasteSlice = createSlice({
//   name: 'paste',
//   initialState,
//   reducers: {
//     addToPastes: (state,action) => {

//       // add a check -> paste already exists if exists then don't create another one

//       const paste = action.payload;
//       const index = state.pastes.findIndex((item) => item._id === paste._id)

//       if (index >= 0) {
//         // If the course is already in the Pastes, do not modify the quantity
//         toast.error("Paste already exist")
//         return
//       }
//       // If the course is not in the Pastes, add it to the Pastes
//       state.pastes.push(paste)

//       localStorage.setItem('pastes', JSON.stringify(state.pastes));
//       toast.success("Paste created successfully...")
//     },

//     updateToPastes: (state,action) => {
//       const paste = action.payload;

//       const index = state.pastes.findIndex((item) => item._id === paste._id)

//        if (index >= 0) {
//         // If the course is found in the Pastes, update it
//         state.pastes[index] = paste
//         // Update to localstorage
//         localStorage.setItem("pastes", JSON.stringify(state.pastes))
//         // show toast
//         toast.success("Paste updated")
//       }
//     },

//     resetPaste: (state) => {
//       state.pastes = [];

//       localStorage.removeItem('pastes');
      
//     },
//     removeFromPastes: (state, action) => {
//       const pasteId = action.payload;

//       console.log(pasteId);
//       const index = state.pastes.findIndex((item)=> item.id === pasteId);

//       if(index >= 0) {
//       state.pastes.splice(index, 1);

//       localStorage.setItem('pastes', JSON.stringify(state.pastes));

//       toast.success("Paste deleted successfully");
//       }

//   },
// },
// })

// // Action creators are generated for each case reducer function
// export const { addToPastes, updateToPastes, resetAllPaste, removeFromPastes } = pasteSlice.actions

// export default pasteSlice.reducer