import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DISPATCH_ACTION } from "@paypal/react-paypal-js";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { PayPalButtons, PayPalButtonsComponentProps, SCRIPT_LOADING_STATE, usePayPalScriptReducer} from "@paypal/react-paypal-js";

import { useGetOrderDetailsQuery, useGetPaypalClientIdQuery, usePayOrderMutation } from "../../hooks/orderHooks";
import LoadingBox from "../../component/loadingBox/LoadingBox";
import MessageBox from "../../component/messageBox/MessageBox";
import { getError } from "../../utils/utils";
import { ApiError } from "../../types/ApiError";
import "./OrderPage.css";

export default function OrderPage() {
    // const {state} = useContext(Store);
    // const {userInfo} = state;

    const params = useParams();
    const {id: orderId} = params

    const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId!);

    const {mutateAsync: payOrder, isPending: loadingPay} = usePayOrderMutation();


// Pay order handler
const testPayHandler = async ()=> {
    await payOrder({orderId: orderId!})
        refetch();
        toast.success("Order is paid Successful");
    }


 // PayPal script reducer and configuration fetching
const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();

const {data:paypalConfig}=useGetPaypalClientIdQuery();
console.log('PayPal Client ID:', paypalConfig?.clientId);

 // useEffect for loading PayPal script
useEffect(() => {
        if (paypalConfig && paypalConfig.clientId) {
        // console.log('PayPal Client ID:', paypalConfig.clientId);
            const loadPaypalScript = async () => {
          paypalDispatch({
                type: DISPATCH_ACTION.RESET_OPTIONS, // Corrected here
                 value: {
                 clientId: paypalConfig.clientId,
                 currency: "USD",
            },
        });

                paypalDispatch({
                    type:  DISPATCH_ACTION.LOADING_STATUS,
                    value: SCRIPT_LOADING_STATE.PENDING,
                });
            };

            loadPaypalScript();
        }
    }, [paypalConfig]);
            
const paypalButtonTransactionProps: PayPalButtonsComponentProps = {
        style: { layout: 'vertical' },

        createOrder: (_data, actions)  => {
            return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: order!.totalPrice.toString(),
                        },
                    },
                ],
            }).then((orderID: string) => {
                return orderID;
            });
        },
    onApprove: (data, actions) => {
    return actions.order!.capture().then(async (details) => {
        try {
            const orderId = data.orderID; // Use orderID from the data passed into onApprove
            await payOrder({ orderId: orderId!, ...details });
            refetch();
            toast.success("Order is paid successfully");
        } catch (err) {
            toast.error(getError(err as ApiError));
        }
    });
},
onError: (err) => {
    toast.error(getError(err as ApiError));
},

};
console.log("PayPal Script Status - isPending:", isPending, "isRejected:", isRejected);


   
    return isLoading? (
        <LoadingBox></LoadingBox>
    ) : error? (
        <MessageBox variant = "danger"> {getError (error as unknown as ApiError)} </MessageBox>
    ): !order?(
        <MessageBox variant = "danger"> Order not found </MessageBox>
    ): (
        <div className="order-page">
            <Helmet>
                <title>Order #{orderId}</title>
            </Helmet>

            <div className="order-header">
                <h1>Order #{orderId}</h1>
                <div className="order-status">
                    {order.isPaid ? (
                        <span className="status-badge paid">
                            <i className="status-icon">✓</i>
                            Paid
                        </span>
                    ) : (
                        <span className="status-badge unpaid">
                            <i className="status-icon">⏰</i>
                            Payment Pending
                        </span>
                    )}
                    {order.isDelivered ? (
                        <span className="status-badge delivered">
                            <i className="status-icon">🚚</i>
                            Delivered
                        </span>
                    ) : (
                        <span className="status-badge processing">
                            <i className="status-icon">📦</i>
                            Processing
                        </span>
                    )}
                </div>
            </div>

            <div className="order-content">
                <div className="order-main">
                    {/* Shipping Address Section */}
                    <div className="order-card">
                        <div className="card-header">
                            <h3><i className="icon">🏠</i>Shipping Address</h3>
                        </div>
                        <div className="card-content">
                            <div className="address-info">
                                <p><strong>{order.shippingAddress.fullName}</strong></p>
                                <p>{order.shippingAddress.address}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                <p>{order.shippingAddress.country}</p>
                            </div>
                            {order.isDelivered ? (
                                <div className="delivery-status delivered">
                                    <i className="status-icon">✅</i>
                                    <span>Delivered on {new Date(order.deliveredAt).toLocaleDateString()}</span>
                                </div>
                            ) : (
                                <div className="delivery-status pending">
                                    <i className="status-icon">🚛</i>
                                    <span>Delivery in progress</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payment Method Section */}
                    <div className="order-card">
                        <div className="card-header">
                            <h3><i className="icon">💳</i>Payment Method</h3>
                        </div>
                        <div className="card-content">
                            <div className="payment-info">
                                <p><strong>Method:</strong> {order.paymentMethod}</p>
                            </div>
                            {order.isPaid ? (
                                <div className="payment-status paid">
                                    <i className="status-icon">✅</i>
                                    <span>Paid on {new Date(order.paidAt).toLocaleDateString()}</span>
                                </div>
                            ) : (
                                <div className="payment-status pending">
                                    <i className="status-icon">⏳</i>
                                    <span>Payment pending</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Items Section */}
                    <div className="order-card">
                        <div className="card-header">
                            <h3><i className="icon">📦</i>Order Items</h3>
                        </div>
                        <div className="card-content">
                            <div className="order-items">
                                {order.orderItems.map(item => (
                                    <div key={item._id} className="order-item">
                                        <div className="item-image">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className="item-details">
                                            <Link to={`/product/${item.slug}`} className="item-name">
                                                {item.name}
                                            </Link>
                                            <div className="item-meta">
                                                <span className="quantity">Qty: {item.quantity}</span>
                                                <span className="price">${item.price}</span>
                                            </div>
                                        </div>
                                        <div className="item-total">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary Sidebar */}
                <div className="order-sidebar">
                    <div className="order-card sticky">
                        <div className="card-header">
                            <h3><i className="icon">📊</i>Order Summary</h3>
                        </div>
                        <div className="card-content">
                            <div className="summary-row">
                                <span>Items</span>
                                <span>${order.itemsPrice?.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>${order.shippingPrice?.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax</span>
                                <span>${order.taxPrice?.toFixed(2)}</span>
                            </div>
                            <hr className="summary-divider" />
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>${order.totalPrice?.toFixed(2)}</span>
                            </div>

                            {!order.isPaid && (
                                <div className="payment-section">
                                    <h4>Complete Payment</h4>
                                    {isPending ? (
                                        <LoadingBox/>
                                    ) : isRejected ? (
                                        <MessageBox variant="danger">
                                            Error connecting to PayPal
                                        </MessageBox>
                                    ) : (
                                        <div className="payment-methods">
                                            <div className="paypal-section">
                                                <PayPalButtons {...paypalButtonTransactionProps} />
                                            </div>
                                            <div className="test-payment">
                                                <button 
                                                    onClick={testPayHandler} 
                                                    className="btn btn-secondary"
                                                    disabled={loadingPay}
                                                >
                                                    {loadingPay ? 'Processing...' : 'Test Payment'}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {loadingPay && <LoadingBox />}
                                    
                                    <div className="security-info">
                                        <div className="security-badges">
                                            <span className="security-badge">🔒 SSL Secured</span>
                                            <span className="security-badge">🛡️ PayPal Protected</span>
                                        </div>
                                        <p className="security-text">
                                            Your payment information is secure and encrypted
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}