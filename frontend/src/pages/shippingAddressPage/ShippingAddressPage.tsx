import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Store } from "../../Store";
import { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../../component/checkoutSteps/CheckoutSteps";
import { Button } from "react-bootstrap";
import './ShippingAddressPage.css';

export default function ShippingAddressPage() {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(Store);

    const {
        userInfo,  // we need it to check if the user is logged in
        cart: { shippingAddress },
    } = state;

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=shipping');
        }
    }, [userInfo, navigate]);

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const [errors, setErrors] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });

    const validateField = (name: string, value: string) => {
        let error = '';
        
        if (!value.trim()) {
            error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        } else if (name === 'fullName' && value.length < 2) {
            error = 'Full name must be at least 2 characters';
        } else if (name === 'postalCode' && !/^[a-zA-Z0-9\s-]{3,10}$/.test(value)) {
            error = 'Please enter a valid postal code';
        }
        
        setErrors(prev => ({ ...prev, [name]: error }));
        return error === '';
    };

    const validateForm = () => {
        const fields = { fullName, address, city, postalCode, country };
        let isValid = true;
        
        Object.entries(fields).forEach(([name, value]) => {
            if (!validateField(name, value)) {
                isValid = false;
            }
        });
        
        return isValid;
    };

    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country
            }
        });
        
        localStorage.setItem('shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country
            }));

        navigate('/payment');
    };

    const handleInputChange = (name: string, value: string) => {
        switch (name) {
            case 'fullName':
                setFullName(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'postalCode':
                setPostalCode(value);
                break;
            case 'country':
                setCountry(value);
                break;
        }
        
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="shipping-address-page">
            <Helmet>
                <title>Shipping Address - Flourish & Bloom</title>
            </Helmet>
            
            <CheckoutSteps step1 step2 />
            
            <div className="shipping-container">
                <div className="shipping-card">
                    <div className="shipping-header">
                        <h1 className="shipping-title">Shipping Address</h1>
                        <p className="shipping-subtitle">
                            Please provide your shipping details for delivery
                        </p>
                    </div>

                    <Form onSubmit={submitHandler} className="shipping-form">
                        <div className="form-row">
                            <Form.Group className="form-group full-width" controlId="fullName">
                                <Form.Label className="form-label">
                                    Full Name <span className="required">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                                    value={fullName}
                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                    placeholder="Enter your full name"
                                    required
                                />
                                {errors.fullName && (
                                    <div className="error-message">{errors.fullName}</div>
                                )}
                            </Form.Group>
                        </div>

                        <div className="form-row">
                            <Form.Group className="form-group full-width" controlId="address">
                                <Form.Label className="form-label">
                                    Street Address <span className="required">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    className={`form-input ${errors.address ? 'error' : ''}`}
                                    value={address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    placeholder="Enter your street address"
                                    required
                                />
                                {errors.address && (
                                    <div className="error-message">{errors.address}</div>
                                )}
                            </Form.Group>
                        </div>

                        <div className="form-row">
                            <Form.Group className="form-group half-width" controlId="city">
                                <Form.Label className="form-label">
                                    City <span className="required">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    className={`form-input ${errors.city ? 'error' : ''}`}
                                    value={city}
                                    onChange={(e) => handleInputChange('city', e.target.value)}
                                    placeholder="Enter your city"
                                    required
                                />
                                {errors.city && (
                                    <div className="error-message">{errors.city}</div>
                                )}
                            </Form.Group>

                            <Form.Group className="form-group half-width" controlId="postalCode">
                                <Form.Label className="form-label">
                                    Postal Code <span className="required">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    className={`form-input ${errors.postalCode ? 'error' : ''}`}
                                    value={postalCode}
                                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                                    placeholder="Enter postal code"
                                    required
                                />
                                {errors.postalCode && (
                                    <div className="error-message">{errors.postalCode}</div>
                                )}
                            </Form.Group>
                        </div>

                        <div className="form-row">
                            <Form.Group className="form-group full-width" controlId="country">
                                <Form.Label className="form-label">
                                    Country <span className="required">*</span>
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    className={`form-input ${errors.country ? 'error' : ''}`}
                                    value={country}
                                    onChange={(e) => handleInputChange('country', e.target.value)}
                                    required
                                >
                                    <option value="">Select your country</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="GB">United Kingdom</option>
                                    <option value="DE">Germany</option>
                                    <option value="FR">France</option>
                                    <option value="IT">Italy</option>
                                    <option value="ES">Spain</option>
                                    <option value="AU">Australia</option>
                                    <option value="JP">Japan</option>
                                    <option value="Other">Other</option>
                                </Form.Control>
                                {errors.country && (
                                    <div className="error-message">{errors.country}</div>
                                )}
                            </Form.Group>
                        </div>

                        <div className="form-actions">
                            <Button 
                                variant="outline-secondary" 
                                type="button"
                                className="btn-back"
                                onClick={() => navigate('/cart')}
                            >
                                Back to Cart
                            </Button>
                            <Button 
                                variant="primary" 
                                type="submit"
                                className="btn-continue"
                            >
                                Continue to Payment
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}







