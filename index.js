const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const ProductController = require("./controllers/ProductController.js");
const authController = require("./controllers/authController.js");

const app = express();
const port = 3000;

// Cấu hình upload file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Cấu hình view engine và middleware
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Kết nối MongoDB
mongoose
  .connect("mongodb://localhost:27017/wd18412")
  .then((result) => {
    app.get("/home", ProductController.home);
    app.get("/detail/:id", ProductController.getProductDetail);
    //login register
    app.get("/register", authController.registerClient);
    app.post("/register", authController.saveRegister);
    app.get("/login", authController.loginClient);
    app.post("/login", authController.saveLogin);
    //router dùng trên client
    app.get("/list", ProductController.getList);
    app.get("/create", ProductController.create);
    app.post("/save", upload.single("image"), ProductController.save);
    app.get("/edit/:id", ProductController.edit);
    app.post("/update/:id", upload.single("image"), ProductController.update);

    //router cho api
    app.get("/products", ProductController.apiGetList);
    app.get("/products/:id", ProductController.apiDetail);
    app.post("/add", upload.single("image"), ProductController.apiCreate);
    app.put("/edit/:id", upload.single("image"), ProductController.apiUpdate);
    app.delete("/delete/:id", ProductController.apiDelete);

    app.post("/apiregister", authController.register);
    app.post("/apilogin", authController.login);

    app.listen(port, () => {
      console.log(`running in port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
