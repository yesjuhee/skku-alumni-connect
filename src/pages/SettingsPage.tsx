import { useState } from "react";
import { Phone, Mail, FileText, Shield, Info, Code2, UserMinus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WithdrawDialog from "@/components/WithdrawDialog";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
      <h2 className="text-xl font-bold text-foreground mb-6">앱 설정</h2>

      {/* 문의하기 */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">문의하기</h3>
        <div className="space-y-2">
          <a
            href="tel:02-760-1290"
            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">총동창회 사무처</p>
              <p className="text-xs text-muted-foreground mt-0.5">02-760-1290</p>
            </div>
          </a>
          <a
            href="mailto:contact@scg.co.kr"
            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">개발사(SCG) 이메일</p>
              <p className="text-xs text-muted-foreground mt-0.5">contact@scg.co.kr</p>
            </div>
          </a>
        </div>
      </section>

      {/* 정보 */}
      <section>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">정보</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all text-left">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">이용약관</span>
          </button>
          <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all text-left">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">개인정보처리방침</span>
          </button>
          <button
            onClick={() => navigate("/main/licenses")}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">오픈소스 라이선스</span>
          </button>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">앱 버전</p>
            </div>
            <span className="text-sm text-muted-foreground">v1.0.0</span>
          </div>
        </div>
      </section>

      {/* 계정 */}
      <section className="mt-8">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">계정</h3>
        <button
          onClick={() => setWithdrawOpen(true)}
          className="w-full flex items-center gap-4 p-4 rounded-xl bg-card border border-destructive/30 hover:bg-destructive/5 transition-all text-left"
        >
          <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
            <UserMinus className="w-5 h-5 text-destructive" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-destructive">회원 탈퇴</p>
            <p className="text-xs text-muted-foreground mt-0.5">탈퇴 시 게시물과 프로필이 모두 삭제됩니다</p>
          </div>
        </button>
      </section>

      <WithdrawDialog open={withdrawOpen} onOpenChange={setWithdrawOpen} />
    </div>
  );
};

export default SettingsPage;
