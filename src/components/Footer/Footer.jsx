import React from "react";
import NavLogo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import FaceBook from "../../assets/Social/communication.png"
import Twitter from "../../assets/Social/twitter.png"
import LinkeDin from "../../assets/Social/linkedin.png"
import Youtube from "../../assets/Social/youtube.png"   

const Footer = () => {
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
  )
    return (
    <div>
      <footer
        className="footer footer-horizontal footer-center bg-black text-primary-content p-10 mx-auto max-w-[1800px] rounded-2xl py-5 lg:py-20 mb-10"
      >
        <aside>
          <div className="flex items-center pb-5">
            <img
              src={NavLogo}
              alt=""
              className="absolute mb-4"
              height="48px"
              width="37px"
            />
            <a className="text-[32px] text-white font-extrabold ml-5">
              ZapShift
            </a>
          </div>
          <p>
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to <br /> business shipments —
            we deliver on time, every time.
          </p>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
       <div className="flex gap-[38px] text-[#DADADA]">
{links}
       </div>
       <div className="flex gap-[30px] ">
        <img src= {LinkeDin} alt="" height="32px" width="32px"/>
        <img src= {FaceBook} alt=""  height="32px" width="32px"/>
        <img src= {Twitter} alt="" height="32px" width="32px"/>
        <img src= {Youtube} alt="" height="32px" width="32px"/>
       </div>
      </footer>
    </div>
  );
};

export default Footer;
