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
import BusinessPage from "./pages/BusinessPage";
import MyPage from "./pages/MyPage";
import IDCardPage from "./pages/IDCardPage";
import BenefitsPage from "./pages/BenefitsPage";
import PlaceholderTab from "./pages/PlaceholderTab";
import AdminLayout from "./components/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMembers from "./pages/admin/AdminMembers";
import AdminUpload from "./pages/admin/AdminUpload";
import AdminPlaceholder from "./pages/admin/AdminPlaceholder";
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
            <Route path="news" element={<NewsPage />} />
            <Route path="news/:id" element={<NewsDetailPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="community/club/:id" element={<CommunityDetailPage />} />
            <Route path="community/research/:id" element={<CommunityDetailPage />} />
            <Route path="business" element={<BusinessPage />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="id-card" element={<IDCardPage />} />
            <Route path="benefits" element={<BenefitsPage />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="upload" element={<AdminUpload />} />
            <Route path="applications" element={<AdminPlaceholder title="신규 신청 관리" />} />
            <Route path="payments" element={<AdminPlaceholder title="기여금 관리" />} />
            <Route path="news" element={<AdminPlaceholder title="공지/뉴스 관리" />} />
            <Route path="community" element={<AdminPlaceholder title="커뮤니티 관리" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
