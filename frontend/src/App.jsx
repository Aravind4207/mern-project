import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Navbar from "./Components/Navbar";
import CartPage from "./Components/CartPage";
import CategoryPages from "./Components/CategoryPages.jsx";
import HomePage from "./Components/HomePage";
import Register from "./Components/Register.jsx";
import Login from "./Components/Login.jsx";
import Profile from "./Components/Profile.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import AdminPage from "./pages/AdminPage.jsx";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        

        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<CategoryPages />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
        <Route path="/cart" element={<CartPage />} />

        
      </Routes>
    </Router>
  )
}

export default App;
