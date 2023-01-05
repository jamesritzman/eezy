import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

console.log("env: ", process.env.NODE_ENV);

// if (process.env.NODE_ENV === 'development') {
//   import('./mocks/browser').then((stuff) => {
//     console.log("stuff: ", stuff);
//   });
//   // const brow = import('./mocks/browser');
//   // const { worker } = require('./mocks/browser')

//   // worker.start()
// }


(async () => {
  if (process.env.NODE_ENV === 'development') {
    const { default: myDefault, worker } = await import('./mocks/browser');
    worker.start();
  }
})();



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
