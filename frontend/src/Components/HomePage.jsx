import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";




const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

   useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch all products
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Filter products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div className="container  ">

    {/* 🔎 Search Bar */}
    <div className="row justify-content-center mb-4 mt-4">
      <div className="col-lg-5 col-md-6 col-sm-8">
        <input
          type="text"
          className="form-control form-control-lg shadow-sm"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>

    {/* 🛍 Product Cards */}
    <div className="row justify-content-center ">
      {filteredProducts.map((product) => (
        <div
          className="col-xl-3 col-lg-4 col-md-6 col-sm-6 d-flex align-items-stretch mb-4"
          key={product._id}
        >
          <div className="card w-100 shadow-sm border-0" style={{ borderRadius: "12px" }}>

            {/* Image */}
            <div style={{ height: "220px", padding: "15px" }}>
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain"
                }}
              />
            </div>

            <div className="card-body d-flex flex-column">
              <h6 className="product-title text-center">{product.name}</h6>

              <p className="text-success fw-bold mb-3 text-center">
                ₹ {product.price}
              </p>

              <button className="btn btn-dark mt-auto" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>

  </div>
);

};

export default HomePage;
