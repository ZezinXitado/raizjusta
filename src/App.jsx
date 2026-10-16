import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import { AppProvider } from '@/lib/AppContext';
import Layout from '@/components/Layout';
import RaizinhoCompanion from "@/components/RaizinhoCompanion";
// Add page imports here
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Producers from '@/pages/Producers';
import Producer from '@/pages/Producer';
import MapPage from '@/pages/MapPage';
import Impact from '@/pages/Impact';
import Profile from '@/pages/Profile';
import Cart from '@/pages/Cart';
import Orders from '@/pages/Orders';
import Dashboard from '@/pages/Dashboard';
import Educational from '@/pages/Educational';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import Passport from '@/pages/Passport';
import ProducerDashboard from '@/pages/ProducerDashboard';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <AppProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/produtos/:id" element={<ProductDetail />} />
          <Route path="/produtores" element={<Producers />} />
          <Route path="/produtores/:id" element={<Producer />} />
          <Route path="/mapa" element={<MapPage />} />
          <Route path="/impacto" element={<Impact />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/pedidos" element={<Orders />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/educacao" element={<Educational />} />
          <Route path="/painel-produtor" element={<ProducerDashboard />} />
          <Route path="/passaporte/:id" element={<Passport />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <RaizinhoCompanion />
    </AppProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App