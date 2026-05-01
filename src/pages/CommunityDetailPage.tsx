import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, User, ImageIcon, Send, EyeOff } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CLUBS, RESEARCH_GROUPS, type ClubPost } from "@/data/community";
import { MEMBERS } from "@/data/members";
import { toast } from "sonner";
import ReportMenu from "@/components/ReportMenu";
import OwnerActionMenu from "@/components/OwnerActionMenu";
import { useReportStore, selectDeleted } from "@/data/reports";
import { useBlockedAuthorIds, useIsAuthorNameBlocked } from "@/hooks/useBlockedAuthors";
import { CURRENT_USER, resolveAuthorId } from "@/lib/currentUser";

const ClubPostCard = ({ post, onClick }: { post: ClubPost; onClick: () => void }) => {
  const isBlocked = useIsAuthorNameBlocked(post.author);
  const authorId = resolveAuthorId(post.author);

  if (isBlocked) {
    return (
      <Card className="overflow-hidden bg-muted/30">
        <CardContent className="p-4 flex items-center gap-2 text-sm text-muted-foreground">
          <EyeOff className="w-4 h-4 shrink-0" />
          차단한 사용자의 게시물입니다
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="overflow-hidden cursor-pointer hover:shadow-md hover:border-primary/30 transition-all"
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-2">
          <h3 className="font-semibold text-foreground text-sm flex-1 line-clamp-1">
            {post.title}
          </h3>
          {post.hasImage && (
            <ImageIcon className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          )}
          <div onClick={(e) => e.stopPropagation()}>
            {authorId === CURRENT_USER.id ? (
              <OwnerActionMenu
                targetKind="communityPost"
                targetId={post.id}
                triggerSize="sm"
              />
            ) : (
              <ReportMenu
                targetKind="communityPost"
                targetId={post.id}
                targetSnapshot={{ title: post.title, content: post.content, authorName: post.author }}
                reportedAuthorMemberId={authorId}
                triggerSize="sm"
              />
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.content}</p>
        <p className="text-xs text-muted-foreground/70 mt-2">
          {post.author} · {post.date}
        </p>
      </CardContent>
    </Card>
  );
};

const CommunityDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isResearch = location.pathname.includes("/research/");

  const allGroups = isResearch ? RESEARCH_GROUPS : CLUBS;
  const group = allGroups.find((g) => g.id === id);

  const [subTab, setSubTab] = useState<"intro" | "members" | "posts">("intro");
  const [postsState, setPostsState] = useState<ClubPost[]>(group?.posts || []);
  const deleted = useReportStore(selectDeleted);
  const posts = postsState.filter(
    (p) => !deleted.some((d) => d.targetKind === "communityPost" && d.targetId === p.id),
  );
  const [showWriteDialog, setShowWriteDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const blockedIds = useBlockedAuthorIds();

  if (!group) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">정보를 찾을 수 없습니다.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/main/community")}>
          목록으로 돌아가기
        </Button>
      </div>
    );
  }

  const groupMembers = MEMBERS.filter(
    (m) => group.memberIds.includes(m.id) && !blockedIds.has(m.id),
  );
  const typeLabel = isResearch ? "발전연구회" : "취미동호회";

  const handleSubmitPost = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      toast.error("제목과 내용을 모두 입력해주세요");
      return;
    }
    const newPost: ClubPost = {
      id: `new-${Date.now()}`,
      title: newTitle,
      content: newContent,
      date: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
      author: "홍길동",
      hasImage: false,
    };
    setPostsState([newPost, ...postsState]);
    setNewTitle("");
    setNewContent("");
    setShowWriteDialog(false);
    toast.success("게시글이 등록되었습니다");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
      {/* Back */}
      <button
        onClick={() => navigate("/main/community")}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        {typeLabel}
      </button>

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground">{group.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          회장: {group.presidentTitle} {group.president}
        </p>
      </div>

      {/* Sub tabs */}
      <Tabs value={subTab} onValueChange={(v) => setSubTab(v as "intro" | "members" | "posts")}>
        <TabsList className="w-full">
          <TabsTrigger value="intro" className="flex-1">소개</TabsTrigger>
          <TabsTrigger value="members" className="flex-1">회원명단</TabsTrigger>
          <TabsTrigger value="posts" className="flex-1">공지/뉴스</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Intro tab */}
      {subTab === "intro" && (
        <Card>
          <CardContent className="p-4">
            <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">
              {group.description}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Members tab */}
      {subTab === "members" && (
        <div className="space-y-3">
          {groupMembers.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">등록된 회원이 없습니다.</p>
          ) : (
            groupMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => navigate(`/main/members/${member.id}`)}
                className="w-full text-left bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-foreground">{member.name}</span>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        {member.position}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {member.department} · {member.admissionYear}학번
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {member.company} · {member.jobTitle}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}

      {/* Posts tab */}
      {subTab === "posts" && (
        <div className="space-y-3 relative">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">등록된 게시글이 없습니다.</p>
          ) : (
            posts.map((post) => (
              <ClubPostCard
                key={post.id}
                post={post}
                onClick={() => navigate(`/main/community/${group.type}/${group.id}/post/${post.id}`)}
              />
            ))
          )}

          {/* FAB */}
          <button
            onClick={() => setShowWriteDialog(true)}
            className="fixed bottom-24 md:bottom-8 right-4 md:right-8 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors z-20"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Write dialog */}
      <Dialog open={showWriteDialog} onOpenChange={setShowWriteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>글쓰기</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">제목 *</label>
              <Input
                placeholder="제목을 입력하세요"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">내용 *</label>
              <Textarea
                placeholder="내용을 입력하세요"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={6}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">사진 첨부</label>
              <Button variant="outline" size="sm" onClick={() => toast.info("프로토타입에서는 사진 첨부가 지원되지 않습니다")}>
                <ImageIcon className="w-4 h-4 mr-1" />
                사진 선택
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWriteDialog(false)}>취소</Button>
            <Button onClick={handleSubmitPost}>
              <Send className="w-4 h-4 mr-1" />
              등록
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunityDetailPage;
