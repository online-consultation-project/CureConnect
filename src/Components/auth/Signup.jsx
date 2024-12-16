import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Added for decoding Google credential response
import { toast } from "react-toastify";
import Doctor from "../../assets/young-doctors-with-papers-hallway.jpg";
import Logo from "../../assets/CC_logo3.png";

const urlApi = "http://localhost:7000/user";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios
        .post(`${urlApi}/register`, {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
        .then((res) => {
          toast.success(res.data.message);
          navigate("/login");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  // Handle Google Sign-Up
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Decode the credential response using jwtDecode
      const decoded = jwtDecode(credentialResponse);

      const payload = {
        googleId: decoded.sub, // Unique Google ID
        username: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      };

      const response = await axios
        .post(`${urlApi}/googleAuth`, payload)
        .then((res) => {
          toast.success(res.data.message);
          navigate("/login");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (err) {
      console.log(error);
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

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-gray-400 rounded mb-4"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-gray-400 rounded mb-4"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-gray-400 rounded mb-4"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-gray-400 rounded mb-4"
                  required
                />
                <div className="mb-4">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  I agree to the terms and conditions
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded"
                >
                  Register
                </button>
              </form>

              <div className="text-center my-4">OR</div>

              <GoogleLogin
                onSuccess={(credentialResponse) =>
                  handleGoogleSuccess(credentialResponse.credential)
                }
                onError={() => setError("Google Sign-Up Failed.")}
                useOneTap
                shape="pill"
                text="signup_with"
              />

              <p className="text-center mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default Register;
