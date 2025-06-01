import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminRoute } from './components/auth/AdminRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import Members from './pages/Members';
import MemberDetails from './pages/MemberDetails';
import Checkouts from './pages/Checkouts';
import Settings from './pages/Settings';
import SeatReservation from './pages/SeatReservation';
import ParkingReservation from './pages/ParkingReservation';
import Registration from './pages/Registration';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        
        {/* Protected Member Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="books" element={<Books />} />
            <Route path="books/:id" element={<BookDetails />} />
            <Route path="checkouts" element={<Checkouts />} />
            <Route path="seats" element={<SeatReservation />} />
            <Route path="parking" element={<ParkingReservation />} />
          </Route>
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route element={<Layout />}>
            <Route path="admin" element={<Dashboard />} />
            <Route path="admin/books" element={<Books />} />
            <Route path="admin/books/:id" element={<BookDetails />} />
            <Route path="admin/members" element={<Members />} />
            <Route path="admin/members/:id" element={<MemberDetails />} />
            <Route path="admin/checkouts" element={<Checkouts />} />
            <Route path="admin/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;