import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { postApi } from './services'
import postget from './features/product/cartSlice'

const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    postget,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)
export { store }
