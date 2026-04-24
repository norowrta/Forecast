import { useEffect } from "react";

import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

import CitiesProvider from "./components/context/CitiesProvider";
import AuthProvider from "./components/context/AuthContext";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 150,
    });
  }, []);

  return (
    <AuthProvider>
      <CitiesProvider>
        <div className="appWrapper">
          <Header />
          <Hero />
          <Main />
          <Footer />
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </CitiesProvider>
    </AuthProvider>
  );
}
