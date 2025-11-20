import React from "react";
import { NavLink } from "react-router-dom";
import NavLogo from "../../assets/logo.png";
const Navbar = () => {
   const links = (
    <>
      <NavLink to={"/"}>Home</NavLink>
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
      <div className="navbar bg-[#FFFFFF] rounded-2xl py-4 px-[32px]">
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
            <a className="text-[32px] text-[#303030] font-extrabold ml-5">
              ZapShift
            </a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-5 text-[#606060] text-[16px] font-medium">
            {links}
          </ul>
        </div>
        <div className="navbar-end gap-5">
          <a className="btn btn-outline border-[#DADADA] rounded-xl px-8 py-4 text-[#606060] font-bold">
            Sign In
          </a>
          <div className="flex items-center gap-2">
            <a className="btn bg-[#CAEB66] text-black rounded-xl px-8 py-4 border-none font-bold">
              Sign Up
            </a>
            <div className="bg-black rounded-[50px] px-3 py-3 h-[42px] w-[42px] justify-center items-center flex">
              <i class="fa-solid fa-arrow-down rotate-220 text-[#CAEB66] text-[20px]"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
