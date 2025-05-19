import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import AddAgentPage from "./pages/AddAgentPage";
import UploadPage from "./pages/UploadPage";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function AppRoutes() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={token ? <Navigate to="/dashboard" replace /> : <Signup />}
      />
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/" replace />}
      />
      <Route
        path="/add-agent"
        element={token ? <AddAgentPage /> : <Navigate to="/" replace />}
      />
      <Route
        path="/upload"
        element={token ? <UploadPage /> : <Navigate to="/" replace />}
      />
      {/* Optional: 404 Not Found route */}
      <Route path="*" element={<Navigate to={token ? "/dashboard" : "/"} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
