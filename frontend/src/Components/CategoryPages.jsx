
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";



function CategoryPages() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`https://mern-project-eg6t.onrender.com/api/products/category/${categoryName}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [categoryName]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-capitalize">
        {categoryName} Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center">No Products Found</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-3 mb-4" key={product._id}>
              <div className="card product-card h-100 shadow-sm">
                <div style={{ height: "220px", padding: "15px" }}>
                  <img
                    src={`https://mern-project-eg6t.onrender.com/uploads/${product.image}`}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain"
                    }}
                  />
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="text-success fw-bold">
                    ₹ {product.price}
                  </p>
                  <button className="btn btn-dark w-100" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPages;
