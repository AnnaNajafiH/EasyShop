import { Carousel, CarouselItem, Col, Container, Row, Button, Badge } from "react-bootstrap";
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

  const featuredProducts = products?.slice(0, 4) || [];
  const newArrivals = products?.slice(4, 8) || [];

  return (
    <>
      <Helmet>
        <title>EasyShop - Premium Home Décor & Vases</title>
        <meta name="description" content="Discover beautiful vases and home décor at EasyShop. Premium quality, modern designs, unbeatable prices." />
      </Helmet>

      {/* Enhanced Hero Section */}
      <div className="hero-section">
        <Carousel interval={5000} fade>
          <CarouselItem>
            <div className="carousel-image-container">
              <img
                className="d-block w-100 carousel-image"
                src="../../../images/carousel1.jpg"
                alt="Beautiful home décor collection"
              />
              <div className="carousel-overlay"></div>
            </div>
            <Carousel.Caption className="modern-caption">
              <div className="caption-content">
                <h1 className="hero-title">Transform Your Space</h1>
                <p className="hero-subtitle">Discover our curated collection of premium vases and home décor</p>
                <Button variant="light" size="lg" className="hero-cta">
                  Shop Collection
                </Button>
              </div>
            </Carousel.Caption>
          </CarouselItem>
          <Carousel.Item>
            <div className="carousel-image-container">
              <img
                className="d-block w-100 carousel-image"
                src="../../../images/carousel2.jpg"
                alt="Exclusive deals and offers"
              />
              <div className="carousel-overlay"></div>
            </div>
            <Carousel.Caption className="modern-caption">
              <div className="caption-content">
                <h1 className="hero-title">Exclusive Deals</h1>
                <p className="hero-subtitle">Up to 40% off on selected premium collections</p>
                <Button variant="warning" size="lg" className="hero-cta">
                  Shop Now
                </Button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-image-container">
              <img
                className="d-block w-100 carousel-image"
                src="../../../images/Carousel3.jpg"
                alt="Quality you can trust"
              />
              <div className="carousel-overlay"></div>
            </div>
            <Carousel.Caption className="modern-caption">
              <div className="caption-content">
                <h1 className="hero-title">Crafted with Care</h1>
                <p className="hero-subtitle">Each piece is carefully selected for quality and design excellence</p>
                <Button variant="success" size="lg" className="hero-cta">
                  Learn More
                </Button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <Row className="text-center">
            <Col md={4} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <h4>Free Shipping</h4>
                <p>Free delivery on orders over $50</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-award"></i>
                </div>
                <h4>Premium Quality</h4>
                <p>Handpicked items with quality guarantee</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <h4>24/7 Support</h4>
                <p>Dedicated customer service team</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Search Section */}
      <section className="search-section py-4 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 className="search-title mb-4">Find Your Perfect Piece</h2>
              <div className="enhanced-search-box">
                <SearchBox />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Products Section */}
      {!isLoading && !error && featuredProducts.length > 0 && (
        <section className="featured-section py-5">
          <Container>
            <div className="section-header text-center mb-5">
              <Badge bg="primary" className="section-badge">Featured</Badge>
              <h2 className="section-title">Trending Now</h2>
              <p className="section-subtitle">Discover our most popular pieces</p>
            </div>
            <Row>
              {featuredProducts.map((product: Product) => (
                <Col key={product.slug} sm={6} lg={3} className="mb-4">
                  <ProductItem product={product} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* All Products Section */}
      <section className="products-section py-5">
        <Container>
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Our Complete Collection</h2>
            <p className="section-subtitle">Browse our entire range of premium home décor</p>
          </div>
          
          {isLoading ? (
            <div className="loading-container">
              <LoadingBox />
            </div>
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
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section py-5 bg-dark text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h3>Stay Updated</h3>
              <p>Get the latest updates on new arrivals and exclusive offers.</p>
            </Col>
            <Col lg={6}>
              <div className="newsletter-form">
                <div className="input-group">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter your email address"
                  />
                  <Button variant="primary">Subscribe</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Homepage;
