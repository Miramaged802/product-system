// src/components/Checkout.js
import React, { useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import {
  completeCheckout,
  resetCheckout,
} from "../redux/checkoutSlice";
import "./Checkout.css";

function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const checkoutState = useSelector((state) => state.checkout);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
  });

  // حساب السعر الإجمالي
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
useEffect(() => {
  // استعادة بيانات المستخدم من localStorage عند بدء التطبيق
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    setUserData(JSON.parse(savedUser));
  }
}, []);
  // تعامل مع تغييرات النموذج
  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // إتمام عملية الدفع
  const handleCompleteCheckout = () => {
    if (!userData.name || !userData.email || !userData.address) {
      alert("Please fill in all fields.");
      return;
      }

   localStorage.setItem("user", JSON.stringify(userData));

    
    dispatch(completeCheckout()); // علام إتمام الدفع
    dispatch(clearCart()); // مسح السلة
    alert(`Payment Successful! Total Amount: $${totalPrice.toFixed(2)}`);
  };

  // إعادة تعيين حالة الدفع
  const handleResetCheckout = () => {
      dispatch(resetCheckout());
      localStorage.removeItem("user"); 
      setUserData({ name: "", email: "", address: "" });
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* نموذج بيانات المستخدم */}
      <form className="user-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={userData.name}
                      onChange={handleInputChange}
                      placeholder="Enter Your Name"
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
                      onChange={handleInputChange}
                      placeholder="example@example.com"
                     
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={userData.address}
                      onChange={handleInputChange}
                      placeholder="Enter Your Address"
            required
          />
        </label>
      </form>

     
      <div className="cart-items">
        <h3>Your Cart:</h3>
        {cartItems.length > 0 ? (
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="product-image"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Your cart is empty.</p>
        )}
        <div className="total-price">
          <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
        </div>
      </div>

      <div className="buttons-container">
        <button onClick={handleCompleteCheckout} className="complete-button">
          Complete Checkout
        </button>
        <Link to="/" className="back-button">
          Back to Products
        </Link>
      </div>

      {/* رسالة إتمام الدفع */}
      {checkoutState.isCompleted && (
        <div className="success-message">
          <p>Thank you for your purchase!</p>
          <button onClick={handleResetCheckout}>Shop Again</button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
