import { Helmet } from "react-helmet-async";
import { useNavigate, useParams, Link } from "react-router-dom";
import LoadingBox from "../../component/loadingBox/LoadingBox";
import MessageBox from "../../component/messageBox/MessageBox";
import { useGetProductDetailsBySlugQuery } from "../../hooks/productHooks";
import { convertProductToCartItem, getError } from "../../utils/utils";
import { ApiError } from "../../types/ApiError";
import { Badge, Button, Row, Container } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Rating from "../../component/rating/Rating";
import { useContext, useState } from "react";
import { Store } from "../../Store";
import { toast } from "react-toastify";
import './ProductPage.css';

const ProductPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: product, isLoading, error } = useGetProductDetailsBySlugQuery(slug!);
    
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const navigate = useNavigate();
    
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    // Mock additional images for demonstration (in real app, this would come from product data)
    const productImages = product ? [
        product.image,
        product.image, // In real app, these would be different images
        product.image,
        product.image
    ] : [];

    const addToCartHandler = async () => {
        if (!product) return;
        
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const totalQuantity = existItem ? existItem.quantity + quantity : quantity;
        
        if (product.countInStock < totalQuantity) {
            toast.warn('Sorry, not enough items in stock');
            return;
        }
        
        setIsAddingToCart(true);
        
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 500));
        
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...convertProductToCartItem(product), quantity: totalQuantity }
        });
        
        setIsAddingToCart(false);
        toast.success(`${quantity} item(s) added to cart successfully`);
        
        // Option to stay on page or go to cart
        const shouldGoToCart = window.confirm('Item added to cart! Would you like to view your cart?');
        if (shouldGoToCart) {
            navigate('/cart');
        }
    };

    const buyNowHandler = async () => {
        await addToCartHandler();
        navigate('/cart');
    };

    const getStockStatus = (count: number) => {
        if (count === 0) return { label: 'Out of Stock', variant: 'danger', icon: '❌' };
        if (count <= 5) return { label: `Only ${count} left`, variant: 'warning', icon: '⚠️' };
        return { label: 'In Stock', variant: 'success', icon: '✅' };
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    if (isLoading) {
        return (
            <div className="product-loading">
                <LoadingBox />
            </div>
        );
    }

    if (error) {
        return (
            <Container className="product-error">
                <MessageBox variant="danger">
                    {getError(error as unknown as ApiError)}
                </MessageBox>
                <div className="error-actions">
                    <Link to="/" className="btn btn-primary">
                        Back to Home
                    </Link>
                </div>
            </Container>
        );
    }

    if (!product) {
        return (
            <Container className="product-not-found">
                <MessageBox variant="warning">Product not found</MessageBox>
                <div className="error-actions">
                    <Link to="/" className="btn btn-primary">
                        Back to Home
                    </Link>
                </div>
            </Container>
        );
    }

    const stockStatus = getStockStatus(product.countInStock);

    return (
        <div className="product-page">
            <Helmet>
                <title>{product.name} - Flourish & Bloom</title>
                <meta name="description" content={product.description} />
            </Helmet>

            <Container className="product-container">
                {/* Breadcrumb */}
                <div className="product-breadcrumb">
                    <Link to="/" className="breadcrumb-link">Home</Link>
                    <span className="breadcrumb-separator">›</span>
                    <span className="breadcrumb-current">{product.name}</span>
                </div>

                <Row className="product-content">
                    {/* Product Images */}
                    <Col lg={6} className="product-images-section">
                        <div className="product-image-gallery">
                            <div className="main-image-container">
                                <img 
                                    src={productImages[selectedImage]} 
                                    alt={product.name} 
                                    className="main-product-image"
                                />
                                <div className="image-badges">
                                    {product.countInStock === 0 && (
                                        <Badge className="out-of-stock-badge">Out of Stock</Badge>
                                    )}
                                </div>
                            </div>
                            
                            <div className="thumbnail-images">
                                {productImages.map((image, index) => (
                                    <button
                                        key={index}
                                        className={`thumbnail-btn ${selectedImage === index ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img src={image} alt={`${product.name} view ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Col>

                    {/* Product Info */}
                    <Col lg={6} className="product-info-section">
                        <div className="product-details">
                            <h1 className="product-title">{product.name}</h1>
                            
                            <div className="product-rating">
                                <Rating rating={product.rating} numReviews={product.numReviews} />
                                <span className="rating-text">
                                    ({product.numReviews} {product.numReviews === 1 ? 'review' : 'reviews'})
                                </span>
                            </div>

                            <div className="product-price">
                                <span className="current-price">{formatPrice(product.price)}</span>
                                {/* Mock original price for demonstration */}
                                <span className="original-price">{formatPrice(product.price * 1.2)}</span>
                                <span className="discount-badge">Save 17%</span>
                            </div>

                            <div className="product-description">
                                <h3>Description</h3>
                                <p>{product.description}</p>
                            </div>

                            <div className="product-features">
                                <h4>Features</h4>
                                <ul>
                                    <li>Premium quality materials</li>
                                    <li>Long-lasting freshness</li>
                                    <li>Expert arrangement</li>
                                    <li>Same-day delivery available</li>
                                </ul>
                            </div>

                            <div className="product-stock">
                                <div className="stock-info">
                                    <span className="stock-icon">{stockStatus.icon}</span>
                                    <Badge bg={stockStatus.variant} className="stock-badge">
                                        {stockStatus.label}
                                    </Badge>
                                </div>
                                {product.countInStock > 0 && (
                                    <p className="stock-message">
                                        Hurry! Only {product.countInStock} items left in stock.
                                    </p>
                                )}
                            </div>

                            {product.countInStock > 0 && (
                                <div className="product-actions">
                                    <div className="quantity-selector">
                                        <label htmlFor="quantity">Quantity:</label>
                                        <div className="quantity-controls">
                                            <button 
                                                type="button"
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                disabled={quantity <= 1}
                                                className="quantity-btn"
                                            >
                                                −
                                            </button>
                                            <input 
                                                id="quantity"
                                                type="number" 
                                                value={quantity}
                                                onChange={(e) => setQuantity(Math.max(1, Math.min(product.countInStock, parseInt(e.target.value) || 1)))}
                                                min="1"
                                                max={product.countInStock}
                                                className="quantity-input"
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => setQuantity(Math.min(product.countInStock, quantity + 1))}
                                                disabled={quantity >= product.countInStock}
                                                className="quantity-btn"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="action-buttons">
                                        <Button 
                                            variant="outline-primary" 
                                            size="lg"
                                            onClick={addToCartHandler}
                                            disabled={isAddingToCart}
                                            className="add-to-cart-btn"
                                        >
                                            {isAddingToCart ? (
                                                <>
                                                    <span className="loading-spinner"></span>
                                                    Adding...
                                                </>
                                            ) : (
                                                <>
                                                    <span className="cart-icon">🛒</span>
                                                    Add to Cart
                                                </>
                                            )}
                                        </Button>
                                        
                                        <Button 
                                            variant="primary" 
                                            size="lg"
                                            onClick={buyNowHandler}
                                            disabled={isAddingToCart}
                                            className="buy-now-btn"
                                        >
                                            <span className="buy-icon">⚡</span>
                                            Buy Now
                                        </Button>
                                    </div>

                                    <div className="total-price">
                                        <span className="total-label">Total:</span>
                                        <span className="total-amount">
                                            {formatPrice(product.price * quantity)}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="delivery-info">
                                <div className="delivery-option">
                                    <span className="delivery-icon">🚚</span>
                                    <div className="delivery-details">
                                        <strong>Free Delivery</strong>
                                        <p>On orders over $50. Usually delivered in 1-2 days.</p>
                                    </div>
                                </div>
                                <div className="delivery-option">
                                    <span className="delivery-icon">🔄</span>
                                    <div className="delivery-details">
                                        <strong>Easy Returns</strong>
                                        <p>30-day return policy. No questions asked.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Related Products Section */}
                <div className="related-products">
                    <h3>You might also like</h3>
                    <div className="related-products-grid">
                        {/* This would typically fetch related products */}
                        <div className="related-product-placeholder">
                            <p>Related products would appear here</p>
                            <Link to="/" className="btn btn-outline-primary">
                                Browse All Products
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ProductPage;








