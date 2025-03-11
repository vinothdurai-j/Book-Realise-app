import React, { useState } from "react";
import "./Add.css"; // Import the CSS file

const AddWhitelist = ({ onAddWhitelist }) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    date: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (book.title && book.author && book.genre && book.date) {
      onAddWhitelist(book);
      setBook({ title: "", author: "", genre: "", date: "" }); // Clear form
    } else {
      alert("Please fill out all fields!");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="whitelist-form">
        <div className="form-group">
          <label className="form-label">Book Title</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter book title"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Author</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter author name"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Genre</label>
          <input
            type="text"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter genre"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="date"
            value={book.date}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Add to Whitelist
        </button>
      </form>
    </div>
  );
};

export default AddWhitelist;
