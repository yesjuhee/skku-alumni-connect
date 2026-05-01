import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Users, User, ArrowLeft, Search, X, ChevronDown,
  Plus, ImageIcon, Send, Camera, EyeOff,
  Sprout, Factory, Truck, HardHat, UtensilsCrossed,
  Landmark, Cpu, GraduationCap, HeartPulse, Building2,
} from "lucide-react";
import { CLUBS, RESEARCH_GROUPS, type Club } from "@/data/community";
import { MEMBERS, FILTER_OPTIONS } from "@/data/members";
import { toast } from "sonner";
import ReportMenu from "@/components/ReportMenu";
import { selectDeleted, useReportStore } from "@/data/reports";
import { useBlockedAuthorIds, useIsAuthorNameBlocked } from "@/hooks/useBlockedAuthors";
import { resolveAuthorId } from "@/lib/currentUser";

// === Business tab data (from BusinessPage) ===
const INDUSTRIES = [
  { name: "농업/광업/수산업/목축업", icon: Sprout },
  { name: "제조업", icon: Factory },
  { name: "유통/물류/도소매업", icon: Truck },
  { name: "건설/건축/부동산업", icon: HardHat },
  { name: "숙박/음식점/서비스업", icon: UtensilsCrossed },
  { name: "금융/보험업", icon: Landmark },
  { name: "전기/정보통신", icon: Cpu },
  { name: "교육/연구개발업", icon: GraduationCap },
  { name: "예술/스포츠/보건/의료업", icon: HeartPulse },
  { name: "공무원/회사원/협회/단체", icon: Building2 },
];

interface CollabPost {
  id: string;
  title: string;
  preview: string;
  body: string;
  author: string;
  date: string;
  hasThumbnail: boolean;
}

const INITIAL_COLLAB_POSTS: CollabPost[] = [
  { id: "b1", title: "IT 시스템 구축 파트너 구합니다", preview: "중소기업 대상 ERP 시스템 구축 프로젝트를 진행 중입니다. 관심 있는 동문...", body: "중소기업 대상 ERP 시스템 구축 프로젝트를 진행 중입니다.\n\n현재 3개 기업과 계약이 완료된 상태이며, 프론트엔드 및 백엔드 개발 역량을 갖춘 파트너사를 찾고 있습니다.\n\n관심 있는 동문 기업은 연락 부탁드립니다.\n\n연락처: yoon@nextsoft.io", author: "윤하린", date: "2026.03.22", hasThumbnail: false },
  { id: "b2", title: "강남 상업용 부동산 공동투자 제안", preview: "강남역 인근 상업용 부동산 공동투자 기회가 있어 동문 여러분께...", body: "강남역 인근 상업용 부동산 공동투자 기회가 있어 동문 여러분께 제안드립니다.\n\n위치: 강남역 도보 5분\n규모: 지상 6층 근린생활시설\n예상 수익률: 연 5~7%\n\n최소 투자금액: 1억원\n모집 인원: 5~10명\n\n관심 있으신 분은 개별 연락 부탁드립니다.", author: "박서연", date: "2026.03.18", hasThumbnail: true },
  { id: "b3", title: "마케팅 컨설팅 상호 협력 제안", preview: "마케팅연구회 활동을 기반으로 동문 기업 대상 마케팅 컨설팅...", body: "마케팅연구회 활동을 기반으로 동문 기업 대상 마케팅 컨설팅 서비스를 제공하고자 합니다.\n\n주요 서비스:\n- 브랜드 전략 수립\n- 디지털 마케팅 기획\n- SNS 마케팅 운영 대행\n\n동문 기업 특별 할인 적용됩니다.\n문의: kim@sktech.co.kr", author: "김영수", date: "2026.03.14", hasThumbnail: false },
  { id: "b4", title: "의료기기 유통 사업 파트너십", preview: "의료기기 해외 유통 관련 사업 파트너를 찾고 있습니다...", body: "의료기기 해외 유통 관련 사업 파트너를 찾고 있습니다.\n\n당사는 국내 의료기기 제조사와 해외 바이어를 연결하는 유통 사업을 진행 중입니다.\n\n필요 역량:\n- 해외 영업 네트워크 보유\n- 의료기기 인허가 경험\n- 물류/통관 전문 지식\n\n관심 있는 동문은 연락 바랍니다.\nhan@skkhospital.co.kr", author: "한상철", date: "2026.03.10", hasThumbnail: true },
];

