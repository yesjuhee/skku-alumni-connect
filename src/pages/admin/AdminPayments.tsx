import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PayStatus = "확인대기" | "확인완료" | "미납부";

interface Payment {
  id: number;
  name: string;
  position: string;
  generation: string;
  amount: string;
  method: string;
  date: string;
  status: PayStatus;
}

const initialPayments: Payment[] = [
  { id: 1, name: "조창식", position: "부회장", generation: "40대", amount: "100만원", method: "카드결제", date: "2026.03.20", status: "확인대기" },
  { id: 2, name: "김영수", position: "상임이사", generation: "40대", amount: "30만원", method: "무통장입금", date: "2026.03.18", status: "확인대기" },
  { id: 3, name: "이정민", position: "부회장", generation: "40대", amount: "100만원", method: "카드결제", date: "2026.03.15", status: "확인완료" },
  { id: 4, name: "최동우", position: "상임이사", generation: "40대", amount: "30만원", method: "카드결제", date: "2026.03.12", status: "확인완료" },
  { id: 5, name: "박서연", position: "이사", generation: "40대", amount: "10만원", method: "무통장입금", date: "2026.03.10", status: "확인완료" },
  { id: 6, name: "강태준", position: "감사", generation: "40대", amount: "100만원", method: "카드결제", date: "2026.03.08", status: "확인완료" },
];

const unpaidMembers = [
  { name: "윤하린", position: "이사", generation: "41대" },
  { name: "한상철", position: "상임이사", generation: "40대" },
  { name: "오준혁", position: "상임이사", generation: "40대" },
];

const AdminPayments = () => {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [activeTab, setActiveTab] = useState("확인대기");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const { toast } = useToast();

  const counts = {
    전체: payments.length + unpaidMembers.length,
    확인대기: payments.filter((p) => p.status === "확인대기").length,
    확인완료: payments.filter((p) => p.status === "확인완료").length,
    미납부: unpaidMembers.length,
  };

  const filtered = activeTab === "전체" ? payments : activeTab === "미납부" ? [] : payments.filter((p) => p.status === activeTab);

  const statusBadge = (s: PayStatus) => {
    const v = s === "확인완료" ? "default" : s === "확인대기" ? "secondary" : "destructive";
    return <Badge variant={v}>{s}</Badge>;
  };

  const handleConfirm = () => {
    if (!selectedPayment) return;
    setPayments((prev) =>
      prev.map((p) => (p.id === selectedPayment.id ? { ...p, status: "확인완료" as PayStatus } : p))
    );
    setConfirmOpen(false);
    setSelectedPayment(null);
    toast({ title: "납부 확인 완료", description: "납부가 확인 처리되었습니다." });
  };

  const handleNotify = () => {
    setNotifyOpen(false);
    toast({ title: "안내 발송 완료", description: `미납부 회원 ${unpaidMembers.length}명에게 안내가 발송되었습니다.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">기여금 관리</h1>
        <Button variant="outline" onClick={() => toast({ title: "다운로드", description: "납부 현황 엑셀이 다운로드됩니다. (mock)" })}>
          <Download className="w-4 h-4 mr-1" /> 납부 현황 다운로드
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {(["전체", "확인대기", "확인완료", "미납부"] as const).map((tab) => (
            <TabsTrigger key={tab} value={tab} className="gap-1.5">
              {tab}
              <Badge variant="outline" className="ml-1 text-xs px-1.5 py-0">{counts[tab]}</Badge>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {activeTab === "미납부" ? (
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b flex justify-end">
              <Button variant="destructive" size="sm" onClick={() => setNotifyOpen(true)}>
                미납부 회원에게 안내 발송
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>이름</TableHead>
                  <TableHead>직급</TableHead>
                  <TableHead>기수</TableHead>
                  <TableHead>상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unpaidMembers.map((m, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell>{m.position}</TableCell>
                    <TableCell>{m.generation}</TableCell>
                    <TableCell><Badge variant="destructive">미납부</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>이름</TableHead>
                  <TableHead>직급</TableHead>
                  <TableHead>기수</TableHead>
                  <TableHead>기여금</TableHead>
                  <TableHead>납부 방법</TableHead>
                  <TableHead>납부일</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>처리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">데이터가 없습니다.</TableCell>
                  </TableRow>
                ) : (
                  filtered.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{p.position}</TableCell>
                      <TableCell>{p.generation}</TableCell>
                      <TableCell>{p.amount}</TableCell>
                      <TableCell>{p.method}</TableCell>
                      <TableCell>{p.date}</TableCell>
                      <TableCell>{statusBadge(p.status)}</TableCell>
                      <TableCell>
                        {p.status === "확인대기" ? (
                          <Button size="sm" variant="outline" onClick={() => { setSelectedPayment(p); setConfirmOpen(true); }}>
                            확인
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground">처리완료</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Confirm Payment */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>납부 확인</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedPayment && (
                <>
                  <strong>{selectedPayment.name}</strong>님의 {selectedPayment.amount} ({selectedPayment.method}) 납부를 확인하시겠습니까?
                  {selectedPayment.method === "카드결제" && <><br />해피나눔 결제 내역을 확인해주세요.</>}
                  {selectedPayment.method === "무통장입금" && <><br />입금자명을 확인해주세요.</>}
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>확인 처리</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Notify Unpaid */}
      <AlertDialog open={notifyOpen} onOpenChange={setNotifyOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>미납부 안내 발송</AlertDialogTitle>
            <AlertDialogDescription>미납부 회원 {unpaidMembers.length}명에게 기여금 납부 안내를 발송하시겠습니까?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleNotify}>발송</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPayments;
