import React from "react";

export default function SearchForm({ message, placeholder }) {
  const searchForm = {
    width: "100px",
  };

  return (
    <div className="form">
      <form className="form__control">
        <p>{message}</p>
        <input
          className={searchForm}
          type="text"
          //   value={input}
          //   onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
        />
      </form>
    </div>
  );
}
