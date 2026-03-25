import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import MainPage from "./pages/MainPage";
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
          <Route path="/main" element={<MainPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
