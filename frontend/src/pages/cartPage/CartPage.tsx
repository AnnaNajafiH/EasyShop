import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { Store } from "../../Store";
import { CartItem } from "../../types/Cart";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { Button, ListGroup, Row, Col, Card, Image } from "react-bootstrap";
import MessageBox from "../../component/messageBox/MessageBox";

export default function CartPage(){
    const navigate = useNavigate();

    const {state: {mode, cart: { cartItems }}, dispatch,} = useContext(Store);


    const updateCartHandler= (item: CartItem, quantity: number) => {
        if (item.countInStock < quantity){
            toast.warn ("Sorry, product is out of stock");
            return;
        }
        dispatch({
            type: "CART_ADD_ITEM", 
            payload: {...item, quantity}});
        };
    

    const checkoutHandler = () => {
        navigate("/signin?redirect=shipping");
    };

    const removeItemHandler = (item: CartItem) => {
        dispatch({ type: "CART_REMOVE_ITEM", payload: item });
    };

    return(
        <div>
        <Helmet>
            <title>Shopping Cart</title>
        </Helmet>
        <h1>Shopping Cart</h1>
        <Row>
            {/* left side */}
            <Col md={8}>
            {cartItems.length === 0 ? (
                <MessageBox>
                    Cart is empty. <Link to="/">Go Shopping</Link>
                    </MessageBox>
                    ) : (
                        <ListGroup>
                            {cartItems.map((item : CartItem) => (
                                <ListGroup.Item key={item._id}>
                                    <Row className="align-items-center">

                                        <Col md={5}>
                                            <Image src={item.image} alt={item.name} className='img-fluid rounded thumbnail' />
                                            <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                        </Col>

                                        <Col md={3}>
                                        <Button
                                        onClick={()=>updateCartHandler(item, item.quantity - 1)}
                                        variant={mode}
                                        disabled={item.quantity === 1}>
                                           <i className="fas fa-minus-circle"></i> 
                                        </Button>{" "}
                                        <span>{item.quantity}</span>
                                        <Button
                                        onClick={()=>updateCartHandler(item, item.quantity + 1)}
                                        variant={mode}
                                        disabled={item.quantity === item.countInStock}>
                                           <i className="fas fa-plus-circle"></i> 
                                        </Button>
                                        </Col>

                                        <Col md={2}>${item.price}</Col>

                                        <Col md={2}>
                                        <Button variant={mode}
                                        onClick={() => removeItemHandler(item)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                        </Col>                                        
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
            </Col>

            {/* right side */}
            <Col md={4}>
            <Card>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>
                                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '} 
                                items) : $ 
                                {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                            </h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button  className="w-100"
                            type="button"
                            variant="primary"
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}>
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </div>
    )
}




