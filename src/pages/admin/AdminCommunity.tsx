import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Group {
  id: number;
  type: "취미동호회" | "발전연구회";
  name: string;
  president: string;
  secretary: string;
  intro: string;
}

const initialGroups: Group[] = [
  { id: 1, type: "취미동호회", name: "성골회", president: "이우진", secretary: "김도현", intro: "성균골프회 - 동문들의 친목도모와 사업 파트너로서의 골프 동호회" },
  { id: 2, type: "취미동호회", name: "성균등산회", president: "박철수", secretary: "최유진", intro: "매월 첫째주 토요일, 전국 명산을 함께 오르는 등산 동호회" },
  { id: 3, type: "취미동호회", name: "성균낚시회", president: "김도현", secretary: "송미래", intro: "바다낚시와 민물낚시를 즐기는 동문 낚시 동호회" },
  { id: 4, type: "취미동호회", name: "성균사진회", president: "최유진", secretary: "윤하린", intro: "사진 촬영과 전시 활동을 하는 동문 사진 동호회" },
  { id: 5, type: "발전연구회", name: "마케팅연구회", president: "김정수", secretary: "박서연", intro: "브랜드 전략, 데이터 분석, AI활용 등 마케팅 기법 연구" },
  { id: 6, type: "발전연구회", name: "부동산연구회", president: "이상훈", secretary: "한상철", intro: "부동산 시장 분석, 투자 전략, 정책 동향 연구" },
  { id: 7, type: "발전연구회", name: "AI·디지털전환연구회", president: "정하영", secretary: "오준혁", intro: "인공지능과 디지털 전환 트렌드 및 실무 적용 연구" },
];

const AdminCommunity = () => {
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [activeTab, setActiveTab] = useState<"취미동호회" | "발전연구회">("취미동호회");
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [formName, setFormName] = useState("");
  const [formPresident, setFormPresident] = useState("");
  const [formSecretary, setFormSecretary] = useState("");
  const [formIntro, setFormIntro] = useState("");
  const { toast } = useToast();

  const filtered = groups.filter((g) => g.type === activeTab);

  const openNew = () => {
    setEditingGroup(null);
    setFormName("");
    setFormPresident("");
    setFormSecretary("");
    setFormIntro("");
    setEditOpen(true);
  };

  const openEdit = (group: Group) => {
    setEditingGroup(group);
    setFormName(group.name);
    setFormPresident(group.president);
    setFormSecretary(group.secretary);
    setFormIntro(group.intro);
    setEditOpen(true);
  };

  const handleSave = () => {
    if (!formName.trim() || !formIntro.trim()) return;
    if (editingGroup) {
      setGroups((prev) => prev.map((g) => (g.id === editingGroup.id ? { ...g, name: formName, president: formPresident, secretary: formSecretary, intro: formIntro } : g)));
      toast({ title: "수정 완료" });
    } else {
      setGroups((prev) => [
        ...prev,
        { id: Date.now(), type: activeTab, name: formName, president: formPresident, secretary: formSecretary, intro: formIntro },
      ]);
      toast({ title: "등록 완료", description: `새 ${activeTab === "취미동호회" ? "동호회" : "연구회"}가 추가되었습니다.` });
    }
    setEditOpen(false);
  };

  const handleDelete = () => {
    if (!editingGroup) return;
    setGroups((prev) => prev.filter((g) => g.id !== editingGroup.id));
    setDeleteOpen(false);
    setEditingGroup(null);
    toast({ title: "삭제 완료" });
  };

  const label = activeTab === "취미동호회" ? "동호회" : "연구회";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">커뮤니티 관리</h1>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-1" /> 새 {label} 추가</Button>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "취미동호회" | "발전연구회")}>
        <TabsList>
          <TabsTrigger value="취미동호회">취미동호회</TabsTrigger>
          <TabsTrigger value="발전연구회">발전연구회</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>회장</TableHead>
                <TableHead>총무</TableHead>
                <TableHead>소개</TableHead>
                <TableHead className="w-28">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((g) => (
                <TableRow key={g.id}>
                  <TableCell className="font-medium">{g.name}</TableCell>
                  <TableCell>{g.president}</TableCell>
                  <TableCell>{g.secretary}</TableCell>
                  <TableCell className="max-w-xs truncate">{g.intro}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(g)}><Pencil className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => { setEditingGroup(g); setDeleteOpen(true); }}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit/Create Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingGroup ? `${label} 수정` : `새 ${label} 추가`}</DialogTitle>
            <DialogDescription>{editingGroup ? `${label} 정보를 수정합니다.` : `새 ${label}를 추가합니다.`}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>이름 *</Label>
              <Input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder={`${label}명을 입력하세요`} />
            </div>
            <div className="space-y-2">
              <Label>회장 (회원 검색)</Label>
              <Input value={formPresident} onChange={(e) => setFormPresident(e.target.value)} placeholder="회장 이름을 입력하세요" />
            </div>
            <div className="space-y-2">
              <Label>총무 (회원 검색)</Label>
              <Input value={formSecretary} onChange={(e) => setFormSecretary(e.target.value)} placeholder="총무 이름을 입력하세요" />
            </div>
            <div className="space-y-2">
              <Label>소개글 *</Label>
              <Textarea value={formIntro} onChange={(e) => setFormIntro(e.target.value)} placeholder="소개글을 입력하세요" rows={4} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>취소</Button>
            <Button onClick={handleSave} disabled={!formName.trim() || !formIntro.trim()}>{editingGroup ? "수정" : "등록"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{label} 삭제</AlertDialogTitle>
            <AlertDialogDescription>"{editingGroup?.name}"을(를) 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminCommunity;
