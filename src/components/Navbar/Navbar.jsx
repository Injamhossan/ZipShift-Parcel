import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import NavLogo from "../../assets/logo.png";
import useAuthStore from "../../store/authStore";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const links = (
    <>
      <NavLink to={"/services"}>Services</NavLink>
      <NavLink to={"/coverage"}>Coverage</NavLink>
      <NavLink to={"/aboutus"}>About Us</NavLink>
      <NavLink to={"/pricing"}>Pricing</NavLink>
      <NavLink to={"/blog"}>Blog</NavLink>
      <NavLink to={"/contactus"}>Contact Us</NavLink>
    </>
  );

  return (
    <div className="mx-auto max-w-[1800px] pt-5">
      <div className="navbar bg-[#FFFFFF] rounded-2xl py-4 px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-5"
            >
              {links}
            </ul>
          </div>
          <div className="flex items-center">
            <img
              src={NavLogo}
              alt=""
              className="absolute mb-4"
              height="48px"
              width="37px"
            />
            <Link to="/" className="text-[32px] text-[#303030] font-extrabold ml-5">
              ZapShift
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-5 text-[#606060] text-[16px] font-medium">
            {links}
          </ul>
        </div>
        <div className="navbar-end gap-5">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className="avatar placeholder">
                    <div className="bg-[#CAEB66] text-black rounded-full w-10 h-10 flex items-center justify-center font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  </div>
                  <span className="text-[#606060] font-medium hidden md:block">
                    {user?.name || "User"}
                  </span>
                  <i className="fa-solid fa-chevron-down text-[#606060]"></i>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-lg mt-2"
                >
                  <li>
                    <a className="text-[#606060]">Profile</a>
                  </li>
                  <li>
                    <a className="text-[#606060]">Settings</a>
                  </li>
                  <li>
                    <a onClick={handleLogout} className="text-red-600">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline border-[#DADADA] rounded-xl px-8 py-4 text-[#606060] font-bold"
              >
                Sign In
              </Link>
              <div className="flex items-center gap-1">
                <Link
                  to="/register"
                  className="btn bg-[#CAEB66] text-black rounded-xl px-8 py-4 border-none font-bold"
                >
                  Sign Up
                </Link>
                <div className="bg-[#1F1F1F] rounded-[50px] px-3 py-3 h-[42px] w-[42px] justify-center items-center flex">
                  <i className="fa-solid fa-arrow-down rotate-220 text-[#CAEB66] text-[20px]"></i>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
