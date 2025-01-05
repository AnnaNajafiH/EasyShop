import { useContext, useEffect } from "react";
import { Store } from "../../Store";
import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailsQuery, useGetPaypalClientIdQuery, usePayOrderMutation } from "../../hooks/orderHooks";
import LoadingBox from "../../component/loadingBox/LoadingBox";
import MessageBox from "../../component/messageBox/MessageBox";
import { getError } from "../../utils/utils";
import { ApiError } from "../../types/ApiError";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { PayPalButtons, PayPalButtonsComponentProps, SCRIPT_LOADING_STATE, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { referrerPolicy } from "helmet";


export default function OrderPage() {
    const {state} = useContext(Store);
    const {userInfo} = state;

    const params = useParams();
    const {id: orderId} = params

    const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId!);

    const {mutateAsync: payOrder, isLoading: loadingPay} = usePayOrderMutation();


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
                    type: 'resetOptions',
                    value: {
                        "client-id": paypalConfig.clientId,
                        currency: "USD",
                    },
                });

                paypalDispatch({
                    type: 'setLoadingStatus',
                    value: SCRIPT_LOADING_STATE.PENDING,
                });
            };

            loadPaypalScript();
        }
    }, [paypalConfig]);
            
const paypalButtonTransactionProps: PayPalButtonsComponentProps = {
        style: { layout: 'vertical' },
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: order!.totalPrice.toString(),
                        },
                    },
                ],
            }).then((orderID: string) => {
                return orderID;
            });
        },
    onApprove: (data, actions) => {
        return actions.order!.capture().then(async (details)=>{
            try{
                payOrder({orderId: orderId!, ...details})
                refetch();
                toast.success("Order is paid Successful");
            } catch (err) {
                toast.error(getError(err as ApiError));
            }
        })
    },
    onError: (err) => {
        toast.error (getError(err as ApiError));
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
        <div>
            <Helmet>
                <title>Order {orderId}</title>
            </Helmet>

                <h1 className="my-3"> Order {orderId} </h1>
                <Row>
                    <Col md={8}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Shipping Address</Card.Title>
                                <Card.Text>
                                    <strong>Name:</strong> {order.shippingAddress.fullName} <br/>
                                    <strong>Address:</strong> {order.shippingAddress.address},
                                    {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                                    {order.shippingAddress.country}
                                </Card.Text>
                                {order.isDelivered? (
                                     <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>
                                    ) : (
                                     <MessageBox variant="warning">Not Delivered</MessageBox>
                                    )}
                                    
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>
                                                Payment
                                            </Card.Title>
                                            <Card.Text>
                                                <strong>Method:</strong> {order.paymentMethod}
                                             </Card.Text>
                                             {order.isPaid? (
                                                 <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
                                                ) : (
                                                 <MessageBox variant="warning">Not Paid</MessageBox>
                                                )}
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Item</Card.Title>
                                            <ListGroup variant="flush">
                                                {order.orderItems.map(item=>
                                                <ListGroup.Item key={item._id}>
                                                    <Row className="align-items-center">
                                                    <Col md={6}>
                                                    <img src={item.image} alt={item.name} className="img-fluid rounded thumbnail"></img> {' '}
                                                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                                    </Col>
                                                     <Col md={3}>
                                                        <span>{item.quantity}</span> 
                                                    </Col>
                                                     <Col md={3}>
                                                        <span>${item.price}</span>
                                                     </Col>
                                                    </Row>
                                                    </ListGroup.Item>)}
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                            </Card.Body>

                        </Card>
                    </Col>

                    <Col md={4}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Item</Col>
                                        <Col>${order.itemsPrice?.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice?.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>$ {order.taxPrice?.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                <Col><strong>Order Total</strong></Col>
                                <Col><strong> ${order.totalPrice?.toFixed(2)} </strong></Col>
                                   </Row>
                                </ListGroup.Item>
                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {isPending ? <LoadingBox/> : isRejected ? (
                                            <MessageBox variant="danger">
                                                Error in connecting to PayPal
                                            </MessageBox>) : (
                                                <div>
                                                    <PayPalButtons 
                                                    {...paypalButtonTransactionProps}>
                                                    </PayPalButtons>
                                                    <Button onClick={testPayHandler}> Test Pay </Button>
                                                </div>
                                            )}
                                            {loadingPay && <LoadingBox></LoadingBox>}   
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>    

                    </Card>
                    </Col>
                </Row>
        </div>
    )
}