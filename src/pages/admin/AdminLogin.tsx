import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = () => {
    if (!id.trim() || !pw.trim()) {
      toast.error("아이디와 비밀번호를 입력해주세요");
      return;
    }
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">관리자 로그인</CardTitle>
          <p className="text-sm text-muted-foreground">총동창회 사무처 관리 시스템</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} />
          <Input type="password" placeholder="비밀번호" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
          <Button className="w-full" onClick={handleLogin}>로그인</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
