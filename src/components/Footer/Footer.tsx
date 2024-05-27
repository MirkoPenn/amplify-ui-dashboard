import React from "react";
import { baseConfig } from "../../config";
import "./Footer.css";

const Footer = () => {
  return baseConfig.footer ? <div className="footer">{baseConfig.footerText}</div> : <></>;
};

export default Footer;
