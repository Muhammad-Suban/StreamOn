import { useState,useEffect } from "react";
import { FiMenu, FiSearch, FiVideo, FiBell, FiLogOut } from "react-icons/fi";
import Sidebar from "./components/Sidebar";
import { Login, Logout, Register } from "./components/Auth/index";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function App() {
  const user = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [authPage, setAuthPage] = useState(null); // 'login' or 'register'
  const [currentUser,setCurrentUser]= useState([])


  useEffect(()=>{
    (async()=>{

      try {
         const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/current-user`,{
          withCredentials: true,
         }) 
        setCurrentUser(res?.data?.data)
        console.log("current user:: ",res?.data?.data)
        console.log("sucessfully fetched currenct user")
      } catch (error) {
        console.log("failed to fetched the current user",error)
        throw error
      }
    })()
  },[])

  const handleLogin = (formData) => {
    console.log("Login data:", formData);
    setIsLoggedIn(true);
    setAuthPage(null);
  };

  const handleRegister = (formData) => {
    console.log("Register data:", formData);
    setIsLoggedIn(true);
    setAuthPage(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Show auth pages if not logged in and auth page is selected
  if (authPage === "login") {
    return (
      <Login
        onLogin={handleLogin}
        onSwitchToRegister={() => setAuthPage("register")}
      />
    );
  }

  if (authPage === "register") {
    return (
      <Register
        onRegister={handleRegister}
        onSwitchToLogin={() => setAuthPage("login")}
      />
    );
  }


  return (
    <div className="h-screen flex flex-col bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-black flex items-center justify-between px-4 z-50 border-b border-neutral-900">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-neutral-900 rounded-full text-gray-300"
          >
            <FiMenu size={20} />
          </button>
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-xl font-bold text-red-600">Stream</span>
            <span className="text-xl font-bold text-white">On</span>
          </div>
        </div>

        <div className="flex items-center flex-1 max-w-2xl mx-4">
          <div className="flex flex-1">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-l-full focus:outline-none focus:border-red-600 text-white placeholder-gray-400"
            />
            <button className="px-6 py-2 bg-neutral-900 border border-l-0 border-neutral-800 rounded-r-full hover:bg-neutral-800 text-gray-300">
              <FiSearch size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <button
                onClick={() => navigate("/studio")}
                className="p-2 hover:bg-neutral-900 rounded-full text-gray-300 hover:text-red-500"
              >
                <FiVideo size={20} />
              </button>
              <div className="relative">
                <button className="p-2 hover:bg-neutral-900 rounded-full text-gray-300 hover:text-red-500">
                  <FiBell size={20} />
                </button>
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <img
                  src={currentUser?.avator}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <Logout />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-1.5 text-red-500 hover:bg-neutral-900 rounded-full"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-1.5 bg-red-600 text-white rounded-full hover:bg-red-700"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex pt-14 h-full">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1 bg-black overflow-y-auto">
          <div className="p-4 w-full">
            <Outlet />
          </div>
        </main>
      </div>
      
    </div>
  );
}

export default App;
