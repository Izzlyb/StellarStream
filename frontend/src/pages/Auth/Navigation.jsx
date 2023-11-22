
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";


import { 
  AiOutlineHome, 
  AiOutlineShoppingCart,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";

import { FaHeart } from "react-icons/fa";

import "./Navigation.css";

const Navigation = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLoginMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };


  return (
    <div 
        style={{ zIndex: 9999 }}
        id="navigation-container"
        className= {`${showSidebar ? "hidden" : "flex"}
            xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-2 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh] fixed`}
      >
      <div className="flex flex-col justify-center space-y-4">
        <Link
            to="/"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
        </Link>
        <Link
            to="/shop"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
        </Link>
        <Link to="/cart" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
          </div>
        </Link>
        <Link to="/favorite" className="flex relative">
          <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
            <FaHeart className="mt-[3rem] mr-2" size={20} />
              <span className="hidden nav-item-name mt-[3rem]">
                Favorites
              </span>{" "}
            {/* <FavoritesCount /> */}
          </div>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}

        </button>
      </div>

      <ul>
        <li>
          <Link
            to="/login"
            className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
          >
            <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
            <span className="hidden nav-item-name">LOGIN</span>
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
          >
            <AiOutlineUserAdd size={26} />
            <span className="hidden nav-item-name">REGISTER</span>
          </Link>
        </li>
      </ul>

    </div>

  );
};

export default Navigation;
