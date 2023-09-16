import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import { AuthProvider } from "./components/AuthContext";

function App() {
  const [login, setLogin] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Login setLogin={setLogin} />} path="/login" />
          <Route
            element={<Register login={login} setLogin={setLogin} />}
            path="/Register"
          />
          <Route
            element={<Reset  login={login} setLogin={setLogin} />}
            path="/Reset"
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
