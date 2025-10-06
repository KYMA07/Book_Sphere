// controllers/bookController.js

import { db } from "../database/connection.js"; // bat toh naka gray what ???

export const getAllBooks = (req, res) => {
  const mockBooks = [
    { id: 1, title: "1984", author: "George Orwell", status: "Available" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", status: "Borrowed" }
  ];
  res.json(mockBooks);
};

export const addBook = (req, res) => {
  const { title, author, year } = req.body;
  console.log("📘 Adding book:", title, author, year);
  res.status(201).json({ message: "Book added successfully (mock)" });
};

export const updateBook = (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  console.log(`✏️ Updating book ${id}:`, title, author);
  res.json({ message: `Book ${id} updated (mock)` });
};

export const deleteBook = (req, res) => {
  const { id } = req.params;
  console.log(`🗑️ Deleting book ${id}`);
  res.json({ message: `Book ${id} deleted (mock)` });
};

