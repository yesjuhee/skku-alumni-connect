import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type AppStatus = "대기중" | "승인" | "반려";

interface Application {
  id: number;
  date: string;
  name: string;
  department: string;
  studentId: string;
  phone: string;
  email: string;
  position: string;
  contribution: string;
  status: AppStatus;
  memo?: string;
  rejectReason?: string;
}

const CONTRIBUTION_MAP: Record<string, string> = {
  자문위원: "200만원",
  부회장: "100만원",
  감사: "100만원",
  상임이사: "30만원",
  이사: "10만원",
};

const initialApplications: Application[] = [
  { id: 1, date: "2026.03.22", name: "나동문", department: "전자공학과", studentId: "1991", phone: "010-5555-1111", email: "na@example.com", position: "상임이사", contribution: "30만원", status: "대기중" },
  { id: 2, date: "2026.03.20", name: "유지원", department: "경영학과", studentId: "1995", phone: "010-5555-2222", email: "yoo@example.com", position: "이사", contribution: "10만원", status: "대기중" },
  { id: 3, date: "2026.03.18", name: "배성호", department: "화학공학과", studentId: "1988", phone: "010-5555-3333", email: "bae@example.com", position: "자문위원", contribution: "200만원", status: "대기중" },
  { id: 4, date: "2026.03.15", name: "서민지", department: "법학과", studentId: "1993", phone: "010-5555-4444", email: "seo@example.com", position: "이사", contribution: "10만원", status: "승인" },
  { id: 5, date: "2026.03.12", name: "고영태", department: "건축학과", studentId: "1987", phone: "010-5555-5555", email: "ko@example.com", position: "상임이사", contribution: "30만원", status: "반려", rejectReason: "서류 미비" },
];

const AdminApplications = () => {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [activeTab, setActiveTab] = useState("대기중");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [adminMemo, setAdminMemo] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  const counts = {
    전체: applications.length,
    대기중: applications.filter((a) => a.status === "대기중").length,
    승인: applications.filter((a) => a.status === "승인").length,
    반려: applications.filter((a) => a.status === "반려").length,
  };

  const filtered = activeTab === "전체" ? applications : applications.filter((a) => a.status === activeTab);

  const statusBadge = (s: AppStatus) => {
    const v = s === "승인" ? "default" : s === "반려" ? "destructive" : "secondary";
    return <Badge variant={v}>{s}</Badge>;
  };

  const openDetail = (app: Application) => {
    setSelectedApp(app);
    setAdminMemo(app.memo || "");
    setDetailOpen(true);
  };

  const handleApprove = () => {
    if (!selectedApp) return;
    setApplications((prev) =>
      prev.map((a) => (a.id === selectedApp.id ? { ...a, status: "승인" as AppStatus, memo: adminMemo } : a))
    );
    setApproveOpen(false);
    setDetailOpen(false);
  };

  const handleReject = () => {
    if (!selectedApp) return;
    setApplications((prev) =>
      prev.map((a) => (a.id === selectedApp.id ? { ...a, status: "반려" as AppStatus, memo: adminMemo, rejectReason } : a))
    );
    setRejectOpen(false);
    setDetailOpen(false);
    setRejectReason("");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">신규 신청 관리</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {(["전체", "대기중", "승인", "반려"] as const).map((tab) => (
            <TabsTrigger key={tab} value={tab} className="gap-1.5">
              {tab}
              <Badge variant="outline" className="ml-1 text-xs px-1.5 py-0">
                {counts[tab]}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>신청일</TableHead>
                <TableHead>이름</TableHead>
                <TableHead>학과</TableHead>
                <TableHead>학번</TableHead>
                <TableHead>연락처</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>희망 직급</TableHead>
                <TableHead>기여금</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>처리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                    해당 상태의 신청이 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>{app.date}</TableCell>
                    <TableCell className="font-medium">{app.name}</TableCell>
                    <TableCell>{app.department}</TableCell>
                    <TableCell>{app.studentId}</TableCell>
                    <TableCell>{app.phone}</TableCell>
                    <TableCell>{app.email}</TableCell>
                    <TableCell>{app.position}</TableCell>
                    <TableCell>{app.contribution}</TableCell>
                    <TableCell>{statusBadge(app.status)}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => openDetail(app)}>
                        처리
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>신청 상세</DialogTitle>
            <DialogDescription>신청 정보를 확인하고 승인 또는 반려 처리합니다.</DialogDescription>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">이름:</span> {selectedApp.name}</div>
                <div><span className="text-muted-foreground">학과:</span> {selectedApp.department}</div>
                <div><span className="text-muted-foreground">학번:</span> {selectedApp.studentId}</div>
                <div><span className="text-muted-foreground">연락처:</span> {selectedApp.phone}</div>
                <div><span className="text-muted-foreground">이메일:</span> {selectedApp.email}</div>
                <div><span className="text-muted-foreground">희망 직급:</span> {selectedApp.position}</div>
                <div><span className="text-muted-foreground">기여금:</span> {selectedApp.contribution}</div>
                <div><span className="text-muted-foreground">상태:</span> {statusBadge(selectedApp.status)}</div>
              </div>
              {selectedApp.rejectReason && (
                <div className="text-sm p-3 bg-destructive/10 rounded-lg">
                  <span className="font-medium text-destructive">반려 사유:</span> {selectedApp.rejectReason}
                </div>
              )}
              <div className="space-y-2">
                <Label>관리자 메모</Label>
                <Textarea value={adminMemo} onChange={(e) => setAdminMemo(e.target.value)} placeholder="메모를 입력하세요" />
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedApp?.status === "대기중" && (
              <>
                <Button variant="destructive" onClick={() => setRejectOpen(true)}>반려</Button>
                <Button onClick={() => setApproveOpen(true)}>승인</Button>
              </>
            )}
            {selectedApp?.status !== "대기중" && (
              <Button variant="outline" onClick={() => setDetailOpen(false)}>닫기</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Confirm */}
      <AlertDialog open={approveOpen} onOpenChange={setApproveOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>승인하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>승인 시 기여금 납부 안내가 발송됩니다.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleApprove}>승인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>반려 처리</DialogTitle>
            <DialogDescription>반려 사유를 입력해주세요.</DialogDescription>
          </DialogHeader>
          <Textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="반려 사유를 입력하세요" />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectOpen(false)}>취소</Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectReason.trim()}>반려 처리</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminApplications;
