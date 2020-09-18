import React from "react";

function Button(props) {
  const buttonComponent = {
    height: "3rem",
    marginLeft: "1rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    border: "none",
    background: "#2980B9",
    color: "#fff",
    fontSize: "1.3rem",
    fontWeight: "400",
    outlineWidth: 0,
  };

  return (
    <button style={buttonComponent} onClick={props.onClick}>
      {props.title}
    </button>
  );
}

export default Button;
