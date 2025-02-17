
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
  setSort,
  setSearch,
  setCategory,
} from "../redux/productsSlice";
import { addToCart } from "../redux/cartSlice";
import "./pro.css";

function Products() {
  const dispatch = useDispatch();
  const { products, categories, sort, category, search, loading } = useSelector(
    (state) => state.products
  );
  const cartItems = useSelector((state) => state.cart.items); // استيراد حالة السلة

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  // حساب عدد العناصر في السلة
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Handle category change
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    dispatch(setCategory(selectedCategory));
    if (selectedCategory === "all") {
      dispatch(fetchProducts());
    } else {
      dispatch(fetchProductsByCategory(selectedCategory));
    }
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sort === "low" ? a.price - b.price : b.price - a.price));

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <header>
          <div className="header-content">
            <div className="logo">
              <ShoppingBag className="logo-icon" />
              <h1>Products</h1>
            </div>
            <div className="cart-icon">
              <NavLink to="/cart" className="cart-link">
                <ShoppingCart className="cart-icon" />
                {cartItemCount > 0 && ( // عرض الرقم فقط إذا كان هناك عناصر في السلة
                  <span className="cart-count">{cartItemCount}</span>
                )}
              </NavLink>
            </div>
          </div>
        </header>
        <main>
          <div className="filters">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                onChange={(e) => dispatch(setSearch(e.target.value))}
              />
            </div>
            <div className="filter-controls">
              <div className="category-filter">
                <SlidersHorizontal className="filter-icon" />
                <select onChange={handleCategoryChange} value={category}>
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <select
                onChange={(e) => dispatch(setSort(e.target.value))}
                value={sort}
              >
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.thumbnail} alt={product.title} />
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p className="description">{product.description}</p>
                  <div className="product-footer">
                    <span className="price">${product.price}</span>
                    
                    <button
                      className="add-to-cart"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && !loading && (
            <div className="no-results">
              <p>No products found</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Products;