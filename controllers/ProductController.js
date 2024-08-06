const Product = require("../models/Product.js");

exports.getProductDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .render("error", { message: "Sản phẩm không tồn tại" });
    }
    res.render("detail", { product });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { message: "Đã xảy ra lỗi khi lấy thông tin sản phẩm" });
  }
};

exports.home = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("home", { products });
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi xảy ra khi lấy danh sách sản phẩm");
  }
};

exports.getList = async (req, res) => {
  try {
    var products = await Product.find();
    res.render("list", { products });
  } catch (error) {
    console.log(error);
  }
};

exports.create = (req, res) => {
  res.render("create");
};

exports.save = async (req, res) => {
  try {
    var newProduct = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.file.filename,
    };

    var product = await Product.create(newProduct);
    if (product) {
      console.log("create success");
      res.redirect("/list");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.edit = async (req, res) => {
  try {
    var product = await Product.findById(req.params.id);
    if (product) {
      res.render("edit", { product });
    } else {
      console.log("khong tim thay san pham");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.update = async (req, res) => {
  try {
    var updateProduct = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    };

    if (req.file) {
      updateProduct.image = req.file.filename;
    }

    var product = await Product.findByIdAndUpdate(req.params.id, updateProduct);
    if (product) {
      console.log("update success");
      res.redirect("/list");
    } else {
      console.log("khong itm thay san pham");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.delete = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/list");
  } catch (error) {
    console.log(error);
  }
};

// API postmen
exports.apiGetList = async (req, res) => {
  try {
    var products = await Product.find();
    console.log(products);
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(400).json({ message: "loi" });
  }
};

exports.apiDetail = async (req, res) => {
  try {
    var product = await Product.findById(req.params.id);
    res.status(200).json({ data: product });
  } catch {
    res.status(400).json({ message: "loi" });
  }
};

exports.apiCreate = async (req, res) => {
  try {
    var newProduct = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.file.filename,
    };

    var product = await Product.create(newProduct);
    console.log(product);
    res.status(201).json({ data: product });
  } catch (err) {
    res.status(400).json({ message: "loi" });
  }
};

exports.apiDelete = async (req, res) => {
  try {
    var product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.status(200).json({ message: "xoa thanh cong" });
    } else {
      res.status(404).json({ message: "khong itm thay san pham" });
    }
  } catch (error) {
    res.status(400).json({ message: "loi" });
  }
};

exports.apiUpdate = async (req, res) => {
  try {
    var updateProduct = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.file.filename,
    };

    var product = await Product.findByIdAndUpdate(req.params.id, updateProduct);
    if (product) {
      console.log("sua thanh cong");
      res.status(200).json({ data: product });
    } else {
      res.status(404).json({ message: "khong itm thay san pham" });
    }
  } catch (err) {
    res.status(400).json({ message: "loi" });
  }
};
