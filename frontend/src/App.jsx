import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Vets from "./pages/Vets/Vets";
import Blog from "./pages/blog/blog";
import Surgery from "./pages/Surgery/surgeryPage";
import JoinVet from "./pages/Joinvet/JoinVetPage";
import AdminVets from "./pages/Admin/AdminVets";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vets" element={<Vets />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/surgery" element={<Surgery />} />
         <Route path="/join-vet" element={<JoinVet />} />
           <Route path="/admin/vets" element={<AdminVets />} />
           

      </Routes>
    </>
  );
}

export default App;
