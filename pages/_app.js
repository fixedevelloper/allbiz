import '../public/css/style.css'
import '../public/css/custom.css'
import 'react-toastify/dist/ReactToastify.css';
import '../pages/i18n';
import { SessionProvider } from "next-auth/react";
import {ToastContainer} from "react-toastify";

function MyApp({ Component, pageProps }) {
  return  <SessionProvider>
    <Component {...pageProps} />
    <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
    />
  </SessionProvider>
}

export default MyApp
