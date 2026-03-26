import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Upload,
  FileText,
  CreditCard,
  Newspaper,
  MessageSquare,
  LogOut,
} from "lucide-react";

const menuItems = [
  { label: "대시보드", icon: LayoutDashboard, path: "/admin" },
  { label: "회원 관리", icon: Users, path: "/admin/members" },
  { label: "엑셀 업로드", icon: Upload, path: "/admin/upload" },
  { label: "신규 신청 관리", icon: FileText, path: "/admin/applications" },
  { label: "기여금 관리", icon: CreditCard, path: "/admin/payments" },
  { label: "공지/뉴스 관리", icon: Newspaper, path: "/admin/news" },

  { label: "커뮤니티 관리", icon: MessageSquare, path: "/admin/community" },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="w-60 bg-card border-r border-border flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="p-4 border-b border-border">
          <h1 className="font-bold text-foreground text-lg">총동창회 관리자</h1>
          <p className="text-xs text-muted-foreground">사무처 관리 시스템</p>
        </div>

        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive(item.path)
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-border">
          <button
            onClick={() => navigate("/admin/login")}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
