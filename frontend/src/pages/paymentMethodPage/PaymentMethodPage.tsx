import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Store } from "../../Store";
import { useState, useContext, useEffect } from "react";
import CheckoutSteps from "../../component/checkoutSteps/CheckoutSteps";
import { Helmet } from "react-helmet-async";
import { Button } from "react-bootstrap";



export default function PaymentMethodPage (){
    const navigate = useNavigate();
    const {state, dispatch} = useContext(Store);
    const {
        cart:{shippingAddress, paymentMethod},
    } = state;

    const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod||'PayPal');

    useEffect(()=>{
        if(!shippingAddress.address){
            navigate('/signin/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e: React.SyntheticEvent)=>{
        e.preventDefault();
        dispatch({
            type: 'SAVE_PAYMENT_METHOD',
            payload: paymentMethodName
        });
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder');
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
            <div className="container small-container">
                <Helmet>
                    <title>Payment Method</title>
                </Helmet>
                <h1 className="my-3">Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <Form.Check                           
                            type="radio" 
                            id="paypal" 
                            label="PayPal"
                            value="PayPal" 
                            checked = {paymentMethodName === 'PayPal'}
                            onChange={(e)=>setPaymentMethodName(e.target.value)}
                        />    
                    </div>
                    <div className="mb-3">
                        <Form.Check                           
                            type="radio" 
                            id="applePay" 
                            label="ApplePay"
                            value="applePay" 
                            checked = {paymentMethodName === 'applePay'}
                            onChange={(e)=>setPaymentMethodName(e.target.value)}
                        />    
                    </div>
                    <div className="mb-3">
                        <Form.Check                           
                            type="radio" 
                            id="creditCard" 
                            label="CreditCard"
                            value="creditCard" 
                            checked = {paymentMethodName === 'creditCard'}
                            onChange={(e)=>setPaymentMethodName(e.target.value)}
                        />    
                    </div>
                    <div className="mb-3">
                        <Form.Check                           
                            type="radio" 
                            id="card" 
                            label="Card"
                            value="card" 
                            checked = {paymentMethodName === 'card'}
                            onChange={(e)=>setPaymentMethodName(e.target.value)}
                        />    
                    </div>

                    <div className="mb-3">
                        <Button type="submit">Continue</Button>
                    </div>

                </Form>
            </div>
        </div>
    )
}