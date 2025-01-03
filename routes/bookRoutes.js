

const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Borrow = require('../models/Borrow');
const Return = require('../models/Return');

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new book
router.post('/', async (req, res) => {
  try {
    const { name, author, genre, type } = req.body;
    const book = new Book({ name, author, genre, type });

    await book.save();
    res.status(201).json({ message: 'Book added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a book by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, author, genre, type } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { name, author, genre, type },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a book by ID
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//
router.post('/:id/borrow', async (req, res) => {
    try {
      const { username } = req.body;
  
      // Check if the book is available
      const book = await Book.findById(req.params.id);
      if (!book || !book.available) {
        return res.status(400).json({ message: 'Book is not available for borrowing' });
      }

      const borrow = new Borrow({ username, bookid: book._id });
      await borrow.save();
  

      book.available = false;
      await book.save();
  
      res.status(201).json({ message: 'Book borrowed successfully', borrow });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get all borrow records
router.get('/borrows', async (req, res) => {
    try {
      const borrows = await Borrow.find().populate('bookid'); 
      res.status(200).json(borrows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Return a book
router.post('/:id/return', async (req, res) => {
    try {
      const { username } = req.body;

      const borrow = await Borrow.findOne({ username, bookid: req.params.id });
      if (!borrow) {
        return res.status(400).json({ message: 'No borrow record found' });
      }
      const fine = new Date() > borrow.duedate ? Math.floor((new Date() - borrow.duedate) / (1000 * 60 * 60 * 24)) * 10 : 0;
  

      const returnedBook = new Return({ username, bookid: req.params.id, duedate: borrow.duedate, fine });
      await returnedBook.save();

      await Borrow.findByIdAndDelete(borrow._id);
  
      const book = await Book.findById(req.params.id);
      book.available = true;
      await book.save();
  
      res.status(200).json({ message: 'Book returned successfully', returnedBook });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all return records
router.get('/returns', async (req, res) => {
    try {
      const returns = await Return.find().populate('bookid');
      res.status(200).json(returns);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  

module.exports = router;
