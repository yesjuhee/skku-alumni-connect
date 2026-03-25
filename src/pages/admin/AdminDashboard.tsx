import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, CreditCard, AlertCircle, FileText } from "lucide-react";

const stats = [
  { label: "전체 회원 수", value: "156명", icon: Users, color: "text-primary" },
  { label: "기여금 납부 완료", value: "98명", icon: CreditCard, color: "text-green-600" },
  { label: "미납부 회원", value: "58명", icon: AlertCircle, color: "text-orange-500" },
  { label: "신규 신청 대기", value: "3건", icon: FileText, color: "text-blue-500" },
];

const recentApplications = [
  { name: "이수현", department: "경영학과", year: 2005, position: "이사", date: "2026.03.22" },
  { name: "박지훈", department: "법학과", year: 1998, position: "상임이사", date: "2026.03.20" },
  { name: "김하늘", department: "컴퓨터공학과", year: 2012, position: "이사", date: "2026.03.18" },
];

const recentPayments = [
  { name: "조창식", position: "부회장", amount: "100만원", date: "2026.03.21", status: "완료" },
  { name: "이정민", position: "부회장", amount: "100만원", date: "2026.03.20", status: "완료" },
  { name: "최동우", position: "상임이사", amount: "30만원", date: "2026.03.19", status: "완료" },
  { name: "김영수", position: "상임이사", amount: "30만원", date: "2026.03.18", status: "완료" },
  { name: "강태준", position: "감사", amount: "100만원", date: "2026.03.17", status: "완료" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-6xl">
      <h1 className="text-2xl font-bold text-foreground">대시보드</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent applications */}
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">최근 신규 신청</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/applications")}>전체보기</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>학과</TableHead>
                <TableHead>학번</TableHead>
                <TableHead>희망 직급</TableHead>
                <TableHead>신청일</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentApplications.map((a) => (
                <TableRow key={a.name}>
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell>{a.department}</TableCell>
                  <TableCell>{a.year}</TableCell>
                  <TableCell>{a.position}</TableCell>
                  <TableCell>{a.date}</TableCell>
                  <TableCell><Badge variant="outline" className="text-orange-600 border-orange-300">대기</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent payments */}
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">최근 기여금 납부</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/payments")}>전체보기</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>직급</TableHead>
                <TableHead>납부 금액</TableHead>
                <TableHead>납부일</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPayments.map((p, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.position}</TableCell>
                  <TableCell>{p.amount}</TableCell>
                  <TableCell>{p.date}</TableCell>
                  <TableCell><Badge className="bg-green-100 text-green-700 border-green-300">완료</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
