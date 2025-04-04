import React from "react";
import { logout as userLoggedOut } from "../../../store/authSlice";
import { useDispatch } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../../config";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/users/logout`);
      console.log(res)
      dispatch(userLoggedOut());
      navigate("/");
    } catch (error) {
      console.log("Error in logged out");
      throw error;
    }
  };

  return (
    <button
      onClick={() => handleLogout()}
      className="flex items-center gap-2 px-4 py-1.5 text-gray-300 hover:bg-neutral-900 rounded-full hover:text-red-500"
    >
      <FiLogOut size={18} />
      <span>Logout</span>
    </button>
  );
}

export default Logout;
