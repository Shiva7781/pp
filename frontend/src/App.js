import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Images from "./components/Images";
import { AuthState } from "./components/context/AuthContextProvider";

function App() {
  const { user } = AuthState();

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/images" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/images" /> : <Signup />}
        />

        <Route
          path="/images"
          element={user ? <Images /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
