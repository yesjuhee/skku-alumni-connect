import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/PageHeader";
import StepIndicator from "@/components/StepIndicator";
import { toast } from "sonner";

const departments = [
  "경영학과", "컴퓨터공학과", "법학과", "건축학과", "경제학과",
  "행정학과", "의학과", "전자공학과", "화학공학과", "IMBA",
];
const years = Array.from({ length: 51 }, (_, i) => String(1960 + i));

const STEPS = ["본인확인", "납부확인", "계정설정"];

const RegisterVerify = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", dept: "", year: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [matchFailed, setMatchFailed] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "성명을 입력해주세요";
    if (!form.dept) e.dept = "학과를 선택해주세요";
    if (!form.year) e.year = "학번을 선택해주세요";
    if (!form.phone.trim()) e.phone = "연락처를 입력해주세요";
    else if (!/^010-\d{4}-\d{4}$/.test(form.phone)) e.phone = "010-0000-0000 형식으로 입력해주세요";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    // Mock: name "실패" triggers failure
    if (form.name === "실패") {
      setMatchFailed(true);
      return;
    }
    setMatchFailed(false);
    navigate("/register/payment-check");
  };

  return (
    <div className="page-container animate-fade-in">
      <PageHeader title="본인확인" />
      <StepIndicator steps={STEPS} currentStep={1} />

      <p className="text-muted-foreground mb-6">
        총동창회에 등록된 정보로 본인을 확인합니다
      </p>

      {matchFailed && (
        <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm mb-5">
          등록된 정보와 일치하지 않습니다. 총동창회 사무처(02-760-1290)로 문의해주세요.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>성명</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="이름을 입력하세요"
            className="mt-1.5"
          />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label>학과/학부</Label>
          <Select value={form.dept} onValueChange={(v) => setForm({ ...form, dept: v })}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="학과를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.dept && <p className="text-destructive text-xs mt-1">{errors.dept}</p>}
        </div>

        <div>
          <Label>학번/입학년도</Label>
          <Select value={form.year} onValueChange={(v) => setForm({ ...form, year: v })}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="학번을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.year && <p className="text-destructive text-xs mt-1">{errors.year}</p>}
        </div>

        <div>
          <Label>연락처</Label>
          <Input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="010-0000-0000"
            className="mt-1.5"
          />
          {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
        </div>

        <Button type="submit" className="w-full" size="lg">
          확인
        </Button>
      </form>
    </div>
  );
};

export default RegisterVerify;
