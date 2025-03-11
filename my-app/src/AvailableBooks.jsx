import React from "react";
import "./AvailableBooks.css";

const AvailableBooks = ({ books, onAddToWhitelist }) => (
  <div className="available-books-container">
    <h2 className="available-books-title">Available Books</h2>
    {books.length ? (
      <ul className="book-list">
        {books.map((book, index) => (
          <li key={index} className="book-item">
            <h5 className="book-title">{book.title}</h5>
            <p className="book-author">By: {book.author}</p>
            <button
              className="add-to-whitelist-button"
              onClick={() => onAddToWhitelist(book)}
            >
              Add to Whitelist
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <p className="no-books">No books available yet.</p>
    )}
  </div>
);

export default AvailableBooks;
