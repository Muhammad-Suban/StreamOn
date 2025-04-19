import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser, FiImage } from "react-icons/fi";
import axios from "axios";
import BACKEND_URL from "../../config";

function Register({ onRegister }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    fullName: "",
    password: "",
    avator: null,
    coverImage: null,
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });

  // };

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const handleImageChange = (e, type) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData({ ...formData, [name]: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "avator") {
          setAvatarPreview(reader.result);
        } else {
          setCoverPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/register`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Registration successful!");
      onRegister("LoggedIn");
      navigate("/");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-neutral-900 p-8 rounded-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="mt-2 text-gray-400">Join our community today</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Cover Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Cover Image
              </label>
              <div
                className="mt-1 relative h-32 rounded-lg border-2 border-dashed border-neutral-700 hover:border-red-500 transition-colors"
                style={{
                  backgroundImage: coverPreview
                    ? `url(${coverPreview})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    coverPreview ? "bg-black bg-opacity-50" : "bg-neutral-800"
                  }`}
                >
                  <div className="text-center">
                    <FiImage className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-300">
                      Upload Cover Image
                    </p>
                  </div>
                  <input
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "coverImage")}
                    id="coverImage"
                    name="coverImage"
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Avatar Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Profile Picture
              </label>
              <div
                className="mt-1 relative w-32 h-32 mx-auto rounded-full border-2 border-dashed border-neutral-700 hover:border-red-500 transition-colors overflow-hidden"
                style={{
                  backgroundImage: avatarPreview
                    ? `url(${avatarPreview})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    avatarPreview ? "bg-black bg-opacity-50" : "bg-neutral-800"
                  }`}
                >
                  <div className="text-center">
                    <FiImage className="mx-auto h-6 w-6 text-gray-400" />
                    <p className="mt-1 text-xs text-gray-300">Upload Avatar</p>
                  </div>
                  <input
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "avator")}
                    type="file"
                    id="avator"
                    name="avator"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-300"
              >
                Full Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 bg-neutral-800 text-white placeholder-gray-400"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* userName */}
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-300"
              >
                username
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="userName"
                  type="text"
                  required
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 bg-neutral-800 text-white placeholder-gray-400"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 bg-neutral-800 text-white placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
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
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-700 rounded-lg focus:outline-none focus:border-red-500 bg-neutral-800 text-white placeholder-gray-400"
                  placeholder="Create a password"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={()=>navigate("/")}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-red-500 hover:text-red-400 font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
