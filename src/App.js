import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./pages/home.jsx";
import Registro from "./pages/registro.jsx";
import Login from "./pages/login.jsx";
import PetBotChat from "./pages/petbot.jsx";
import Mascotas from "./pages/mascotas.jsx";
import AdminTable from "./features/admin/AdminTable.jsx";
import VacunasPanel from "./features/admin/VacunaModal.jsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import AdoptionForm from "./components/AdoptionForm";
import { getMascota } from "./api/mascotas";
import { useParams } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthContext";
import { ProtectedRoute } from "./features/auth/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdoptionFormPage() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMascota(id).then((res) => {
      if (res && res.data) setPet(res.data);
      else setPet(null);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (!pet) return <div>No se encontró la mascota.</div>;
  return <AdoptionForm pet={pet} />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mascotas" element={<Mascotas />} />
            <Route path="/petbot" element={<PetBotChat />} />
            <Route
              path="/panelAd"
              element={
                <ProtectedRoute>
                  <AdminTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vacunas"
              element={
                <ProtectedRoute>
                  <VacunasPanel />
                </ProtectedRoute>
              }
            />
            <Route path="/adopcion/:id" element={<AdoptionFormPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
