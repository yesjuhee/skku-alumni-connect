import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import StepIndicator from "@/components/StepIndicator";
import { CheckCircle } from "lucide-react";

const STEPS = ["정보입력", "신청완료"];

const NewApplyComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = (location.state as Record<string, string>) || {
    name: "홍길동", dept: "경영학과", year: "2000", position: "이사",
  };

  return (
    <div className="page-container animate-fade-in">
      <PageHeader title="신규 임원 신청" showBack={false} />
      <StepIndicator steps={STEPS} currentStep={2} />

      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-lg font-bold text-foreground mb-2">
          임원 신청이 접수되었습니다
        </h2>
        <p className="text-sm text-muted-foreground">
          총동창회 사무처에서 확인 후 연락드리겠습니다.
          <br />승인 완료 후 기여금 납부 안내를 받으실 수 있습니다.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-5 space-y-3 mb-8">
        <h3 className="font-semibold text-foreground text-sm mb-2">접수 정보</h3>
        {[
          ["이름", data.name],
          ["학과", data.dept],
          ["학번", data.year],
          ["희망 직급", data.position],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium text-foreground">{value}</span>
          </div>
        ))}
      </div>

      <Button onClick={() => navigate("/")} className="w-full" size="lg">
        홈으로 돌아가기
      </Button>
    </div>
  );
};

export default NewApplyComplete;
