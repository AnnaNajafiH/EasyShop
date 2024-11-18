import { Col, Row } from "react-bootstrap";
import { Product } from '../../types/Product';
import LoadingBox from "../../component/loadingBox/LoadingBox";
import MessageBox from "../../component/messageBox/MessageBox";
import ProductItem from "../../component/productItem/ProductItem";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../../hooks/productHooks";
import { getError } from "../../utils/utils";
import { ApiError } from "../../types/ApiError";


  
  
    
function Homepage() {
  const {data:products, isLoading, error} = useGetProductsQuery()
  return (
    isLoading ? (
      <LoadingBox/>) 
      : error ? (
        <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
      ) : (
    <div> 
          <Row>
            <Helmet>
              <title>Easy Shop</title>
            </Helmet>
      {products!.map((product:Product) => (
      <Col key={product.slug} sm={6} md={4} lg={3}>
        <ProductItem product={product}/>
      </Col>
    )
    )}
    </Row> 
    </div>
      )
  )
}

export default Homepage


