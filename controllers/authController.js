const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existedEmail = await User.findOne({ email });

    if (existedEmail) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      res.status(200).json({
        message: "Đăng ký thành công",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email ko tồn tại" });
    }
    const checkedPassword = await bcrypt.compare(password, user.password);
    if (!checkedPassword) {
      return res.status(400).json({ message: "Sai thông tin đăng nhập" });
    }

    const token = jwt.sign({ id: user.id }, "wd18412", { expiresIn: "1d" });
    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
    });
  } catch {
    console.log(err);
  }
};

// views
// views
exports.registerClient = (req, res) => {
  res.render("register");
};

exports.saveRegister = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existedEmail = await User.findOne({ email });
    if (existedEmail) {
      return res.render("register", { message: "email da ton tai" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      console.log("dang ki thanh cong");
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.render("register", { message: "dang ki that bai" });
  }
};

exports.loginClient = (req, res) => {
  res.render("login");
};

exports.saveLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .render("login", { message: "sai thong tin dang nhap" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .render("login", { message: "sai thong tin dang nhap" });
    }
    const token = jwt.sign({ id: user.id }, "wd18412", { expiresIn: "1d" });
    res.redirect("/list");
  } catch (err) {
    console.log(err);
    res.status(500).render("login", { message: "dang nhap that bai" });
  }
};
