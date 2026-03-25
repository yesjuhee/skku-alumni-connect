import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/PageHeader";
import StepIndicator from "@/components/StepIndicator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

const STEPS = ["본인확인", "납부확인", "계정설정"];

const RegisterSetup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: "", password: "", passwordConfirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.id.trim()) e.id = "아이디를 입력해주세요";
    else if (!/^[a-zA-Z0-9]{6,20}$/.test(form.id))
      e.id = "6~20자의 영문/숫자만 가능합니다";

    if (!form.password) e.password = "비밀번호를 입력해주세요";
    else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/.test(form.password))
      e.password = "8자 이상 영문+숫자+특수문자를 포함해주세요";

    if (!form.passwordConfirm) e.passwordConfirm = "비밀번호 확인을 입력해주세요";
    else if (form.password !== form.passwordConfirm)
      e.passwordConfirm = "비밀번호가 일치하지 않습니다";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setShowModal(true);
  };

  const passwordMatch =
    form.password && form.passwordConfirm && form.password === form.passwordConfirm;

  return (
    <div className="page-container animate-fade-in">
      <PageHeader title="계정 설정" />
      <StepIndicator steps={STEPS} currentStep={3} />

      <p className="text-muted-foreground mb-6">
        로그인에 사용할 계정을 설정해주세요
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>아이디</Label>
          <Input
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
            placeholder="6~20자 영문/숫자"
            className="mt-1.5"
          />
          {errors.id && <p className="text-destructive text-xs mt-1">{errors.id}</p>}
        </div>

        <div>
          <Label>비밀번호</Label>
          <Input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="8자 이상 영문+숫자+특수문자"
            className="mt-1.5"
          />
          {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
        </div>

        <div>
          <Label>비밀번호 확인</Label>
          <Input
            type="password"
            value={form.passwordConfirm}
            onChange={(e) => setForm({ ...form, passwordConfirm: e.target.value })}
            placeholder="비밀번호를 다시 입력하세요"
            className="mt-1.5"
          />
          {errors.passwordConfirm && (
            <p className="text-destructive text-xs mt-1">{errors.passwordConfirm}</p>
          )}
          {passwordMatch && (
            <p className="text-xs mt-1 text-primary font-medium">✓ 비밀번호가 일치합니다</p>
          )}
        </div>

        <Button type="submit" className="w-full" size="lg">
          가입 완료
        </Button>
      </form>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-xs text-center">
          <DialogHeader>
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-primary" />
              </div>
            </div>
            <DialogTitle className="text-lg">가입이 완료되었습니다</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            로그인 페이지에서 로그인해주세요
          </p>
          <DialogFooter className="sm:justify-center mt-2">
            <Button onClick={() => navigate("/login")} className="w-full">
              로그인하러 가기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterSetup;
