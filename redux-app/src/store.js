import { configureStore } from '@reduxjs/toolkit'
import photoSlice from './component/photoSlice'

export default configureStore({
  reducer: {
    photos: photoSlice
  }
})


