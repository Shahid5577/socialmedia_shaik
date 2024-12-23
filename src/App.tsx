import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./pages/Footer";
import Header from "./pages/Header";
import CreatePost from "./pages/CreatePost";
import SearchPage from "./pages/Search";
import Settings from "./components/Settings";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          {/* Main Content */}
          <div className="flex-1 overflow-auto pt-16"> {/* Added pt-16 for padding */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>

          {/* Footer Component */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
