import LandingPage from './components/LandingPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import CreateAccount from './components/CreateAccount.jsx'
import WishlistPage from './components/WishlistPage.jsx'
import BagPage from './components/BagPage.jsx'
import HomePage from './components/HomePage.jsx'
import ProductListingPage from './components/ProductListingPage.jsx'
import ProductDetailPage from './components/ProductDetailPage.jsx'
import CheckoutPage from './components/CheckoutPage.jsx'
import ConfirmationPage from './components/ConfirmationPage.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'
import SearchResultsPage from './components/SearchResultsPage.jsx'
import SellerDashboard from './components/SellerDashboard.jsx'
import CustomerDetails from './components/CustomerDetails.jsx'
import ManageInventory from './components/ManageInventory.jsx'
import StoreSetting from './components/StoreSetting.jsx'
import Orders from './components/Orders.jsx'
import Shipment from './components/Shipment.jsx'
import ShipmentDetail from './components/ShipmentDetail.jsx'
import PlatformPartner from './components/PlatformPartner.jsx'
import PartnerDetail from './components/PartnerDetail.jsx'
import Feedback from './components/Feedback.jsx'
import HelpSupport from './components/HelpSupport.jsx'
import AddNewProduct from './components/AddNewProduct.jsx'
import OrderDetail from './components/OrderDetail.jsx'
const profileHandler = (navigate) => () => {
  try { const user = JSON.parse(localStorage.getItem('auth_user_v1') || 'null'); if (user) { navigate('sellerDashboard'); return } } catch {}
  navigate('login')
}

export const routes = {
  landing: {
    component: LandingPage,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, params) => navigate(v, params),
      onProfileClick: profileHandler(navigate),
      onWishlistClick: () => navigate('wishlist'),
      onCartClick: () => navigate('bag'),
    }),
  },
  home: {
    component: HomePage,
    makeProps: (navigate, view, params) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
      initialGender: params?.gender,
      initialSection: params?.section,
      onViewAll: (slug) => navigate('productListing', { cat: slug }),
      onProfileClick: profileHandler(navigate),
      onWishlistClick: () => navigate('wishlist'),
      onCartClick: () => navigate('bag'),
    }),
  },
  productListing: {
    component: ProductListingPage,
    makeProps: (navigate, view, params) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
      initialCat: params?.cat,
      initialGender: params?.gender,
      initialSale: params?.sale,
      onProfileClick: () => navigate('login'),
      onCartClick: () => navigate('bag'),
      onBackToHome: () => navigate('home'),
      onWishlistClick: () => navigate('wishlist'),
      onViewProduct: (product) => {
        try { sessionStorage.setItem('selected_product_v1', JSON.stringify(product)) } catch {}
        const slug = String(product?.title || '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
        navigate('productDetail', { id: slug })
      },
    }),
  },
  productDetail: {
    component: ProductDetailPage,
    makeProps: (navigate, view, params) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
      id: params?.id,
      onProfileClick: profileHandler(navigate),
      onWishlistClick: () => navigate('wishlist'),
      onCartClick: () => navigate('bag'),
      onViewProduct: (product) => {
        try { sessionStorage.setItem('selected_product_v1', JSON.stringify(product)) } catch {}
        const slug = String(product?.title || '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
        navigate('productDetail', { id: slug })
      },
    }),
  },
  search: {
    component: SearchResultsPage,
    makeProps: (navigate, view, params) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
      q: params?.q,
      cat: params?.cat,
      gender: params?.gender,
      onProfileClick: profileHandler(navigate),
      onWishlistClick: () => navigate('wishlist'),
      onCartClick: () => navigate('bag'),
      onBackToListing: () => navigate('productListing'),
      onViewProduct: (product) => {
        try { sessionStorage.setItem('selected_product_v1', JSON.stringify(product)) } catch {}
        const slug = String(product?.title || '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
        navigate('productDetail', { id: slug })
      },
    }),
  },
  login: {
    component: LoginPage,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
      onLogin: () => navigate('sellerDashboard'),
      onCreateAccount: () => navigate('create'),
    }),
  },
  create: {
    component: CreateAccount,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
      onCreated: () => navigate('landing'),
      onBackToLogin: () => navigate('login'),
    }),
  },
  wishlist: {
    component: WishlistPage,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
      onProfileClick: profileHandler(navigate),
      onBackToHome: () => navigate('home'),
      onCartClick: () => navigate('bag'),
    }),
  },
  bag: {
    component: BagPage,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
      onProfileClick: profileHandler(navigate),
      onCheckout: () => navigate('checkout'),
    }),
  },
  checkout: {
    component: CheckoutPage,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
      onProfileClick: profileHandler(navigate),
      onWishlistClick: () => navigate('wishlist'),
      onCartClick: () => navigate('bag'),
      onOrderComplete: () => navigate('confirmation'),
    }),
  },
  confirmation: {
    component: ConfirmationPage,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
      onProfileClick: profileHandler(navigate),
      onWishlistClick: () => navigate('wishlist'),
      onCartClick: () => navigate('bag'),
      onContinue: () => navigate('productListing'),
    }),
  },
  sellerDashboard: {
    component: SellerDashboard,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
    }),
  },
  customerDetails: {
    component: CustomerDetails,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
    }),
  },
  manageInventory: {
    component: ManageInventory,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
    }),
  },
  storeSetting: {
    component: StoreSetting,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
    }),
  },
  orders: {
    component: Orders,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
    }),
  },
  orderDetail: {
    component: OrderDetail,
    makeProps: (navigate, view, params) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
      id: params?.id,
    }),
  },
  shipment: {
    component: Shipment,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
    }),
  },
  shipmentDetail: {
    component: ShipmentDetail,
    makeProps: (navigate, view, params) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
      id: params?.id,
    }),
  },
  platformPartner: {
    component: PlatformPartner,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
    }),
  },
  partnerDetail: {
    component: PartnerDetail,
    makeProps: (navigate, view, params) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
      id: params?.id,
    }),
  },
  feedback: {
    component: Feedback,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
    }),
  },
  helpSupport: {
    component: HelpSupport,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
    }),
  },
  addProduct: {
    component: AddNewProduct,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
    }),
  },
  notFound: {
    component: NotFoundPage,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
      onBack: () => navigate('landing'),
    }),
  },
}
