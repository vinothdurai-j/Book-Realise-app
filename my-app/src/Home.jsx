import React, { useEffect, useState } from "react";

const Home = ({ onAddBook }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const placeholderImage = "https://via.placeholder.com/200x300?text=No+Image";

  // Fetch books data
  useEffect(() => {
    const cachedBooks = sessionStorage.getItem("books"); // Check for cached books
    if (cachedBooks) {
      console.log("Loaded books from cache.");
      setBooks(JSON.parse(cachedBooks));
      setLoading(false);
    } else {
      const fetchBooks = async () => {
        try {
          const response = await fetch("https://openlibrary.org/subjects/fiction.json?limit=20");
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          const booksData = data.works ? data.works : [];
          console.log("Fetched books from API:", booksData); // Log API response
          setBooks(booksData);
          sessionStorage.setItem("books", JSON.stringify(booksData)); // Cache books
        } catch (error) {
          console.error("Error fetching books:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBooks();
    }
  }, []);

  // Prepare book details for adding
  const handleAddBook = (book) => {
    onAddBook({
      title: book.title,
      author: book.authors && book.authors[0] ? book.authors[0].name : "Unknown Author",
      releaseDate: book.first_publish_year ? book.first_publish_year : "Unknown Release Date",
      genre: "Fiction",
    });
  };

  // Get book cover image
  const getCoverImage = (book) => {
    return book.cover_id
      ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
      : placeholderImage;
  };

  // Render book card
  const renderBookCard = (book) => (
    <div key={book.key || book.cover_id || book.title} className="book-card">
      <img src={getCoverImage(book)} alt={book.title} className="book-image" />
      <div className="book-info">
        <h5 className="book-title">{book.title}</h5>
        <p className="book-author">
          Author: {book.authors && book.authors[0] ? book.authors[0].name : "Unknown"}
        </p>
        <p className="book-release">
          Release Date: {book.first_publish_year ? book.first_publish_year : "Unknown"}
        </p>
        <button className="add-button" onClick={() => handleAddBook(book)}>
          Add to Available Books
        </button>
      </div>
    </div>
  );

  return (
    <div className="home-container">
      <h2 className="home-title">Popular Books</h2>
      {loading ? (
        <p className="loading-text">Loading books...</p>
      ) : books.length > 0 ? (
        <div className="books-grid">
          {books.map(renderBookCard)}
        </div>
      ) : (
        <p className="no-books-text">No books available.</p>
      )}
    </div>
  );
};

export default Home;
