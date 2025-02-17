
 import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  
  const handleQuantityChange = (id, action) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      let newQuantity;
      if (action === "increment") {
        newQuantity = item.quantity + 1; 
      } else if (action === "decrement") {
        newQuantity = item.quantity - 1; 
        if (newQuantity < 1) return; 
      }
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  // حساب الإجمالي
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
      <>
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th className="proo">Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  {/* Product Details */}
                  <td className="product-details">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="product-image"
                    />
                    <div className="product-info">
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </div>
                  </td>

                  {/* Price */}
                  <td>${item.price.toFixed(2)}</td>

                  {/* Quantity Controls */}
                  <td className="quantity-controls">
                    <div className="quan">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, "decrement")
                        }
                        className="quantity-button decrement"
                        disabled={item.quantity <= 1} // تعطيل الزر عند الكمية = 1
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, "increment")
                        }
                        className="quantity-button increment"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Item Total */}
                  <td>${(item.price * item.quantity).toFixed(2)}</td>

                  {/* Actions */}
                  <td>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="remove-item-button"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Checkout Section */}
          <div className="checkout-section">
            <div className="cart-total">
              <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
            </div>
            <div className="buttons-container">
              <Link to="/checkout" className="checkout-button">
                Check Out
              </Link>
              <Link to="/" className="back-to-products-button">
                Back to Products
              </Link>
            </div>
          </div>
        </div>
                ) : (
                        <div className="em">
                        
                  <p className="no-items-message">Your cart is empty.</p>
                   <Link to="/" className="back-to-products-button">
                Back to Products
                            </Link>
                            </div>
      )}
    </div>
          </>
  );
}

export default Cart;