import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addItemToCart } from './CartSlice';
import './ProductList.css';

const ProductList = () => {
  const products = [
    { id: 1, name: 'Product A', price: 60 },
    { id: 2, name: 'Product B', price: 75 },
    { id: 3, name: 'Product C', price: 30 },
  ];
  const dispatch = useDispatch(); // used to call the reducers
  const [disabledProducts, setDisabledProducts] = useState([]); // State to store disabled products
  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product)); // Dispatch the action to add the product to the cart
    setDisabledProducts([...disabledProducts, product.id]); // Mark the product as disabled
  };
  return (
    <div className="product-list">
      <h2 className="product-list-title">Products</h2>
      <ul className="product-list-items">
        {products.map((product) => (
          <li key={product.id} className="product-list-item">
            <span>
              {product.name} - ${product.price}
            </span>
            <button
              className={`add-to-cart-btn ${
                disabledProducts.includes(product.id) ? 'disabled' : ''
              }`}
              onClick={() => handleAddToCart(product)}
              disabled={disabledProducts.includes(product.id)} // Disable button if product is in disabledProducts
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
