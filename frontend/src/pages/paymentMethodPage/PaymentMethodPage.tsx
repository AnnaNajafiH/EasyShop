import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Store } from "../../Store";
import { useState, useContext, useEffect } from "react";
import CheckoutSteps from "../../component/checkoutSteps/CheckoutSteps";
import { Helmet } from "react-helmet-async";
import { Button } from "react-bootstrap";
import './PaymentMethodPage.css';

export default function PaymentMethodPage() {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(Store);
    const {
        cart: { shippingAddress, paymentMethod },
    } = state;

    const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || 'PayPal');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const paymentOptions = [
        {
            id: 'PayPal',
            value: 'PayPal',
            label: 'PayPal',
            description: 'Pay securely with your PayPal account',
            icon: '💳',
            popular: true
        },
        {
            id: 'applePay',
            value: 'applePay',
            label: 'Apple Pay',
            description: 'Quick and secure payment with Touch ID or Face ID',
            icon: '🍎',
            popular: false
        },
        {
            id: 'creditCard',
            value: 'creditCard',
            label: 'Credit Card',
            description: 'Visa, Mastercard, American Express accepted',
            icon: '💳',
            popular: false
        },
        {
            id: 'googlePay',
            value: 'googlePay',
            label: 'Google Pay',
            description: 'Fast checkout with Google Pay',
            icon: '🔷',
            popular: false
        },
        {
            id: 'stripe',
            value: 'stripe',
            label: 'Stripe',
            description: 'Secure payment processing by Stripe',
            icon: '🔒',
            popular: false
        }
    ];

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1000));

        dispatch({
            type: 'SAVE_PAYMENT_METHOD',
            payload: paymentMethodName
        });
        localStorage.setItem('paymentMethod', paymentMethodName);
        
        setIsProcessing(false);
        navigate('/placeorder');
    };

    const handlePaymentMethodChange = (value: string) => {
        setPaymentMethodName(value);
    };

    const selectedOption = paymentOptions.find(option => option.value === paymentMethodName);

    return (
        <div className="payment-method-page">
            <Helmet>
                <title>Payment Method - Flourish & Bloom</title>
            </Helmet>
            
            <CheckoutSteps step1 step2 step3 />
            
            <div className="payment-container">
                <div className="payment-card">
                    <div className="payment-header">
                        <h1 className="payment-title">Choose Payment Method</h1>
                        <p className="payment-subtitle">
                            Select your preferred payment option to complete your order
                        </p>
                    </div>

                    <Form onSubmit={submitHandler} className="payment-form">
                        <div className="payment-options">
                            {paymentOptions.map((option) => (
                                <div key={option.id} className="payment-option-wrapper">
                                    <Form.Check
                                        type="radio"
                                        id={option.id}
                                        name="paymentMethod"
                                        value={option.value}
                                        checked={paymentMethodName === option.value}
                                        onChange={(e) => handlePaymentMethodChange(e.target.value)}
                                        className="payment-radio-input"
                                    />
                                    <label htmlFor={option.id} className="payment-option">
                                        <div className="payment-option-content">
                                            <div className="payment-option-icon">{option.icon}</div>
                                            <div className="payment-option-info">
                                                <div className="payment-option-header">
                                                    <span className="payment-option-label">{option.label}</span>
                                                    {option.popular && (
                                                        <span className="popular-badge">Popular</span>
                                                    )}
                                                </div>
                                                <span className="payment-option-description">
                                                    {option.description}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="payment-option-radio">
                                            <div className="radio-dot"></div>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>

                        {selectedOption && (
                            <div className="selected-payment-info">
                                <div className="selected-payment-card">
                                    <div className="selected-payment-icon">{selectedOption.icon}</div>
                                    <div className="selected-payment-details">
                                        <h3>Selected: {selectedOption.label}</h3>
                                        <p>{selectedOption.description}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="security-info">
                            <div className="security-badge">
                                <span className="security-icon">🔒</span>
                                <div className="security-text">
                                    <strong>Secure Payment</strong>
                                    <p>Your payment information is encrypted and secure</p>
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <Button 
                                variant="outline-secondary" 
                                type="button"
                                className="btn-back"
                                onClick={() => navigate('/shipping')}
                                disabled={isProcessing}
                            >
                                Back to Shipping
                            </Button>
                            <Button 
                                variant="primary" 
                                type="submit"
                                className="btn-continue"
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <>
                                        <span className="processing-spinner"></span>
                                        Processing...
                                    </>
                                ) : (
                                    'Continue to Review Order'
                                )}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}