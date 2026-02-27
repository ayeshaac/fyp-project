import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Vets from "./pages/Vets/Vets";
import Blog from "./pages/blog/blog";
import Surgery from "./pages/Surgery/surgeryPage";
import JoinVet from "./pages/Joinvet/JoinVetPage";
import AdminVets from "./pages/Admin/AdminVets";
import VetLogin from "./pages/Joinvet/VetLogin";
import VetDashboard from "./pages/VetDashboard";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/vets" element={<Vets />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/surgery" element={<Surgery />} />
        <Route path="/join-vet" element={<JoinVet />} />
        <Route path="/admin/vets" element={<AdminVets />} />

        {/* Authentication */}
        <Route path="/vet-login" element={<VetLogin />} />

        {/* Protected Route */}
        <Route
          path="/vet-dashboard"
          element={
            <ProtectedRoute>
              <VetDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;