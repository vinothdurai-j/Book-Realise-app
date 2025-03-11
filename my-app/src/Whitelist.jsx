import React from "react";
import "./Whitelist.css"; // Import the CSS file

const Whitelist = ({ whitelist, setWhitelist }) => {
  // Generate a random price for each book
  const getRandomPrice = () => (Math.random() * (100 - 10) + 10).toFixed(2);

  // Handle the "Buy Now" action
  const handleBuyNow = (book) => {
    alert(`You selected "${book.title}" by ${book.author}. Proceed to payment!`);
  };

  // Handle deleting a book from the whitelist
  const handleDeleteBook = (index) => {
    if (window.confirm("Delete this book?")) {
      setWhitelist((prev) => prev.filter((_, i) => i !== index));
      alert("Book deleted!");
    }
  };

  // Handle clearing all books from the whitelist
  const handleClearAll = () => {
    if (window.confirm("Clear all books?")) {
      setWhitelist([]);
      alert("All books cleared!");
    }
  };

  return (
    <div className="whitelist-container">
      <h2 className="whitelist-title">Whitelist</h2>
      {whitelist.length === 0 ? (
        <p className="no-books">No books in the whitelist.</p>
      ) : (
        <ul className="book-list">
          {whitelist.map((book, index) => (
            <li key={index} className="book-item">
              <div className="book-info">
                <h5 className="book-title">{book.title}</h5>
                <p className="book-author">By: {book.author}</p>
                <p className="book-price">Price: ₹{getRandomPrice()}</p>
              </div>
              <div className="book-actions">
                <button className="btn-buy" onClick={() => handleBuyNow(book)}>
                  Buy Now
                </button>
                <button className="btn-delete" onClick={() => handleDeleteBook(index)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {whitelist.length > 0 && (
        <button className="btn-clear-all" onClick={handleClearAll}>
          Clear All
        </button>
      )}
    </div>
  );
};

export default Whitelist;
