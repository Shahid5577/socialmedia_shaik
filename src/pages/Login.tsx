import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  };

  const handleRegister = () => {
    navigate("/register"); // Adjust this path to your registration page route
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form onSubmit={handleLogin} className="p-4 bg-white shadow-md rounded w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded mb-2">
          Login
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded shadow w-full max-w-sm"
      >
        Login with Google
      </button>
      <button
        onClick={handleRegister}
        className="text-blue-500 underline mt-4"
      >
        Register
      </button>
    </div>
  );
};

export default Login;
