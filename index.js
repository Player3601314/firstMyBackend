const express = require('express');
const cors = require('cors'); // Import CORS module
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const { v4 } = require('uuid');

const saltRounds = 10; // Parolni hash qilishda ishlatiladigan salt darajasi

// Create a connection to the MySQL database
const con = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "newuser", // Replace with your MySQL username
  password: "password", // Replace with your MySQL password
  database: "userlar" // Replace with your MySQL database name
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the database!");
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/auth/register", async (req, res) => {
  const { firstname, lastname, email, password, date_of_birth } = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds); // Parolni hash qilish
  const token = `${v4()}.${v4()}.token`; // Yangi token yaratish

  con.query("INSERT INTO userlar (firstname, lastname, email, password, date_of_birth, token) VALUES (?, ?, ?, ?, ?, ?)",
    [firstname, lastname, email, hashedPassword, date_of_birth, token], (error, result) => {
      if (error) {
        res.status(404).json({ message: "User yaratilmadi", error });
      } else {
        res.status(200).json({ status: "User yaratildi", token: token }); // Tokenni qaytarish
      }
    });
});

// Foydalanuvchi login qilish
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  con.query("SELECT * FROM userlar WHERE email = ?", [email], async (error, result) => {
    if (error || result.length === 0) {
      res.status(404).json({ message: "Email yoki parol xato", error });
    } else {
      const user = result[0];
      const isMatch = await bcrypt.compare(password, user.password); // Parollarni solishtirish

      if (isMatch) {
        res.status(200).json({ status: "Login muvaffaqiyatli", token: user.token }); // Tokenni qaytarish
      } else {
        res.status(401).json({ message: "Parol noto'g'ri" });
      }
    }
  });
});

// Foydalanuvchini token orqali olish
app.get('/auth', (req, res) => {
  const token = req.headers['authorization']; // Headersdan tokenni olish

  if (!token) {
    return res.status(401).json({ message: "Token kerak" });
  }

  // Token orqali foydalanuvchini bazadan topish
  con.query("SELECT * FROM userlar WHERE token = ?", [token], (error, result) => {
    if (error || result.length === 0) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    res.status(200).json({ status: "success", data: result[0] });
  });
});

// Foydalanuvchilarni olish
app.get('/users', function (req, res) {
  con.query("SELECT * FROM userlar", (error, result) => {
    if (error) {
      res.status(404).json({ message: "Userlar topilmadi", error });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  });
});

// Foydalanuvchini yangilash
app.put("/update-user/:id", (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email } = req.body;

  con.query("UPDATE userlar SET firstname = ?, lastname = ?, email = ? WHERE id = ?",
    [firstname, lastname, email, id], (error, result) => {
      if (error) {
        res.status(404).json({ message: "User uzgarmadi", error });
      } else {
        res.status(200).json({ status: "User uzgardi" });
      }
    });
});

// Foydalanuvchini o'chirish
app.delete("/delete-user/:id", (req, res) => {
  const { id } = req.params;

  con.query("DELETE FROM userlar WHERE id = ?", [id], (error, result) => {
    if (error) {
      res.status(404).json({ message: "User uchirilmadi", error });
    } else {
      res.status(200).json({ status: "User uchirildi" });
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
