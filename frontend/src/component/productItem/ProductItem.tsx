import React from 'react'
import { Product } from '../../types/Product';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../rating/Rating';
import { useContext } from 'react';
import { Store } from '../../Store';
import { CartItem } from '../../types/Cart';
import { convertProductToCartItem } from '../../utils/utils';
import { toast } from 'react-toastify';


const ProductItem = ({product} : {product:Product}) => {
    const {state, dispatch} = useContext(Store)
    const {cart: {cartItems}} = state;

    const addToCartHandler = (item: CartItem) => {
        const existItem = cartItems.find((x) => x._id === item._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        if (product.countInStock < quantity){
            alert ('Sorry, Product is out of stock');
            return
        }
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: {...item, quantity}
        })
        toast.success('Item added to the cart')

    }

  return (
    <Card>
        <Link to={`/product/${product.slug}`}>
            <img src={product.image} className='card-img-top ' alt={product.name} />
        </Link>
        <Card.Body>
            <Link to={`/product/${product.slug}`}>
                <Card.Title as='div'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as='h3'>
                ${product.price}
            </Card.Text>
            <Rating 
            rating={product.rating} 
            numReviews={product.numReviews}
            />
            {product.countInStock > 0 ? (
                <Button variant='primary' onClick={()=>addToCartHandler(convertProductToCartItem(product))}>Add to Cart
                </Button>
            ) : (
                <Button variant='primary' disabled>Out of Stock</Button>
            )}
        </Card.Body>
    </Card>
  )
}

export default ProductItem



