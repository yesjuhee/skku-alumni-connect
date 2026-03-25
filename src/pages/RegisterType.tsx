import { useNavigate } from "react-router-dom";
import { UserCheck, UserPlus } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const options = [
  {
    icon: UserCheck,
    title: "임원 명단에 등록된 회원",
    subtitle: "총동창회에서 임원으로 선정된 분",
    to: "/register/verify",
  },
  {
    icon: UserPlus,
    title: "신규 임원 신청",
    subtitle: "새롭게 임원으로 참여하고 싶은 동문",
    to: "/register/new-apply",
  },
];

const RegisterType = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container animate-fade-in">
      <PageHeader title="회원가입" />
      <p className="text-muted-foreground mb-6">가입 유형을 선택해주세요</p>

      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt.to}
            onClick={() => navigate(opt.to)}
            className="w-full flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary hover:shadow-md transition-all text-left"
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <opt.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{opt.title}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{opt.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RegisterType;
