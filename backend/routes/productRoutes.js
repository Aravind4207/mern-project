import express from "express";
import Product from "../models/Product.js";
import upload from "../middleware/upload.js";

const router = express.Router();


// =============================
// ✅ CREATE PRODUCT
// =============================
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const imagePath = req.file ? req.file.filename : "default.png";

    const newProduct = new Product({
      name,
      price,
      category: req.body.category,
      image: req.file ? req.file.filename : "default.png",
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product Created Successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product" });
  }
});


// =============================
// ✅ READ ALL PRODUCTS
// =============================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// GET PRODUCTS BY CATEGORY
router.get("/category/:categoryName", async (req, res) => {
  try {
    const products = await Product.find({
      category: { $regex: new RegExp("^" + req.params.categoryName + "$", "i") }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category products" });
  }
});

// =============================
// ✅ READ SINGLE PRODUCT
// =============================
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
});


// =============================
// ✅ UPDATE PRODUCT
// =============================
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price } = req.body;

    const updateData = {
      name,
      price,
    };

    // If new image uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
});


// =============================
// ✅ DELETE PRODUCT
// =============================
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

export default router;