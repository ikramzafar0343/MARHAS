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

export const routes = {
  landing: {
    component: LandingPage,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, params) => navigate(v, params),
      onProfileClick: () => navigate('login'),
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
      onProfileClick: () => navigate('login'),
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
      onProfileClick: () => navigate('login'),
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
      onProfileClick: () => navigate('login'),
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
      onLogin: () => navigate('landing'),
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
      onProfileClick: () => navigate('login'),
      onBackToHome: () => navigate('home'),
      onCartClick: () => navigate('bag'),
    }),
  },
  bag: {
    component: BagPage,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
      onProfileClick: () => navigate('login'),
      onCheckout: () => navigate('checkout'),
    }),
  },
  checkout: {
    component: CheckoutPage,
    makeProps: (navigate, view) => ({
      currentRoute: view,
      onNavigate: (v, p) => navigate(v, p),
      onProfileClick: () => navigate('login'),
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
      onProfileClick: () => navigate('login'),
      onWishlistClick: () => navigate('wishlist'),
      onCartClick: () => navigate('bag'),
      onContinue: () => navigate('productListing'),
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
