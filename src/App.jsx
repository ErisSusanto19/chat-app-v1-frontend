import { RouterProvider } from 'react-router-dom'
import router from './router'
import { Provider } from 'react-redux'
import store from './app/store'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
      <Toaster position='top-center' reverseOrder={false} toastOptions={{duration: 3000, style: {background: "#333", color: "#fff"}}}/>
    </Provider>
  )
}

export default App
