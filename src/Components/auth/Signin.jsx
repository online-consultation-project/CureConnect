import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // To decode the Google credential response
import Doctor from "../../assets/young-doctors-with-papers-hallway.jpg";
import Logo from "../../assets/CC_logo3.png";

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
    <div className="w-full flex flex-row max-[780px]:justify-center bg-gray-100">
      <img
        src={Doctor}
        alt="docotro"
        className="h-screen w-[50%] max-[780px]:hidden"
      />

      <div className="w-[50%] max-[780px]:w-full max-[440px]:p-7 flex justify-center">
        <GoogleOAuthProvider clientId="124694299923-jvh9t1q6abeh6f2ft1r78l43c7dih7aa.apps.googleusercontent.com">
          <div className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-extrabold text-center mb-8 text-blue-900">
              -- Welcome to CureConnect --
            </h2>

            <div className="w-full max-w-md p-6 rounded-xl shadow-sm shadow-slate-600 bg-white flex flex-col items-center justify-center">
              <img
                src={Logo}
                alt="product icon"
                className="w-36 h-12 text-center mb-8"
              />
              {error && <p className="text-red-500">{error}</p>}

              {/* Normal Login Form */}
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border-2 border-gray-400 rounded mb-6"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border-2 border-gray-400 rounded mb-6"
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
      </div>
    </div>
  );
};

export default Login;