type IndustryFilterKey = "generation" | "position" | "department" | "region";

const INDUSTRY_FILTER_LABELS: Record<IndustryFilterKey, string> = {
  generation: "기수",
  position: "직급",
  department: "학과",
  region: "지역",
};

type CommunityTab = "club" | "research" | "business";
type BusinessSubTab = "industry" | "collab";

const CollabPostRow = ({
  post,
  onSelect,
}: {
  post: CollabPost;
  onSelect: () => void;
}) => {
  const blocked = useIsAuthorNameBlocked(post.author);
  const authorId = resolveAuthorId(post.author);

  if (blocked) {
    return (
      <div className="bg-muted/30 border border-border rounded-xl p-4 flex items-center gap-2 text-sm text-muted-foreground">
        <EyeOff className="w-4 h-4 shrink-0" />
        차단한 사용자의 게시물입니다
      </div>
    );
  }

  return (
    <div className="relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-primary/30 transition-all">
      <button type="button" onClick={onSelect} className="w-full text-left">
        <div className="flex">
          {post.hasThumbnail && (
            <div className="w-24 h-24 md:w-32 md:h-28 bg-muted flex items-center justify-center shrink-0">
              <Camera className="w-8 h-8 text-muted-foreground/40" />
            </div>
          )}
          <div className="flex-1 p-4 min-w-0 pr-10">
            <h3 className="font-semibold text-foreground text-sm md:text-base line-clamp-1">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.preview}</p>
            <p className="text-xs text-muted-foreground/70 mt-2">
              {post.author} · {post.date}
            </p>
          </div>
        </div>
      </button>
      <div className="absolute top-2 right-2">
        <ReportMenu
          targetKind="businessPost"
          targetId={post.id}
          targetSnapshot={{ title: post.title, content: post.body, authorName: post.author }}
          reportedAuthorMemberId={authorId}
          triggerSize="sm"
        />
      </div>
    </div>
  );
};

const CommunityPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<CommunityTab>("club");
  const blockedIds = useBlockedAuthorIds();
  const deleted = useReportStore(selectDeleted);

  // === Business state ===
  const [businessTab, setBusinessTab] = useState<BusinessSubTab>("industry");
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [collabPosts, setCollabPosts] = useState<CollabPost[]>(INITIAL_COLLAB_POSTS);
  const [selectedPost, setSelectedPost] = useState<CollabPost | null>(null);
  const visibleCollabPosts = collabPosts.filter(
    (p) => !deleted.some((d) => d.targetKind === "businessPost" && d.targetId === p.id),
  );
  const [showWriteDialog, setShowWriteDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [indSearch, setIndSearch] = useState("");
  const [indSort, setIndSort] = useState<"name" | "year">("name");
  const [indFilters, setIndFilters] = useState<Record<IndustryFilterKey, string[]>>({
    generation: [], position: [], department: [], region: [],
  });

  const hasIndFilters = Object.values(indFilters).some((v) => v.length > 0);

  const toggleIndFilter = (key: IndustryFilterKey, value: string) => {
    setIndFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value],
    }));
  };

  const removeIndFilter = (key: IndustryFilterKey, value: string) => {
    setIndFilters((prev) => ({ ...prev, [key]: prev[key].filter((v) => v !== value) }));
  };

  const clearIndFilters = () => {
    setIndFilters({ generation: [], position: [], department: [], region: [] });
    setIndSearch("");
  };

  const getIndFilterOptions = (key: IndustryFilterKey): string[] => {
    if (key === "generation") return FILTER_OPTIONS.generationValues;
    return FILTER_OPTIONS[key];
  };

  const getIndFilterLabel = (key: IndustryFilterKey, value: string): string => {
    if (key === "generation") {
      const idx = FILTER_OPTIONS.generationValues.indexOf(value);
      return idx >= 0 ? FILTER_OPTIONS.generation[idx] : value;
    }
    return value;
  };

  const industryMembers = useMemo(() => {
    if (!selectedIndustry) return [];
    let result = MEMBERS.filter((m) => {
      if (blockedIds.has(m.id)) return false;
      if (m.industry !== selectedIndustry) return false;
      const q = indSearch.trim().toLowerCase();
      if (q && !m.name.includes(q) && !m.department.toLowerCase().includes(q) && !String(m.admissionYear).includes(q)) return false;
      if (indFilters.generation.length && !indFilters.generation.includes(m.generation)) return false;
      if (indFilters.position.length && !indFilters.position.includes(m.position)) return false;
      if (indFilters.department.length && !indFilters.department.includes(m.department)) return false;
      if (indFilters.region.length && !indFilters.region.includes(m.region)) return false;
      return true;
    });
    result.sort((a, b) => indSort === "name" ? a.name.localeCompare(b.name, "ko") : a.admissionYear - b.admissionYear);
    return result;
  }, [selectedIndustry, indSearch, indFilters, indSort, blockedIds]);

  const handleSubmitPost = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      toast.error("제목과 내용을 모두 입력해주세요");
      return;
    }
    const newPost: CollabPost = {
      id: `new-${Date.now()}`,
      title: newTitle,
      preview: newContent.slice(0, 50) + "...",
      body: newContent,
      author: "홍길동",
      date: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
      hasThumbnail: false,
    };
    setCollabPosts([newPost, ...collabPosts]);
    setNewTitle("");
    setNewContent("");
    setShowWriteDialog(false);
    toast.success("게시글이 등록되었습니다");
  };

  const items = tab === "club" ? CLUBS : RESEARCH_GROUPS;

  const ClubCard = ({ club }: { club: Club }) => {
    const basePath = club.type === "club" ? "/main/community/club" : "/main/community/research";
    return (
      <button
        onClick={() => navigate(`${basePath}/${club.id}`)}
        className="w-full text-left bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all"
      >
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground">{club.name}</h3>
            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{club.intro}</p>
            <p className="text-xs text-muted-foreground mt-2">
              회장: {club.presidentTitle} {club.president}
            </p>
          </div>
        </div>
      </button>
    );
  };

  // === Business: post detail view ===
  if (tab === "business" && selectedPost) {
    const currentIdx = visibleCollabPosts.findIndex((p) => p.id === selectedPost.id);
    const prevPost = currentIdx > 0 ? visibleCollabPosts[currentIdx - 1] : null;
    const nextPost = currentIdx >= 0 && currentIdx < visibleCollabPosts.length - 1 ? visibleCollabPosts[currentIdx + 1] : null;
    const detailAuthorId = resolveAuthorId(selectedPost.author);

    return (
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <button
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          협업 제안
        </button>
        <div className="flex items-start gap-2">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">{selectedPost.title}</h1>
            <p className="text-sm text-muted-foreground mt-2">{selectedPost.author} · {selectedPost.date}</p>
          </div>
          <ReportMenu
            targetKind="businessPost"
            targetId={selectedPost.id}
            targetSnapshot={{ title: selectedPost.title, content: selectedPost.body, authorName: selectedPost.author }}
            reportedAuthorMemberId={detailAuthorId}
          />
        </div>
        <hr className="border-border" />
        <div className="text-foreground text-sm md:text-base leading-relaxed whitespace-pre-line">
          {selectedPost.body}
        </div>
        {selectedPost.hasThumbnail && (
          <div className="bg-muted rounded-xl h-48 md:h-64 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="text-sm">첨부 이미지</p>
            </div>
          </div>
        )}
        <hr className="border-border" />
        <div className="space-y-2">
          {prevPost && (
            <button onClick={() => setSelectedPost(prevPost)} className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-left">
              <ArrowLeft className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">이전글</p>
                <p className="text-sm text-foreground truncate">{prevPost.title}</p>
              </div>
            </button>
          )}
          {nextPost && (
            <button onClick={() => setSelectedPost(nextPost)} className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-left">
              <ArrowLeft className="w-4 h-4 text-muted-foreground shrink-0 rotate-180" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">다음글</p>
                <p className="text-sm text-foreground truncate">{nextPost.title}</p>
              </div>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
      {/* Main community tabs */}
      <Tabs value={tab} onValueChange={(v) => { setTab(v as CommunityTab); setSelectedIndustry(null); setSelectedPost(null); }}>
        <TabsList className="w-full">
          <TabsTrigger value="club" className="flex-1">취미동호회</TabsTrigger>
          <TabsTrigger value="research" className="flex-1">발전연구회</TabsTrigger>
          <TabsTrigger value="business" className="flex-1">Business</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Club / Research tabs */}
      {(tab === "club" || tab === "research") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      )}

      {/* Business tab */}
      {tab === "business" && (
        <>
          {/* Business sub-tabs */}
          <Tabs value={businessTab} onValueChange={(v) => { setBusinessTab(v as BusinessSubTab); setSelectedIndustry(null); }}>
            <TabsList className="w-full">
              <TabsTrigger value="industry" className="flex-1">업종별 회원보기</TabsTrigger>
              <TabsTrigger value="collab" className="flex-1">협업 제안하기</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Industry tab */}
          {businessTab === "industry" && !selectedIndustry && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {INDUSTRIES.map(({ name, icon: Icon }) => {
                const count = MEMBERS.filter((m) => m.industry === name).length;
                return (
                  <button
                    key={name}
                    onClick={() => setSelectedIndustry(name)}
                    className="bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all text-center"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground leading-tight">{name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{count}명</p>
                  </button>
                );
              })}
            </div>
          )}

          {businessTab === "industry" && selectedIndustry && (
            <div className="space-y-4">
              <button
                onClick={() => { setSelectedIndustry(null); clearIndFilters(); }}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                업종 목록
              </button>
              <h2 className="text-lg font-semibold text-foreground">{selectedIndustry}</h2>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="이름, 학과, 학번으로 검색"
                  value={indSearch}
                  onChange={(e) => setIndSearch(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Filters + Sort */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(INDUSTRY_FILTER_LABELS) as IndustryFilterKey[]).map((key) => (
                    <DropdownMenu key={key}>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                            indFilters[key].length > 0
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card text-muted-foreground border-border hover:border-foreground/30"
                          }`}
                        >
                          {INDUSTRY_FILTER_LABELS[key]}
                          {indFilters[key].length > 0 && (
                            <span className="ml-0.5 bg-primary-foreground/20 rounded-full px-1.5 text-xs">
                              {indFilters[key].length}
                            </span>
                          )}
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="max-h-60 overflow-y-auto">
                        {getIndFilterOptions(key).map((option) => (
                          <DropdownMenuItem
                            key={option}
                            onClick={() => toggleIndFilter(key, option)}
                            className={indFilters[key].includes(option) ? "bg-accent font-semibold" : ""}
                          >
                            {getIndFilterLabel(key, option)}
                            {indFilters[key].includes(option) && <span className="ml-auto text-primary">✓</span>}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ))}
                </div>
                <Select value={indSort} onValueChange={(v) => setIndSort(v as "name" | "year")}>
                  <SelectTrigger className="w-28 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">이름순</SelectItem>
                    <SelectItem value="year">학번순</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Active filter tags */}
              {hasIndFilters && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {(Object.keys(indFilters) as IndustryFilterKey[]).flatMap((key) =>
                    indFilters[key].map((value) => (
                      <Badge key={`${key}-${value}`} variant="secondary" className="gap-1 pr-1">
                        {getIndFilterLabel(key, value)}
                        <button onClick={() => removeIndFilter(key, value)} className="hover:text-destructive">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))
                  )}
                  <button onClick={clearIndFilters} className="text-xs text-primary hover:underline ml-1">초기화</button>
                </div>
              )}

              {/* Results */}
              {industryMembers.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">
                  {indSearch || hasIndFilters ? "검색 결과가 없습니다" : "등록된 회원이 없습니다"}
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {industryMembers.map((member) => (
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
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">{member.position}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{member.department} · {member.admissionYear}학번</p>
                          <p className="text-sm text-muted-foreground truncate">{member.company} · {member.jobTitle}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Collab tab */}
          {businessTab === "collab" && (
            <div className="space-y-3 relative">
              {visibleCollabPosts.map((post) => (
                <CollabPostRow key={post.id} post={post} onSelect={() => setSelectedPost(post)} />
              ))}

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
                <DialogTitle>협업 제안 글쓰기</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">제목 *</label>
                  <Input placeholder="제목을 입력하세요" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">내용 *</label>
                  <Textarea placeholder="내용을 입력하세요" value={newContent} onChange={(e) => setNewContent(e.target.value)} rows={6} />
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
        </>
      )}
    </div>
  );
};

export default CommunityPage;
