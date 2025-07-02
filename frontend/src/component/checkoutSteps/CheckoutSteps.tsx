import { Col, Row } from "react-bootstrap";
import './CheckoutSteps.css';

export default function CheckoutSteps(props: { 
    step1?: boolean; 
    step2?: boolean; 
    step3?: boolean; 
    step4?: boolean; 
}) {
    return (
        <div className="checkout-steps-container">
            <Row className="checkout-steps">    
                <Col className={`checkout-step ${props.step1 ? 'active' : ''}`}>
                    <div className="step-number">1</div>
                    <span className="step-label">Sign-In</span>
                </Col>
                <Col className={`checkout-step ${props.step2 ? 'active' : ''}`}>
                    <div className="step-number">2</div>
                    <span className="step-label">Shipping</span>
                </Col>
                <Col className={`checkout-step ${props.step3 ? 'active' : ''}`}>
                    <div className="step-number">3</div>
                    <span className="step-label">Payment</span>
                </Col>
                <Col className={`checkout-step ${props.step4 ? 'active' : ''}`}>
                    <div className="step-number">4</div>
                    <span className="step-label">Place Order</span>
                </Col>
            </Row>
        </div>
    );
}




