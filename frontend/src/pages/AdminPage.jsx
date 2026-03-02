import { useState } from "react";
import axios from "axios";
import "../pages/Amin.css";

const AdminPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    try {
      await axios.post(
        "http://localhost:5000/api/products/add",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Product Added Successfully");

      setName("");
      setPrice("");
      setCategory("");
      setImage(null);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2 className="admin-title">Add Product</h2>

        <form onSubmit={handleSubmit} className="admin-form">

          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="mobile">Mobile</option>
              <option value="men">Men Dress</option>
              <option value="ladies">Ladies Dress</option>
              <option value="kids">Kids</option>
            </select>
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>

          <button type="submit" className="admin-btn">
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminPage;