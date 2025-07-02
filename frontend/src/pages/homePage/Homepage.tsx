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
import { useState, useMemo, useContext, useEffect } from "react";
import { Store } from "../../Store";
import HomeSearchBox from "../../component/HomeSearchBox/HomeSearchBox";

function Homepage() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { state: { mode } } = useContext(Store);

  // Animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Debug logging
  console.log("Homepage Debug:", { 
    products: products?.length || 0, 
    isLoading, 
    error: error?.message 
  });

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!products || !searchQuery.trim()) return products || [];
    
    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const featuredProducts = filteredProducts.slice(0, 4) || [];
  const displayProducts = searchQuery.trim() ? filteredProducts : products || [];

  // Get categories for quick filters
  const categories = useMemo(() => {
    if (!products) return [];
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return uniqueCategories.slice(0, 6); // Show first 6 categories
  }, [products]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // @ts-ignore TS6133
  const handleCategoryFilter = (category: string) => {
    setSearchQuery(category);
  };

  // Hero button handlers
  const handleShopCollection = () => {
    // Scroll to products section on the same page
    const productsSection = document.querySelector('.products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShopNow = () => {
    // Clear search and scroll to products section to show all products
    setSearchQuery('');
    setTimeout(() => {
      const productsSection = document.querySelector('.products-section');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleLearnMore = () => {
    // Scroll to features section to show more information about quality
    const featuresSection = document.querySelector('.features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>EasyShop - Premium Home Décor & Vases</title>
        <meta name="description" content="Discover beautiful vases and home décor at EasyShop. Premium quality, modern designs, unbeatable prices." />
      </Helmet>

      {/* Enhanced Hero Section */}
      <div className={`hero-section ${isVisible ? 'fade-in' : ''}`}>
        <Carousel 
          interval={5000} 
          fade 
        >
          <CarouselItem>
            <div className="carousel-image-container">
              <img
                className="d-block w-100 carousel-image"
                src="../../../images/carousel1.jpg"
                alt="Beautiful home décor collection"
              />
              <div className="carousel-overlay"></div>
              <div className="floating-elements">
                <div className="floating-element element-1">✨</div>
                <div className="floating-element element-2">🌸</div>
                <div className="floating-element element-3">💎</div>
              </div>
            </div>
            <Carousel.Caption className="modern-caption">
              <div className="caption-content slide-up">
                <h1 className="hero-title">Transform Your Space</h1>
                <p className="hero-subtitle">Discover our curated collection of premium vases and home décor</p>

                <Button 
                  variant="primary" 
                  size="lg" 
                  className="hero-cta pulse-animation"
                  onClick={handleShopCollection}
                >
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
              <div className="floating-elements">
                <div className="floating-element element-4">💰</div>
                <div className="floating-element element-5">🎯</div>
                <div className="floating-element element-6">⭐</div>
              </div>
            </div>
            <Carousel.Caption className="modern-caption">
              <div className="caption-content slide-up">
                <h1 className="hero-title">Exclusive Deals</h1>
                <p className="hero-subtitle">Up to 40% off on selected premium collections</p>
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="hero-cta pulse-animation"
                  onClick={handleShopNow}
                >
                  <span className="btn-icon">⚡</span>
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
              <div className="floating-elements">
                <div className="floating-element element-7">🏆</div>
                <div className="floating-element element-8">💎</div>
                <div className="floating-element element-9">🌟</div>
              </div>
            </div>
            <Carousel.Caption className="modern-caption">
              <div className="caption-content slide-up">
                <h1 className="hero-title">Crafted with Care</h1>
                <p className="hero-subtitle">Each piece is carefully selected for quality and design excellence</p>
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="hero-cta pulse-animation"
                  onClick={handleLearnMore}
                >
                  Learn More
                </Button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Features Section */}
      <section className={`features-section py-5 ${isVisible ? 'slide-in-up' : ''}`}>
        <Container>
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Why Choose Flourish & Bloom?</h2>
            <p className="section-subtitle">Experience the difference with our premium service</p>
          </div>
          <Row className="text-center">
            <Col md={4} className="mb-4">
              <div className="feature-card hover-lift">
                <div className="feature-icon">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <h4>Free Shipping</h4>
                <p>Free delivery on orders over $50. Fast and reliable shipping nationwide.</p>
                <div className="feature-extra">
                  <span className="feature-badge">📦 2-3 Days</span>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="feature-card hover-lift">
                <div className="feature-icon">
                  <i className="fas fa-award"></i>
                </div>
                <h4>Premium Quality</h4>
                <p>Handpicked items with quality guarantee. Every piece tells a story.</p>
                <div className="feature-extra">
                  <span className="feature-badge">⭐ 5-Star Rated</span>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="feature-card hover-lift">
                <div className="feature-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <h4>24/7 Support</h4>
                <p>Dedicated customer service team ready to help you anytime.</p>
                <div className="feature-extra">
                  <span className="feature-badge">💬 Live Chat</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="categories-section py-5">
          {/* <Container>
            <div className="section-header text-center mb-5">
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-subtitle">Find exactly what you're looking for</p>
            </div>
            <Row>
              {categories.map((category, index) => (
                <Col key={category} md={4} lg={2} className="mb-3">
                  <div 
                    className="category-card"
                    onClick={() => handleCategoryFilter(category)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="category-icon">
                      {category === 'Vases' && '🏺'}
                      {category === 'Decor' && '🏡'}
                      {category === 'Lighting' && '💡'}
                      {category === 'Furniture' && '🪑'}
                      {category === 'Textiles' && '🧶'}
                      {!['Vases', 'Decor', 'Lighting', 'Furniture', 'Textiles'].includes(category) && '✨'}
                    </div>
                    <h5>{category}</h5>
                  </div>
                </Col>
              ))}
            </Row>
          </Container> */}
        </section>
      )}

      {/* Search Section */}
      <section className={`search-section py-4 ${mode === 'light' ? 'bg-light' : ''}`}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 className="search-title mb-4">Find Your Perfect Piece</h2>
              <div className="enhanced-search-box">
                <HomeSearchBox onSearch={handleSearch} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Products Section - only show when not searching */}
      {!isLoading && !error && !searchQuery.trim() && featuredProducts.length > 0 && (
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

      {/* Products Section */}
      <section className="products-section py-5">
        <Container>
          <div className="section-header text-center mb-5">
            <h2 className="section-title">
              {searchQuery.trim() 
                ? `Search Results for "${searchQuery}"` 
                : "Our Complete Collection"
              }
            </h2>
            <p className="section-subtitle">
              {searchQuery.trim() 
                ? `Found ${displayProducts.length} product${displayProducts.length !== 1 ? 's' : ''}`
                : "Browse our entire range of premium home décor"
              }
            </p>
          </div>
          
          {isLoading ? (
            <div className="loading-container">
              <LoadingBox />
            </div>
          ) : error ? (
            <MessageBox variant="danger">
              {getError(error as unknown as ApiError)}
            </MessageBox>
          ) : displayProducts.length === 0 && searchQuery.trim() ? (
            <div className="no-results text-center py-5">
              <i className="fas fa-search fa-3x text-muted mb-3"></i>
              <h4>No products found</h4>
              <p className="text-muted">Try searching with different keywords or browse our complete collection.</p>
              <Button variant="primary" onClick={() => handleSearch('')}>
                Clear Search
              </Button>
            </div>
          ) : (
            <Row>
              {displayProducts.map((product: Product) => (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-4">
                  <ProductItem product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-5">
        <Container>
          <div className="section-header text-center mb-5">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real reviews from real customers</p>
          </div>
          <Row>
            <Col md={4} className="mb-4">
              <div className="testimonial-card">
                <div className="testimonial-rating">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="testimonial-text">
                  "Absolutely love my new vase! The quality is exceptional and it looks perfect in my living room."
                </p>
                <div className="testimonial-author">
                  <strong>Sarah M.</strong>
                  <span>Verified Buyer</span>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="testimonial-card">
                <div className="testimonial-rating">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="testimonial-text">
                  "Fast shipping and excellent customer service. Will definitely shop here again!"
                </p>
                <div className="testimonial-author">
                  <strong>David L.</strong>
                  <span>Verified Buyer</span>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="testimonial-card">
                <div className="testimonial-rating">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="testimonial-text">
                  "The home décor collection is stunning. Each piece is unique and beautifully crafted."
                </p>
                <div className="testimonial-author">
                  <strong>Emma K.</strong>
                  <span>Verified Buyer</span>
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
