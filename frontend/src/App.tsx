
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/homePage/Homepage";
import Layout from "./component/Layot/Layout";
import { Container } from "react-bootstrap";
import ProductPage from "./pages/productPage/ProductPage";
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';  
import CartPage from "./pages/cartPage/CartPage";
import SigninPage from "./pages/signinPage/SigninPage";
import SignupPage from "./pages/signupPage/SignupPage";
import ShippingAddressPage from "./pages/shippingAddressPage/ShippingAddressPage";
import PaymentMethodPage from "./pages/paymentMethodPage/PaymentMethodPage";
import ProtectedRoute from "./component/protectedRoute/ProtectedRoute";
import PlaceHolderPage from "./pages/placeOrderPage/PlaceOrderPage";
import OrderPage from "./pages/orderPage/OrderPage";
import OrderHistoryPage from "./pages/orderHistoryPage/OrderHistoryPage";




function App() {
 
  return (
    <Layout>
      <ToastContainer position='bottom-center' limit={1}/>
        <Container>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/signin" element={<SigninPage/>} />
            <Route path="/signup" element={<SignupPage/>} />

            <Route path="/" element={<ProtectedRoute/>}>
              <Route path="signin/shipping" element={<ShippingAddressPage/>} />
              <Route path="/payment" element={<PaymentMethodPage/>} />
              <Route path="/placeorder" element={<PlaceHolderPage/>} />
              <Route path="/order/:id" element={<OrderPage/>} />
              <Route path="/orderhistory" element={<OrderHistoryPage/>} />
              
            </Route>
          </Routes>
        </Container>
      </Layout>
  )
}

export default App;
