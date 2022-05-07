const mongoose = require("mongoose");
const { Int32, ObjectId } = require("mongodb");

// connection string
mongoose.connect(
  "mongodb://localhost:27017/",
  {
    dbName: "lms",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => (err ? console.log(err) : console.log("Connected to lms database"))
);

//schemas for the lms

//users schema
const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  registerDate: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("Users", UsersSchema);
User.createIndexes();

//books schema
const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  authors: {
    type: String,
    required: true,
  },

  editors: {
    type: String,
    required: true,
  },

  ISBN: {
    type: String,
    required: true,
  },

  publishYear: {
    type: Date,
    required: false,
  },

  edition: {
    type: Number,
    required: true,
  },

  publisher: {
    type: Number,
    required: true,
  },

  pageCount: {
    type: Number,
    required: true,
  },

  language: {
    type: String,
    required: true,
  },

  numberofbook: {
    type: Number,
    required: true,
  },
});

const Book = mongoose.model("Books", booksSchema);
Book.createIndexes();

//borrow schema
const borrowSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    required: true,
  },

  book: {
    type: ObjectId,
    required: true,
  },

  borrowedDate: {
    type: Date,
    default: Date.now,
  },

  returned: {
    type: String,
    default: false,
  },
});

const Borrow = mongoose.model("Borrow", borrowSchema);
Borrow.createIndexes();

const express = require("express");

const app = express();

const cors = require("cors");

console.log("App listens at port 5000");

app.use(express.json());

app.use(cors());

app.get("/", (req, resp) => {
  resp.send("App is Working");
  // checking app
  // listens at 5000
  // can be checked at http://localhost:5000
});

//User register endpoint
app.post("/registerUser", async (req, resp) => {
  try {
    const user = new User(req.body);

    let res = await user.save();
    res = res.toObject();

    if (res) {
      delete res.password;
      resp.send(req.body);

      console.log(res);
    } else {
      console.log("user already registered");
    }
  } catch (e) {
    console.log(e);
  }
});

//addBook
app.post("/addBook", async (req, resp) => {
  try {
    const book = new Book(req.body);

    let res = await book.save();
    res = res.toObject();

    if (res) {
      resp.send(req.body);

      console.log(res);
    } else {
      console.log("book already saved");
    }
  } catch (e) {
    console.log(e);
  }
});

//createBorrow 
app.post("/createBorrow", async (req, resp) => {
  try {
    const borrow = new Borrow(req.body);

    let res = await borrow.save();
    res = res.toObject();

    if (res) {
      resp.send(req.body);

      console.log(res);
    } else {
      console.log("already borrowed");
    }
  } catch (e) {
    console.log(e);
  }
});

app.listen(5000);
