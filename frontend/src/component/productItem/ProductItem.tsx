import { Product } from '../../types/Product';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../rating/Rating';
import { useContext, useState } from 'react';
import { Store } from '../../Store';
import { CartItem } from '../../types/Cart';
import { convertProductToCartItem } from '../../utils/utils';
import { toast } from 'react-toastify';
import './ProductItem.css';


const ProductItem = ({product} : {product:Product}) => {
    const {state, dispatch} = useContext(Store)
    const {cart: {cartItems}} = state;
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const addToCartHandler = async (item: CartItem) => {
        const existItem = cartItems.find((x) => x._id === item._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        if (product.countInStock < quantity){
            toast.error('Sorry, Product is out of stock');
            return
        }
        
        setIsAddingToCart(true);
        
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: {...item, quantity}
        })
        
        toast.success(`${product.name} added to cart!`);
        
        // Reset animation state after a short delay
        setTimeout(() => {
            setIsAddingToCart(false);
        }, 1000);
    }

    const getDiscountPercentage = () => {
        // For now, we'll simulate discount based on product rating or other criteria
        // In a real app, this would come from the product data
        return 0; // No discount calculation for now
    }

    const discount = getDiscountPercentage();
    const isOutOfStock = product.countInStock === 0;
    const isLowStock = product.countInStock > 0 && product.countInStock <= 5;

  return (
    <Card className={`product-item ${isOutOfStock ? 'out-of-stock' : ''} ${discount > 0 ? 'on-sale' : ''}`}>
        <div className="product-image-container">
            <Link to={`/product/${product.slug}`}>
                <img src={product.image} className='card-img-top' alt={product.name} />
            </Link>
            
            {/* Badges */}
            <div className="product-badges">
                {discount > 0 && (
                    <span className="badge sale-badge">
                        -{discount}%
                    </span>
                )}
                {isOutOfStock && (
                    <span className="badge stock-badge out-of-stock">
                        Out of Stock
                    </span>
                )}
                {isLowStock && !isOutOfStock && (
                    <span className="badge stock-badge low-stock">
                        Only {product.countInStock} left
                    </span>
                )}
                {product.rating >= 4.5 && (
                    <span className="badge featured-badge">
                        ⭐ Top Rated
                    </span>
                )}
            </div>

            {/* Quick action buttons */}
            <div className="quick-actions">
                <button className="quick-btn" title="Quick View">
                    👁️
                </button>
                <button className="quick-btn" title="Add to Wishlist">
                    🤍
                </button>
            </div>
        </div>

        <Card.Body className="product-body">
            <Link to={`/product/${product.slug}`} className="product-link">
                <Card.Title className="product-title">
                    {product.name}
                </Card.Title>
            </Link>

            <div className="product-rating">
                <Rating 
                    rating={product.rating} 
                    numReviews={product.numReviews}
                />
            </div>

            <div className="product-pricing">
                <span className="current-price">${product.price}</span>
            </div>

            <div className="product-actions">
                {isOutOfStock ? (
                    <Button 
                        variant='secondary' 
                        className="action-btn out-of-stock-btn"
                        disabled
                    >
                        <span className="btn-icon">❌</span>
                        Out of Stock
                    </Button>
                ) : (
                    <Button 
                        variant='primary' 
                        className={`action-btn add-to-cart-btn ${isAddingToCart ? 'adding' : ''}`}
                        onClick={() => addToCartHandler(convertProductToCartItem(product))}
                        disabled={isAddingToCart}
                    >
                        {isAddingToCart ? (
                            <>
                                <span className="loading-spinner"></span>
                                Adding...
                            </>
                        ) : (
                            <>
                                <span className="btn-icon">🛒</span>
                                Add to Cart
                            </>
                        )}
                    </Button>
                )}
            </div>

            {/* Stock indicator */}
            {!isOutOfStock && (
                <div className="stock-indicator">
                    <div className="stock-bar">
                        <div 
                            className="stock-fill" 
                            style={{width: `${Math.min((product.countInStock / 20) * 100, 100)}%`}}
                        ></div>
                    </div>
                    <span className="stock-text">
                        {product.countInStock > 10 ? 'In Stock' : `${product.countInStock} remaining`}
                    </span>
                </div>
            )}
        </Card.Body>
    </Card>
  )
}

export default ProductItem



