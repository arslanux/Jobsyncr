import React from "react";

import LogoImg from "../../../assets/logo.svg";

const Logo = (props) => {
  return <img src={LogoImg} alt={"Logo"} {...props} />;
};

export default Logo;
