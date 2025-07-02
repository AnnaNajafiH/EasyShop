import { useLocation, useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useSigninMutation } from "../../hooks/userHooks";
import { ApiError } from "../../types/ApiError";
import { Store } from "../../Store";
import { toast } from "react-toastify";
import { getError } from "../../utils/utils";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../component/loadingBox/LoadingBox";
import './SigninPage.css';

export default function SigninPage() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectInUrl ? redirectInUrl : "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;

    const { mutateAsync: signin, status } = useSigninMutation();

    const validateField = (name: string, value: string) => {
        let error = '';
        
        if (name === 'email') {
            if (!value.trim()) {
                error = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = 'Please enter a valid email address';
            }
        } else if (name === 'password') {
            if (!value.trim()) {
                error = 'Password is required';
            } else if (value.length < 6) {
                error = 'Password must be at least 6 characters';
            }
        }
        
        setErrors(prev => ({ ...prev, [name]: error }));
        return error === '';
    };

    const handleInputChange = (name: string, value: string) => {
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
        
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        
        const isEmailValid = validateField('email', email);
        const isPasswordValid = validateField('password', password);
        
        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        try {
            const data = await signin({
                email,
                password
            });
            dispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Welcome back!');
            navigate(redirect);
        } catch (err) {
            toast.error(getError(err as ApiError));
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return (
        <div className="signin-page">
            <Helmet>
                <title>Sign In - Flourish & Bloom</title>
            </Helmet>
            
            <Container className="signin-container">
                <div className="signin-card">
                    <div className="signin-header">
                        <h1 className="signin-title">Welcome Back</h1>
                        <p className="signin-subtitle">
                            Sign in to your account to continue shopping
                        </p>
                    </div>

                    <Form onSubmit={submitHandler} className="signin-form">
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
                                    placeholder="Enter your password"
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
                            {errors.password && (
                                <div className="error-message">{errors.password}</div>
                            )}
                        </Form.Group>

                        <div className="form-actions">
                            <Button 
                                type="submit" 
                                className="signin-btn"
                                disabled={status === "pending"}
                            >
                                {status === "pending" ? (
                                    <>
                                        <span className="loading-spinner"></span>
                                        Signing In...
                                    </>
                                ) : (
                                    <>
                                        <span className="signin-icon">🔐</span>
                                        Sign In
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="signup-link">
                            <span className="signup-text">New to Flourish & Bloom?</span>
                            <Link 
                                to={`/signup?redirect=${redirect}`} 
                                className="signup-link-btn"
                            >
                                Create your account
                            </Link>
                        </div>

                        <div className="security-notice">
                            <span className="security-icon">🔒</span>
                            <span className="security-text">
                                Your information is secure and encrypted
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


