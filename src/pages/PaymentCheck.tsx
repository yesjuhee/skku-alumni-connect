import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import PageHeader from "@/components/PageHeader";
import StepIndicator from "@/components/StepIndicator";
import { toast } from "sonner";
import { CheckCircle, AlertCircle, ExternalLink } from "lucide-react";

const STEPS = ["본인확인", "납부확인", "계정설정"];

const feeTable = [
  { position: "회장", fee: "5,000만원 이상" },
  { position: "부회장", fee: "100만원" },
  { position: "감사", fee: "100만원" },
  { position: "자문위원", fee: "30만원" },
  { position: "상임이사", fee: "30만원" },
  { position: "이사", fee: "10만원" },
  { position: "고문", fee: "자율" },
];

const PaymentCheck = () => {
  const navigate = useNavigate();
  const [isPaid, setIsPaid] = useState(true);

  return (
    <div className="page-container animate-fade-in">
      <PageHeader title="납부확인" />
      <StepIndicator steps={STEPS} currentStep={2} />

      {/* Dev toggle */}
      <div className="flex items-center justify-end gap-2 mb-6 text-xs text-muted-foreground">
        <span>Mock: 납부 완료</span>
        <Switch checked={isPaid} onCheckedChange={setIsPaid} />
      </div>

      {isPaid ? (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">
            기여금 납부가 확인되었습니다
          </h2>
          <div className="bg-card border border-border rounded-xl p-5 mt-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">직급</span>
              <span className="font-medium text-foreground">이사</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">납부금액</span>
              <span className="font-medium text-foreground">10만원</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">납부일</span>
              <span className="font-medium text-foreground">2025-01-15</span>
            </div>
          </div>
          <Button onClick={() => navigate("/register/setup")} className="w-full mt-6" size="lg">
            다음
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-1">
            기여금 납부가 확인되지 않았습니다
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            임원수첩 앱은 기여금 납부자만 이용할 수 있습니다
          </p>

          <div className="bg-card border border-border rounded-xl overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="py-2.5 px-4 text-left font-semibold text-foreground">직급</th>
                  <th className="py-2.5 px-4 text-right font-semibold text-foreground">기여금</th>
                </tr>
              </thead>
              <tbody>
                {feeTable.map((row) => (
                  <tr key={row.position} className="border-b border-border last:border-0">
                    <td className="py-2.5 px-4 text-foreground">{row.position}</td>
                    <td className="py-2.5 px-4 text-right text-foreground">{row.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Button
            asChild
            className="w-full mb-3"
            size="lg"
          >
            <a
              href="https://www.ihappynanum.com/Nanum/B/LQVFZCWYCZ"
              target="_blank"
              rel="noopener noreferrer"
            >
              기여금 납부하기 <ExternalLink className="w-4 h-4 ml-1.5" />
            </a>
          </Button>

          <p className="text-xs text-muted-foreground mb-4">
            납부 후 승인까지 1~2 영업일이 소요됩니다.
            <br />문의: 총동창회 사무처 02-760-1290
          </p>

          <Button
            variant="outline"
            className="w-full"
            size="lg"
            onClick={() => toast.info("관리자 확인 후 이용 가능합니다")}
          >
            납부 완료 후 돌아오기
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentCheck;
