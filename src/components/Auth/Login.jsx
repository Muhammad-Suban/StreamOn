import { useState } from "react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login  as userLoggedIn} from "../../../store/authSlice";

function Login({ onLogin, onSwitchToRegister }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("CHECK FORM-DATA", formData);

    try {
      let response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/login`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      // let response = await axios.post(`/api/v1/users/login`, formData, {
      //   headers: { "Content-Type": "application/json" },
      //   withCredentials: true,
      // });

      console.log("successfully login ::", response);
      dispatch(userLoggedIn(formData))
      navigate("/");
      

    } 
    catch (error) {
      console.error("Error logging in user:", error);
      throw e;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="max-w-md w-full space-y-8 bg-neutral-900 p-8 rounded-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="mt-2 text-gray-400">Please sign in to your account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="userNameOrEmail"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="Email"
                  name="email"
                  type="text"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 bg-neutral-800 text-white placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-300"
              >
                Username
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="Username"
                  name="Username"
                  type="text"
                  required
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      userName: e.target.value,
                    })
                  }
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 bg-neutral-800 text-white placeholder-gray-400"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 bg-neutral-800 text-white placeholder-gray-400"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-red-500 hover:text-red-400 font-medium"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
