import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ListingDetail from './pages/ListingDetail';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import MyBookings from './pages/MyBookings';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isForgotPasswordFromAdmin = location.pathname === '/forgot-password' && location.state?.fromAdmin;
  const isCreateOrEditFromAdmin = (location.pathname === '/create-listing' || location.pathname.startsWith('/edit-listing')) && document.referrer.includes('/admin');

  const hideNavAndFooter = isAdminPage || isForgotPasswordFromAdmin || isCreateOrEditFromAdmin;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!hideNavAndFooter && <Navbar />}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/edit-listing/:id" element={<EditListing />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
