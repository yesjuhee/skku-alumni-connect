import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import RegisterType from "./pages/RegisterType";
import RegisterVerify from "./pages/RegisterVerify";
import PaymentCheck from "./pages/PaymentCheck";
import RegisterSetup from "./pages/RegisterSetup";
import NewApply from "./pages/NewApply";
import NewApplyComplete from "./pages/NewApplyComplete";
import MainLayout from "./components/MainLayout";
import AboutPage from "./pages/AboutPage";
import MembersPage from "./pages/MembersPage";
import MemberDetailPage from "./pages/MemberDetailPage";
import NewsPage from "./pages/NewsPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import CommunityPage from "./pages/CommunityPage";
import CommunityDetailPage from "./pages/CommunityDetailPage";
import MyPage from "./pages/MyPage";
import IDCardPage from "./pages/IDCardPage";
import BenefitsPage from "./pages/BenefitsPage";
import PlaceholderTab from "./pages/PlaceholderTab";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/type" element={<RegisterType />} />
          <Route path="/register/verify" element={<RegisterVerify />} />
          <Route path="/register/payment-check" element={<PaymentCheck />} />
          <Route path="/register/setup" element={<RegisterSetup />} />
          <Route path="/register/new-apply" element={<NewApply />} />
          <Route path="/register/new-apply/complete" element={<NewApplyComplete />} />
          <Route path="/main" element={<MainLayout />}>
            <Route index element={<Navigate to="/main/about" replace />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="members" element={<MembersPage />} />
            <Route path="members/:id" element={<MemberDetailPage />} />
            <Route path="news" element={<PlaceholderTab />} />
            <Route path="community" element={<PlaceholderTab />} />
            <Route path="business" element={<PlaceholderTab />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="id-card" element={<IDCardPage />} />
            <Route path="benefits" element={<BenefitsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
