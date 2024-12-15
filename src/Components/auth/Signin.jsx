import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import {jwtDecode} from "jwt-decode"; // To decode the Google credential response

const urlApi = "http://localhost:7000/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle Normal Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${urlApi}/login`, { email, password });
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.findEmail._id);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.");
    }
  };

  // Handle Google Login Success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential); // Decode Google response
      const payload = {
        email: decoded.email,
        username: decoded.name,
        googleId: decoded.sub,
        picture: decoded.picture,
      };

      const response = await axios.post(`${urlApi}/googleAuth`, payload);
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.findEmail._id);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Google Sign-In Failed.");
    }
  };

  return (
    <GoogleOAuthProvider clientId="124694299923-jvh9t1q6abeh6f2ft1r78l43c7dih7aa.apps.googleusercontent.com">
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          {error && <p className="text-red-500">{error}</p>}

          {/* Normal Login Form */}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Login
            </button>
          </form>

          <div className="text-center my-4">OR</div>

          {/* Google Login */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google Sign-In Failed.")}
            useOneTap
            shape="pill"
            text="signin_with"
          />

          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
