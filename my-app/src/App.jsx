import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import AvailableBooks from "./AvailableBooks";
import AddWhitelist from "./AddWhitelist";
import Whitelist from "./Whitelist";
import Navbar from "./Navbar";  // Use Navbar component if available
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [bookData, setBookData] = useState([]);
  const [whitelist, setWhitelist] = useState([]);

  const handleAddBook = (newBook) => setBookData((prev) => [...prev, newBook]);
  const handleAddToWhitelist = (book) => {
    if (!whitelist.includes(book)) setWhitelist((prev) => [...prev, book]);
  };

  return (
    <Router>
      <Navbar />  
      <div className="container">
        <Routes>
          <Route path="/" element={<Home onAddBook={handleAddBook} />} />
          <Route path="/available-books" element={<AvailableBooks books={bookData} onAddToWhitelist={handleAddToWhitelist} />} />
          <Route path="/whitelist" element={<Whitelist whitelist={whitelist} setWhitelist={setWhitelist} />} />
          <Route path="/add-to-whitelist" element={<AddWhitelist onAddWhitelist={handleAddBook} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
