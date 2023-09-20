import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './reset.css';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ReactQueryDevtools } from 'react-query/devtools'
import { AuthProvider } from './Context/AuthContext';
import { BasketProvider } from './Context/BasketContext';

//alttaki kod ile her sayfa geçişinde veri çekmeyi engelledik, sadece yenileyince tekrar veri çekiyor
const queryClient = new QueryClient(
  {
    defaultOptions : {
      queries :{
        refetchOnMount : false,
        refetchOnWindowFocus : false
      }
    }
  }
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <AuthProvider>
        <BasketProvider>
      <App />
         </BasketProvider>
      </AuthProvider>
    </ChakraProvider>

    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>  
  </React.StrictMode>,
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
