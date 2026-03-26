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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Paperclip } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: number;
  type: "공지사항" | "뉴스";
  title: string;
  author: string;
  date: string;
  hasAttachment: boolean;
}

const initialPosts: Post[] = [
  { id: 1, type: "공지사항", title: "제40대 임원 기여금 납부 안내", author: "사무처", date: "2026.03.20", hasAttachment: false },
  { id: 2, type: "공지사항", title: "2026년 정기총회 개최 안내", author: "사무처", date: "2026.03.15", hasAttachment: true },
  { id: 3, type: "공지사항", title: "총동창회 사무처 연락처 변경 안내", author: "사무처", date: "2026.03.10", hasAttachment: false },
  { id: 4, type: "공지사항", title: "동문 장학금 수혜자 선정 결과", author: "사무처", date: "2026.03.05", hasAttachment: true },
  { id: 5, type: "공지사항", title: "임원수첩 앱 이용 안내", author: "사무처", date: "2026.03.01", hasAttachment: false },
  { id: 6, type: "뉴스", title: "성균관대, 2026 QS 세계대학 랭킹 상승", author: "사무처", date: "2026.03.18", hasAttachment: true },
  { id: 7, type: "뉴스", title: "동문 기업인 포럼 성황리 개최", author: "사무처", date: "2026.03.13", hasAttachment: true },
  { id: 8, type: "뉴스", title: "총동창회 봄맞이 골프대회 참가 모집", author: "사무처", date: "2026.03.08", hasAttachment: false },
  { id: 9, type: "뉴스", title: "해외 동문회 소식 - 미주지역", author: "사무처", date: "2026.03.03", hasAttachment: true },
];

const AdminPosts = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [activeTab, setActiveTab] = useState<"공지사항" | "뉴스">("공지사항");
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formType, setFormType] = useState<"공지사항" | "뉴스">("공지사항");
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const { toast } = useToast();

  const filtered = posts.filter((p) => p.type === activeTab);

  const openNew = () => {
    setEditingPost(null);
    setFormType(activeTab);
    setFormTitle("");
    setFormContent("");
    setEditOpen(true);
  };

  const openEdit = (post: Post) => {
    setEditingPost(post);
    setFormType(post.type);
    setFormTitle(post.title);
    setFormContent("게시글 본문 내용입니다...");
    setEditOpen(true);
  };

  const handleSave = () => {
    if (!formTitle.trim()) return;
    if (editingPost) {
      setPosts((prev) => prev.map((p) => (p.id === editingPost.id ? { ...p, type: formType, title: formTitle } : p)));
      toast({ title: "수정 완료", description: "게시글이 수정되었습니다." });
    } else {
      const newPost: Post = {
        id: Date.now(),
        type: formType,
        title: formTitle,
        author: "사무처",
        date: new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\. /g, ".").replace(".", ""),
        hasAttachment: false,
      };
      setPosts((prev) => [newPost, ...prev]);
      toast({ title: "등록 완료", description: "새 게시글이 등록되었습니다." });
    }
    setEditOpen(false);
  };

  const handleDelete = () => {
    if (!editingPost) return;
    setPosts((prev) => prev.filter((p) => p.id !== editingPost.id));
    setDeleteOpen(false);
    setEditingPost(null);
    toast({ title: "삭제 완료", description: "게시글이 삭제되었습니다." });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">공지/뉴스 관리</h1>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-1" /> 새 글 작성</Button>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "공지사항" | "뉴스")}>
        <TabsList>
          <TabsTrigger value="공지사항">공지사항</TabsTrigger>
          <TabsTrigger value="뉴스">뉴스</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">번호</TableHead>
                <TableHead>제목</TableHead>
                <TableHead className="w-24">작성자</TableHead>
                <TableHead className="w-28">작성일</TableHead>
                <TableHead className="w-16">첨부</TableHead>
                <TableHead className="w-28">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((post, idx) => (
                <TableRow key={post.id}>
                  <TableCell className="text-muted-foreground">{filtered.length - idx}</TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>{post.hasAttachment && <Paperclip className="w-4 h-4 text-muted-foreground" />}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(post)}><Pencil className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => { setEditingPost(post); setDeleteOpen(true); }}><Trash2 className="w-4 h-4 text-destructive" /></Button>
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
            <DialogTitle>{editingPost ? "게시글 수정" : "새 글 작성"}</DialogTitle>
            <DialogDescription>{editingPost ? "게시글을 수정합니다." : "새 게시글을 작성합니다."}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>게시 유형</Label>
              <Select value={formType} onValueChange={(v) => setFormType(v as "공지사항" | "뉴스")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="공지사항">공지사항</SelectItem>
                  <SelectItem value="뉴스">뉴스</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>제목 *</Label>
              <Input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="제목을 입력하세요" />
            </div>
            <div className="space-y-2">
              <Label>내용</Label>
              <Textarea value={formContent} onChange={(e) => setFormContent(e.target.value)} placeholder="내용을 입력하세요" rows={5} />
            </div>
            <div className="space-y-2">
              <Label>사진 첨부</Label>
              <Input type="file" accept="image/*" multiple />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>취소</Button>
            <Button onClick={handleSave} disabled={!formTitle.trim()}>{editingPost ? "수정" : "등록"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>게시글 삭제</AlertDialogTitle>
            <AlertDialogDescription>"{editingPost?.title}" 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</AlertDialogDescription>
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

export default AdminPosts;
