import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import App from './App.jsx'
import './index.css'
import theme from './theme'
import { BrowserRouter } from 'react-router-dom'
import { Contexts } from './Context/userContext.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Contexts>
    <App />
    </Contexts>
    </ChakraProvider>
    </PersistGate>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
