import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import ShopLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import Home from "./pages/shopping-view/home";
import ProductsListing from "./pages/shopping-view/listing";
import Account from "./pages/shopping-view/account";
import Cart from "./pages/shopping-view/cart";
import Checkout from "./pages/shopping-view/checkout";
import CheckAuth from "./components/common/check-auth";
import UnAuthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { check_auth } from "./store/auth-slice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const { isAuthenticated, userInfo, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(check_auth());
  }, [dispatch]);

  if (isLoading) return <Skeleton count={5} />;

  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        <Routes>
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} userInfo={userInfo}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>

          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} userInfo={userInfo}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>

          <Route
            path="/shop"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} userInfo={userInfo}>
                <ShopLayout />
              </CheckAuth>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="listing" element={<ProductsListing />} />
            <Route path="account" element={<Account />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>

          <Route path="*" element={<NotFound />} />
          <Route path="/unauth-page" element={<UnAuthPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
