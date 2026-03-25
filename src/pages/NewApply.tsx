import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/PageHeader";
import StepIndicator from "@/components/StepIndicator";

const departments = [
  "경영학과", "컴퓨터공학과", "법학과", "건축학과", "경제학과",
  "행정학과", "의학과", "전자공학과", "화학공학과", "IMBA",
];
const years = Array.from({ length: 51 }, (_, i) => String(1960 + i));

const positionFees: Record<string, string> = {
  부회장: "100만원",
  감사: "100만원",
  자문위원: "30만원",
  상임이사: "30만원",
  이사: "10만원",
};

const STEPS = ["정보입력", "신청완료"];

const NewApply = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", dept: "", year: "", phone: "", email: "", position: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "성명을 입력해주세요";
    if (!form.dept) e.dept = "학과를 선택해주세요";
    if (!form.year) e.year = "학번을 선택해주세요";
    if (!form.phone.trim()) e.phone = "연락처를 입력해주세요";
    else if (!/^010-\d{4}-\d{4}$/.test(form.phone)) e.phone = "010-0000-0000 형식으로 입력해주세요";
    if (!form.email.trim()) e.email = "이메일을 입력해주세요";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "올바른 이메일 형식이 아닙니다";
    if (!form.position) e.position = "희망 직급을 선택해주세요";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    navigate("/register/new-apply/complete", { state: form });
  };

  return (
    <div className="page-container animate-fade-in">
      <PageHeader title="신규 임원 신청" />
      <StepIndicator steps={STEPS} currentStep={1} />

      <p className="text-sm text-muted-foreground mb-6">
        총동창회 임원으로 새롭게 참여를 신청합니다. 신청 후 총동창회 사무처의 승인이 필요합니다.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>성명</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="이름을 입력하세요" className="mt-1.5" />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label>학과/학부</Label>
          <Select value={form.dept} onValueChange={(v) => setForm({ ...form, dept: v })}>
            <SelectTrigger className="mt-1.5"><SelectValue placeholder="학과를 선택하세요" /></SelectTrigger>
            <SelectContent>
              {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.dept && <p className="text-destructive text-xs mt-1">{errors.dept}</p>}
        </div>

        <div>
          <Label>학번/입학년도</Label>
          <Select value={form.year} onValueChange={(v) => setForm({ ...form, year: v })}>
            <SelectTrigger className="mt-1.5"><SelectValue placeholder="학번을 선택하세요" /></SelectTrigger>
            <SelectContent>
              {years.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.year && <p className="text-destructive text-xs mt-1">{errors.year}</p>}
        </div>

        <div>
          <Label>연락처</Label>
          <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="010-0000-0000" className="mt-1.5" />
          {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <Label>이메일</Label>
          <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" className="mt-1.5" />
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label>희망 직급</Label>
          <Select value={form.position} onValueChange={(v) => setForm({ ...form, position: v })}>
            <SelectTrigger className="mt-1.5"><SelectValue placeholder="직급을 선택하세요" /></SelectTrigger>
            <SelectContent>
              {Object.keys(positionFees).map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.position && <p className="text-destructive text-xs mt-1">{errors.position}</p>}
          {form.position && (
            <p className="text-sm text-primary font-medium mt-1.5">
              기여금: {positionFees[form.position]}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" size="lg">
          신청하기
        </Button>
      </form>
    </div>
  );
};

export default NewApply;
