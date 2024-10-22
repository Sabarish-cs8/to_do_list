import React from "react";

const Footer = ({ length }) => {
  const year = new Date();

  return (
    <footer>
      {length} Copyright &copy; {year.getFullYear()}
    </footer>
  );
};
export default Footer;
