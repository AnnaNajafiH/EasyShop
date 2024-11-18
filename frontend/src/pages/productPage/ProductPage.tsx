import { Helmet } from "react-helmet-async"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import LoadingBox from "../../component/loadingBox/LoadingBox"
import MessageBox from "../../component/messageBox/MessageBox"
import { useGetProductDetailsBySlugQuery } from "../../hooks/productHooks"
import { convertProductToCartItem, getError } from "../../utils/utils"
import { ApiError } from "../../types/ApiError"
import { Badge, Button, Card, ListGroup, ListGroupItem, Row, Toast } from "react-bootstrap"
import { Col } from "react-bootstrap"
import Rating from "../../component/rating/Rating";
import { useContext } from "react";
import { Store } from "../../Store";
import { toast } from "react-toastify";

const ProductPage = () => {
  const params = useParams()
  const {slug} = params

const {
  data:product,
  // refetch,
  isLoading,
  error
} = useGetProductDetailsBySlugQuery(slug!)
//====================================================================
 const {state, dispatch} = useContext(Store)
    const {cart} = state;
    
    const navigate = useNavigate()

    const addToCartHandler = () => {
        const existItem = cart.cartItems.find((x) => x._id === product!._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        if (product!.countInStock < quantity){
            toast.warn ('Sorry, Product is out of stock');
            return
        }
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: {...convertProductToCartItem(product!), quantity}
        })
        toast.success('Item added to the cart')
        navigate('/cart')
    }

//====================================================================

  return isLoading ? (
    <LoadingBox/>
  ): error? (
    <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox> 
  ): (
    <div>
     
    <Row>
      <Col md={6}>
        <img src={product!.image} alt={product!.name} className="large"/>
      </Col>
      <Col md={3}>
     <ListGroup variant="flush">
       <ListGroup.Item>
         <Helmet>
        <title>{product!.name}</title>
      </Helmet>
         <h1>{product!.name}</h1>
       </ListGroup.Item>
        <ListGroup.Item>
          <Rating
          rating={product!.rating} 
          numReviews={product!.numReviews}/>
        </ListGroup.Item>
       <ListGroup.Item>
         Price: ${product!.price}
       </ListGroup.Item>
       <ListGroup.Item>
         Description: {product!.description}
       </ListGroup.Item>
      </ListGroup>
      
    <title>{product!.name}</title>
      </Col>
      <Col md={3}>
     <Card>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
          <Row>
            <Col>Price</Col>
            <Col>${product?.price}</Col>
          </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Status</Col>
              <Col>{product?.countInStock && product.countInStock > 0  ? (
                <Badge bg="success">In Stock</Badge>
              ):(
                <Badge bg="danger">Unavailable</Badge>
              )}
              </Col>
            </Row>
          </ListGroup.Item>
          {product?.countInStock !== undefined && product.countInStock>0 &&(
            <ListGroup.Item>
              <div className="d-grid">
                <Button variant="primary" onClick={addToCartHandler}>Add to Cart</Button>
              </div>
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

export default ProductPage