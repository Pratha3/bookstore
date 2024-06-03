const express = require("express");
const bookData = require("./models/book");
require("./config/database");

const port = 3000;
const app = express();
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

// to get data on page
app.get("/", async (req, res) => {
  try {
    const books = await bookData.find(); // Fetch all books from the database
    res.render("index", { books });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/addbook", (req, res) => {
  res.render("addbook");
});
app.post("/addbook", async (req, res) => {
  const { bookName, bookAuthor, bookUrl, bookDisc, bookPrice } = req.body;
  try {
    const newBook = new bookData({
      bookName,
      bookAuthor,
      bookUrl,
      bookDisc,
      bookPrice,
    });
    await newBook.save();
    res.redirect("/");
  } catch (err) {
    console.error("Error saving book:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/updatebook/:id", async (req, res) => {
  try {
    const book = await bookData.findById(req.params.id);
    res.render("updatebook", { book });
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/updatebook/:id", async (req, res) => {
  const { bookName, bookAuthor, bookUrl, bookDisc, bookPrice } = req.body;
  try {
    await bookData.findByIdAndUpdate(req.params.id, {
      bookName,
      bookAuthor,
      bookUrl,
      bookDisc,
      bookPrice,
    });
    res.redirect("/");
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/deletebook/:id", async (req, res) => {
  try {
    await bookData.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, (err) => {
  if (!err) {
    console.log("server start http://localhost:" + port);
  }
});
