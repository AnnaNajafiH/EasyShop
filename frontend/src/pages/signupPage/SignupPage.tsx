import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Store } from "../../Store";
import { useSignupMutation } from "../../hooks/userHooks";
import { ApiError } from "../../types/ApiError";
import { toast } from "react-toastify";
import { getError } from "../../utils/utils";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../component/loadingBox/LoadingBox";
import './SignupPage.css';

export default function SignupPage() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectInUrl ? redirectInUrl : "/";

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const { mutateAsync: signup, status } = useSignupMutation();

    const validateField = (name: string, value: string) => {
        let error = '';
        
        switch (name) {
            case 'name':
                if (!value.trim()) {
                    error = 'Name is required';
                } else if (value.length < 2) {
                    error = 'Name must be at least 2 characters';
                }
                break;
            case 'email':
                if (!value.trim()) {
                    error = 'Email is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Please enter a valid email address';
                }
                break;
            case 'password':
                if (!value.trim()) {
                    error = 'Password is required';
                } else if (value.length < 6) {
                    error = 'Password must be at least 6 characters';
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    error = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
                }
                break;
            case 'confirmPassword':
                if (!value.trim()) {
                    error = 'Please confirm your password';
                } else if (value !== password) {
                    error = 'Passwords do not match';
                }
                break;
        }
        
        setErrors(prev => ({ ...prev, [name]: error }));
        return error === '';
    };

    const handleInputChange = (fieldName: string, value: string) => {
        switch (fieldName) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                // Re-validate confirm password if it's already filled
                if (confirmPassword) {
                    validateField('confirmPassword', confirmPassword);
                }
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
        }
        
        // Clear error when user starts typing
        if (errors[fieldName as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [fieldName]: '' }));
        }
    };

    const validateForm = () => {
        const fields = { name, email, password, confirmPassword };
        let isValid = true;
        
        Object.entries(fields).forEach(([fieldName, value]) => {
            if (!validateField(fieldName, value)) {
                isValid = false;
            }
        });
        
        return isValid;
    };

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const data = await signup({
                name,
                email,
                password
            });
            dispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Welcome to Flourish & Bloom!');
            navigate(redirect || '/');
        } catch (err) {
            toast.error(getError(err as ApiError));
        }
    };

    const getPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 6) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;
        return strength;
    };

    const getPasswordStrengthLabel = (strength: number) => {
        switch (strength) {
            case 0:
            case 1: return 'Very Weak';
            case 2: return 'Weak';
            case 3: return 'Fair';
            case 4: return 'Strong';
            case 5: return 'Very Strong';
            default: return '';
        }
    };

    const passwordStrength = getPasswordStrength(password);

    return (
        <div className="signup-page">
            <Helmet>
                <title>Sign Up - Flourish & Bloom</title>
            </Helmet>
            
            <Container className="signup-container">
                <div className="signup-card">
                    <div className="signup-header">
                        <h1 className="signup-title">Join Flourish & Bloom</h1>
                        <p className="signup-subtitle">
                            Create your account and start your floral journey
                        </p>
                    </div>

                    <Form onSubmit={submitHandler} className="signup-form">
                        <Form.Group className="form-group" controlId="name">
                            <Form.Label className="form-label">
                                Full Name <span className="required">*</span>
                            </Form.Label>
                            <div className="input-wrapper">
                                <Form.Control
                                    type="text"
                                    className={`form-input ${errors.name ? 'error' : ''}`}
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    required
                                />
                                <span className="input-icon">👤</span>
                            </div>
                            {errors.name && (
                                <div className="error-message">{errors.name}</div>
                            )}
                        </Form.Group>

                        <Form.Group className="form-group" controlId="email">
                            <Form.Label className="form-label">
                                Email Address <span className="required">*</span>
                            </Form.Label>
                            <div className="input-wrapper">
                                <Form.Control
                                    type="email"
                                    className={`form-input ${errors.email ? 'error' : ''}`}
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    required
                                />
                                <span className="input-icon">📧</span>
                            </div>
                            {errors.email && (
                                <div className="error-message">{errors.email}</div>
                            )}
                        </Form.Group>

                        <Form.Group className="form-group" controlId="password">
                            <Form.Label className="form-label">
                                Password <span className="required">*</span>
                            </Form.Label>
                            <div className="input-wrapper">
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    className={`form-input ${errors.password ? 'error' : ''}`}
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                            {password && (
                                <div className="password-strength">
                                    <div className="strength-meter">
                                        <div 
                                            className={`strength-bar strength-${passwordStrength}`}
                                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className={`strength-label strength-${passwordStrength}`}>
                                        {getPasswordStrengthLabel(passwordStrength)}
                                    </span>
                                </div>
                            )}
                            {errors.password && (
                                <div className="error-message">{errors.password}</div>
                            )}
                        </Form.Group>

                        <Form.Group className="form-group" controlId="confirmPassword">
                            <Form.Label className="form-label">
                                Confirm Password <span className="required">*</span>
                            </Form.Label>
                            <div className="input-wrapper">
                                <Form.Control
                                    type={showConfirmPassword ? "text" : "password"}
                                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                            {confirmPassword && password === confirmPassword && (
                                <div className="success-message">✅ Passwords match</div>
                            )}
                            {errors.confirmPassword && (
                                <div className="error-message">{errors.confirmPassword}</div>
                            )}
                        </Form.Group>

                        <div className="password-requirements">
                            <h4>Password Requirements:</h4>
                            <ul>
                                <li className={password.length >= 6 ? 'met' : ''}>
                                    At least 6 characters
                                </li>
                                <li className={/[a-z]/.test(password) ? 'met' : ''}>
                                    One lowercase letter
                                </li>
                                <li className={/[A-Z]/.test(password) ? 'met' : ''}>
                                    One uppercase letter
                                </li>
                                <li className={/\d/.test(password) ? 'met' : ''}>
                                    One number
                                </li>
                            </ul>
                        </div>

                        <div className="form-actions">
                            <Button 
                                type="submit" 
                                className="signup-btn"
                                disabled={status === "pending"}
                            >
                                {status === "pending" ? (
                                    <>
                                        <span className="loading-spinner"></span>
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        <span className="signup-icon">🌸</span>
                                        Create Account
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="signin-link">
                            <span className="signin-text">Already have an account?</span>
                            <Link 
                                to={`/signin?redirect=${redirect}`} 
                                className="signin-link-btn"
                            >
                                Sign in here
                            </Link>
                        </div>

                        <div className="terms-notice">
                            <span className="terms-text">
                                By creating an account, you agree to our{' '}
                                <a href="/terms" className="terms-link">Terms of Service</a>{' '}
                                and{' '}
                                <a href="/privacy" className="terms-link">Privacy Policy</a>
                            </span>
                        </div>
                    </Form>

                    {status === "pending" && (
                        <div className="loading-overlay">
                            <LoadingBox />
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}
