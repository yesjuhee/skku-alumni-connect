import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CLUBS, RESEARCH_GROUPS } from "@/data/community";
import { useReportStore, selectDeleted } from "@/data/reports";
import OwnerActionMenu from "@/components/OwnerActionMenu";
import ReportMenu from "@/components/ReportMenu";
import { CURRENT_USER, resolveAuthorId } from "@/lib/currentUser";

interface CommunityPostDetailPageProps {
  groupType: "club" | "research";
}

const CommunityPostDetailPage = ({ groupType }: CommunityPostDetailPageProps) => {
  const { groupId, postId } = useParams();
  const navigate = useNavigate();

  const allGroups = groupType === "research" ? RESEARCH_GROUPS : CLUBS;
  const group = allGroups.find((g) => g.id === groupId);
  const deleted = useReportStore(selectDeleted);
  const posts = (group?.posts ?? []).filter(
    (p) => !deleted.some((d) => d.targetKind === "communityPost" && d.targetId === p.id),
  );
  const currentIndex = posts.findIndex((p) => p.id === postId);
  const post = currentIndex >= 0 ? posts[currentIndex] : undefined;
  const prevPost = currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

  const groupBasePath = `/main/community/${groupType}/${groupId}`;

  if (!group || !post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">게시글을 찾을 수 없습니다.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate(group ? groupBasePath : "/main/community")}
        >
          목록으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <button
        onClick={() => navigate(groupBasePath)}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        {group.name}
      </button>

      {/* Header */}
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">{post.title}</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {post.author} · {post.date}
          </p>
        </div>
        {(() => {
          const authorId = resolveAuthorId(post.author);
          return authorId === CURRENT_USER.id ? (
            <OwnerActionMenu
              targetKind="communityPost"
              targetId={post.id}
              onDeleted={() => navigate(groupBasePath)}
            />
          ) : (
            <ReportMenu
              targetKind="communityPost"
              targetId={post.id}
              targetSnapshot={{ title: post.title, content: post.content, authorName: post.author }}
              reportedAuthorMemberId={authorId}
            />
          );
        })()}
      </div>

      <Separator />

      {/* Body */}
      <div className="text-foreground text-sm md:text-base leading-relaxed whitespace-pre-line">
        {post.content}
      </div>

      {post.hasImage && (
        <div className="bg-muted rounded-xl h-48 md:h-64 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-40" />
            <p className="text-sm">첨부 이미지</p>
          </div>
        </div>
      )}

      <Separator />

      {/* Prev / Next navigation */}
      <div className="space-y-2">
        {prevPost && (
          <button
            onClick={() => navigate(`${groupBasePath}/post/${prevPost.id}`)}
            className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-left"
          >
            <ChevronLeft className="w-4 h-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">이전글</p>
              <p className="text-sm text-foreground truncate">{prevPost.title}</p>
            </div>
          </button>
        )}
        {nextPost && (
          <button
            onClick={() => navigate(`${groupBasePath}/post/${nextPost.id}`)}
            className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-left"
          >
            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">다음글</p>
              <p className="text-sm text-foreground truncate">{nextPost.title}</p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default CommunityPostDetailPage;
