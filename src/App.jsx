import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RoomDetailPage from "./pages/RoomDetailPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import Header from "./components/header";
import Footer from "./components/footer";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import ChangePasswordPage from "./pages/ChangePassword";
import RoomPage from "./pages/RoomPage";
import HotelPage from "./pages/HotelPage";
import HotelDetailPage from "./pages/HotelDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import MomoReturnPage from "./pages/MomoReturnPage";
import PaymentResult from "./pages/PaymentResult";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/rooms/:id" element={<RoomDetailPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/payment/:bookingId" element={<PaymentPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/rooms" element={<RoomPage />} />
        <Route path="/hotels" element={<HotelPage />} />
        <Route path="/hotels/:id" element={<HotelDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/momo-return" element={<MomoReturnPage />} />
        <Route path="/payment-result" element={<PaymentResult />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
