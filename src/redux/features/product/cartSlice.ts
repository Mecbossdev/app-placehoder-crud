import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const productSlice = createSlice({
  name: 'products',
  initialState: {
    post: [],
  },
  reducers: {
  },
})

export const { deleteCart } = productSlice.actions

export const getProductsSelector = (state: RootState) => state.postget

export default productSlice.reducer
