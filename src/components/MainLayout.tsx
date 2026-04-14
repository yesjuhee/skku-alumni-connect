import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Home, Users, Newspaper, MessageSquare, Briefcase, User, LogOut, Settings, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import skkuLogo from "@/assets/skku-alumni-logo.png";

const tabs = [
  { id: "home", label: "홈", icon: Home, path: "/main/home" },
  { id: "members", label: "임원정보", icon: Users, path: "/main/members" },
  { id: "news", label: "공지/뉴스", icon: Newspaper, path: "/main/news" },
  { id: "community", label: "커뮤니티", icon: MessageSquare, path: "/main/community" },
];

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = tabs.find((t) => location.pathname.startsWith(t.path))?.id || "home";

  const handleTabClick = (tab: typeof tabs[0]) => {
    navigate(tab.path);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top header - always visible */}
      <header className="bg-card border-b border-border sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <img src={skkuLogo} alt="성균관대학교 총동창회" className="h-8 object-contain" />

          {/* PC tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-muted transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden md:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate("/main/mypage")}>
                <User className="w-4 h-4 mr-2" />
                내정보 조회·수정
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/main/settings")}>
                <Settings className="w-4 h-4 mr-2" />
                앱 설정
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pb-20 md:pb-6">
        <Outlet />
      </main>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-30">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 px-1 transition-colors ${
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium leading-tight text-center">
                {tab.label.length > 5 ? tab.label.slice(0, 5) + "…" : tab.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;
