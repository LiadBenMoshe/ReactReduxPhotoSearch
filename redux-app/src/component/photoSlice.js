import { createSlice } from '@reduxjs/toolkit'

export const photoSlice = createSlice({
  name: 'photos',
  initialState: {
    data: [],
    totalPages : 0
  },
  reducers: {
    updatePhotos: (state, action) => {
      state.data = action.payload.items
      state.totalPages = action.payload.totalPages
    }
  }
})

// Action creators are generated for each case reducer function
export const { updatePhotos } = photoSlice.actions

export default photoSlice.reducer