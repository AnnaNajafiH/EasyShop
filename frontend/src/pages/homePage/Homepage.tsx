import { Carousel, CarouselItem, Col, Container, Row } from "react-bootstrap";
import { Product } from "../../types/Product";
import LoadingBox from "../../component/loadingBox/LoadingBox";
import MessageBox from "../../component/messageBox/MessageBox";
import ProductItem from "../../component/productItem/ProductItem";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../../hooks/productHooks";
import { getError } from "../../utils/utils";
import { ApiError } from "../../types/ApiError";
import "./HomePage.css";
import SearchBox from "../../component/SearchBox/SearchBox";

function Homepage() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      <Helmet>
        <title>EasyShop</title>
      </Helmet>

      {/* Hero Section with Carousel */}
      <div className="hero-section mb-5">
        <Carousel>
          <CarouselItem>
            <img
              className="d-block w-100"
              src="../../../images/carousel1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Welcome to EasyShop</h3>
              <p>Find the best products at unbeatable prices.</p>
            </Carousel.Caption>
          </CarouselItem>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../../../images/carousel2.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Shop Now</h3>
              <p>Discover exclusive deals and offers.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../../../images/Carousel3.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Quality You Can Trust</h3>
              <p>Your satisfaction is our priority.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Product Section */}
      <Container className="py-4">
        <h1 className="pb-4 text-center">Our Products</h1>
        <div className="search-box-container mb-5">
          <SearchBox />
        </div>
        {isLoading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">
            {getError(error as unknown as ApiError)}
          </MessageBox>
        ) : (
          <Row>
            {products!.map((product: Product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-4">
                <ProductItem product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}

export default Homepage;
