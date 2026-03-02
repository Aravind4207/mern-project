import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

function CartPage() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  const handleBuy = () => {
    alert("Order Placed Successfully ✅");
  };

  

  return (
<div className="container mt-4">
  <h2>Your Cart</h2>

  {cartItems.length === 0 ? (
    <p>Cart is empty</p>
  ) : (
    <>
      <div className="row">
        {cartItems.map((item) => (
          <div key={item._id} className="col-md-4 mb-4">
            <div className="flip-card">
              <div className="flip-card-inner">
                {/* Front of card */}
                <div className="flip-card-front card p-3 text-center">
                  <div style={{ height: "220px", padding: "15px" }}>
                    <img
                      src={`https://mern-project-eg6t.onrender.com/uploads/${item.image}`}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain"
                      }}
                    />
                  </div>
                  <h5>{item.name}</h5>
                  <p className="text-success">₹ {item.price}</p>
                  <button
                    className="btn btn-success mt-2"
                    onClick={() => handleBuy(item._id)}
                  >
                    Buy
                  </button>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>

                
                
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <div className="total-section d-flex flex-column align-items-center">
        <h4 className="mt-3">Total: ₹ {totalPrice}</h4>
        <button className="btn btn-success  mt-2 mb-4 " onClick={handleBuy} style={{ width: "200px", height: "50px" }}>Buy Now</button>
      </div>
      
    </> 
  )}
</div>
  );
}

export default CartPage;
