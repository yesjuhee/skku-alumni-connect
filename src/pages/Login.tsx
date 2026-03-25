import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/PageHeader";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.id.trim()) e.id = "아이디를 입력해주세요";
    if (!form.password.trim()) e.password = "비밀번호를 입력해주세요";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    toast.success("로그인 성공");
    navigate("/main");
  };

  return (
    <div className="page-container animate-fade-in">
      <PageHeader title="로그인" />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="id">아이디</Label>
          <Input
            id="id"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
            placeholder="아이디를 입력하세요"
            className="mt-1.5"
          />
          {errors.id && <p className="text-destructive text-xs mt-1">{errors.id}</p>}
        </div>
        <div>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="비밀번호를 입력하세요"
            className="mt-1.5"
          />
          {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
        </div>

        <Button type="submit" className="w-full" size="lg">
          로그인
        </Button>
      </form>

      <div className="mt-6 text-center space-y-2">
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          아이디/비밀번호를 잊으셨나요?
        </button>
        <div>
          <button
            onClick={() => navigate("/register/type")}
            className="text-sm text-primary font-medium hover:underline"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
