import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, Col, Row, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import { Store } from "../../Store";
import { useCreateOrderMutation } from "../../hooks/orderHooks";
import { ApiError } from "../../types/ApiError";
import { getError } from "../../utils/utils";
import LoadingBox from "../../component/loadingBox/LoadingBox";
import CheckoutSteps from "../../component/checkoutSteps/CheckoutSteps";
import './PlaceOrderPage.css';

export default function PlaceOrderPage() {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const [isProcessing, setIsProcessing] = useState(false);

    // Helper function to round numbers to 2 decimal places
    const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;

    // Calculate prices
    cart.itemsPrice = round2(cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
    cart.taxPrice = round2(cart.itemsPrice * 0.15);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const { mutateAsync: createOrder, status } = useCreateOrderMutation();

    const placeOrderHandler = async () => {
        try {
            setIsProcessing(true);
            const data = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice
            });
            dispatch({ type: 'CART_CLEAR' });
            localStorage.removeItem('cartItems');
            setIsProcessing(false);
            toast.success('Order placed successfully!');
            navigate(`/order/${data.order._id}`);
        } catch (error) {
            setIsProcessing(false);
            toast.error(getError(error as ApiError));
        }
    };

    const getPaymentMethodIcon = (method: string) => {
        switch (method.toLowerCase()) {
            case 'paypal': return '💳';
            case 'applepay': return '🍎';
            case 'googlepay': return '🔷';
            case 'creditcard': return '💳';
            case 'stripe': return '🔒';
            default: return '💳';
        }
    };

    const formatPaymentMethod = (method: string) => {
        switch (method.toLowerCase()) {
            case 'paypal': return 'PayPal';
            case 'applepay': return 'Apple Pay';
            case 'googlepay': return 'Google Pay';
            case 'creditcard': return 'Credit Card';
            case 'stripe': return 'Stripe';
            default: return method;
        }
    };

    return (
        <div className="place-order-page">
            <Helmet>
                <title>Review & Place Order - Flourish & Bloom</title>
            </Helmet>
            
            <CheckoutSteps step1 step2 step3 step4 />
            
            <div className="place-order-container">
                <div className="page-header">
                    <h1 className="page-title">Review Your Order</h1>
                    <p className="page-subtitle">
                        Please review your order details before placing your order
                    </p>
                </div>

                <Row className="order-content">
                    <Col lg={8} className="order-details">
                        {/* Shipping Information */}
                        <Card className="info-card shipping-card">
                            <Card.Body>
                                <div className="card-header-section">
                                    <div className="card-title-wrapper">
                                        <span className="card-icon">🚚</span>
                                        <Card.Title className="card-title">Shipping Information</Card.Title>
                                    </div>
                                    <Link to="/shipping" className="edit-link">
                                        <span className="edit-icon">✏️</span>
                                        Edit
                                    </Link>
                                </div>
                                <div className="shipping-details">
                                    <div className="detail-row">
                                        <span className="detail-label">Recipient:</span>
                                        <span className="detail-value">{cart.shippingAddress.fullName}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Address:</span>
                                        <span className="detail-value">
                                            {cart.shippingAddress.address}<br />
                                            {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}<br />
                                            {cart.shippingAddress.country}
                                        </span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Payment Method */}
                        <Card className="info-card payment-card">
                            <Card.Body>
                                <div className="card-header-section">
                                    <div className="card-title-wrapper">
                                        <span className="card-icon">{getPaymentMethodIcon(cart.paymentMethod)}</span>
                                        <Card.Title className="card-title">Payment Method</Card.Title>
                                    </div>
                                    <Link to="/payment" className="edit-link">
                                        <span className="edit-icon">✏️</span>
                                        Edit
                                    </Link>
                                </div>
                                <div className="payment-details">
                                    <div className="payment-method-selected">
                                        <span className="payment-method-name">
                                            {formatPaymentMethod(cart.paymentMethod)}
                                        </span>
                                        <span className="payment-security">
                                            🔒 Secure payment processing
                                        </span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Order Items */}
                        <Card className="info-card items-card">
                            <Card.Body>
                                <div className="card-header-section">
                                    <div className="card-title-wrapper">
                                        <span className="card-icon">🛍️</span>
                                        <Card.Title className="card-title">
                                            Order Items ({cart.cartItems.length} {cart.cartItems.length === 1 ? 'item' : 'items'})
                                        </Card.Title>
                                    </div>
                                    <Link to="/cart" className="edit-link">
                                        <span className="edit-icon">✏️</span>
                                        Edit
                                    </Link>
                                </div>
                                <div className="items-list">
                                    {cart.cartItems.map(item => (
                                        <div key={item._id} className="order-item">
                                            <div className="item-image-wrapper">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="item-image"
                                                />
                                            </div>
                                            <div className="item-details">
                                                <Link 
                                                    to={`/product/${item.slug}`} 
                                                    className="item-name"
                                                >
                                                    {item.name}
                                                </Link>
                                                <div className="item-meta">
                                                    <span className="item-quantity">
                                                        Qty: {item.quantity}
                                                    </span>
                                                    <span className="item-price">
                                                        ${item.price.toFixed(2)} each
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="item-total">
                                                <span className="total-label">Total</span>
                                                <span className="total-amount">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Order Summary */}
                    <Col lg={4} className="order-summary-col">
                        <div className="summary-sticky">
                            <Card className="summary-card">
                                <Card.Body>
                                    <div className="summary-header">
                                        <Card.Title className="summary-title">
                                            <span className="summary-icon">📊</span>
                                            Order Summary
                                        </Card.Title>
                                    </div>

                                    <div className="summary-details">
                                        <div className="summary-row">
                                            <span className="summary-label">
                                                Items ({cart.cartItems.length})
                                            </span>
                                            <span className="summary-value">
                                                ${cart.itemsPrice.toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="summary-row">
                                            <span className="summary-label">
                                                Shipping
                                                {cart.itemsPrice > 100 && (
                                                    <span className="free-shipping">FREE</span>
                                                )}
                                            </span>
                                            <span className="summary-value">
                                                ${cart.shippingPrice.toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="summary-row">
                                            <span className="summary-label">
                                                Tax (15%)
                                            </span>
                                            <span className="summary-value">
                                                ${cart.taxPrice.toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="summary-divider"></div>

                                        <div className="summary-row total-row">
                                            <span className="summary-label total-label">
                                                Order Total
                                            </span>
                                            <span className="summary-value total-value">
                                                ${cart.totalPrice.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="place-order-section">
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="place-order-btn"
                                            onClick={placeOrderHandler}
                                            disabled={cart.cartItems.length === 0 || status === "pending" || isProcessing}
                                        >
                                            {isProcessing || status === "pending" ? (
                                                <>
                                                    <span className="processing-spinner"></span>
                                                    Processing Order...
                                                </>
                                            ) : (
                                                <>
                                                    <span className="order-icon">🛒</span>
                                                    Place Order - ${cart.totalPrice.toFixed(2)}
                                                </>
                                            )}
                                        </Button>

                                        {cart.itemsPrice > 100 && (
                                            <div className="free-shipping-notice">
                                                🎉 You qualify for free shipping!
                                            </div>
                                        )}

                                        <div className="security-notice">
                                            <span className="security-icon">🔒</span>
                                            <span className="security-text">
                                                Your order and payment are secure
                                            </span>
                                        </div>
                                    </div>

                                    {(status === "pending" || isProcessing) && (
                                        <div className="loading-overlay">
                                            <LoadingBox />
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}





