import React from "react";

const footerStyles = {
  h1: {
    color: "#000",
    fontFamily: "Inter",
    fontSize: "3rem",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    height: "9.86813rem",
    marginRight: "1rem",
  },
  h2: {
    flexShrink: 0,
    color: "#101010",
    fontFamily: "Inter",
    fontSize: "1.2rem",
    fontStyle: "normal",
    fontWeight: 700,
    minWidth: "fit-content",
    lineHeight: "1.8rem",
    textWrap: "nowrap",
  },
  a: {
    textDecoration: "none",
    flexShrink: 0,
    color: "#7a7a7a",
    fontFamily: "Poppins",
    fontSize: "1.1rem",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "1.8rem",
    minWidth: "fit-content",
    textWrap: "nowrap",
  },
  div: {
    marginTop: "4rem",
    marginBottom: "3rem",
    borderTop: ".05rem solid #888",
    marginInline: "1rem",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
  },
  links: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "50%",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100px",
    marginRight: "1rem",
  },
};

export default function Footer() {
  return (
    <div style={footerStyles.div}>
      <h1 style={footerStyles.h1}>Discover MarketHub</h1>
      <section style={footerStyles.links}>
        <section style={footerStyles.column}>
          <h2 style={footerStyles.h2}>Connect with us</h2>
          <a style={footerStyles.a} href="#">
            Facebook
          </a>
          <a style={footerStyles.a} href="#">
            Twitter
          </a>
          <a style={footerStyles.a} href="#">
            Instagram
          </a>
        </section>

        <section style={footerStyles.column}>
          <h2 style={footerStyles.h2}>About</h2>
          <a style={footerStyles.a} href="#">
            Help
          </a>
          <a style={footerStyles.a} href="#">
            FAQ
          </a>
          <a style={footerStyles.a} href="#">
            Objectives
          </a>
        </section>

        <section style={footerStyles.column}>
          <h2 style={footerStyles.h2}>Info</h2>
          <a style={footerStyles.a} href="#">
            Contact us
          </a>
          <a style={footerStyles.a} href="#">
            Privacy Policy
          </a>
          <a style={footerStyles.a} href="#">
            Terms of Service
          </a>
        </section>
      </section>
    </div>
  );
}
