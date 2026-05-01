import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, ExternalLink, ChevronRight, Heart, Car, Stethoscope, BookOpen, Maximize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NEWS_ITEMS } from "@/data/news";
import { CLUBS, RESEARCH_GROUPS } from "@/data/community";
import { toast } from "sonner";
import skkuLogo from "@/assets/skku-alumni-logo.png";

const mockUser = {
  name: "홍길동",
  dept: "경영학과",
  year: "86",
  position: "부회장",
};

const benefits = [
  {
    icon: Heart,
    title: "경조사에 조기/축하금 지원",
    subtitle: "경조사 서비스",
    url: "https://alumni.skku.edu/alumni/Benefit/congrat.do",
    ready: true,
  },
  {
    icon: Car,
    title: "무료주차 신청",
    subtitle: "주차권 서비스",
    url: "https://alumni.skku.edu/alumni/Benefit/parking.do",
    ready: true,
  },
  {
    icon: Stethoscope,
    title: "강북삼성병원 건강검진 할인",
    subtitle: "의료 혜택",
    url: "https://alumni.skku.edu/alumni/Benefit/medical.do",
    ready: true,
  },
  {
    icon: BookOpen,
    title: "총동창회보 수령 신청",
    subtitle: "동창회보 정기 수령",
    url: "#",
    ready: false,
  },
];

const feeTable = [
  { position: "회장", fee: "5,000만원 이상" },
  { position: "부회장", fee: "100만원" },
  { position: "감사", fee: "100만원" },
  { position: "자문위원", fee: "30만원" },
  { position: "상임이사", fee: "30만원" },
  { position: "이사", fee: "10만원" },
  { position: "고문", fee: "자율" },
];

const aboutSections = [
  {
    id: "history",
    title: "약사",
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        성균관대학교 총동창회는 성균관대학교 졸업생과 재학생의 친목 도모 및 모교 발전을 위해 설립된 단체입니다.
        유구한 600년 성균관의 전통을 계승하며, 동문 간의 네트워크를 강화하고 사회 발전에 기여하고 있습니다.
        총동창회는 국내외 다양한 지부와 함께 동문들의 소통과 협력을 이끌어가고 있습니다.
      </p>
    ),
  },
  {
    id: "timeline-overview",
    title: "연혁(개괄)",
    content: (
      <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
        <p>• 1398년 — 성균관 설립</p>
        <p>• 1946년 — 성균관대학 설립</p>
        <p>• 1953년 — 종합대학교 승격</p>
        <p>• 1965년 — 총동창회 설립</p>
        <p>• 1996년 — 삼성그룹 학교법인 인수</p>
        <p>• 2006년 — 글로벌 캠퍼스 시대 개막</p>
      </div>
    ),
  },
  {
    id: "timeline-detail",
    title: "주요 연혁(연도별)",
    content: (
      <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
        <p>• 1965년 — 총동창회 창립총회 개최</p>
        <p>• 1978년 — 동창회관 건립</p>
        <p>• 1990년 — 총동창회보 창간</p>
        <p>• 2000년 — 총동창회 웹사이트 개설</p>
        <p>• 2010년 — 해외 지부 확대 (미주, 유럽, 아시아)</p>
        <p>• 2020년 — 디지털 전환 및 온라인 동문 네트워크 구축</p>
        <p>• 2024년 — 임원수첩 앱 출시</p>
      </div>
    ),
  },
  {
    id: "presidents",
    title: "역대 회장 / 역대 총장",
    content: (
      <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
        <div>
          <h4 className="font-semibold text-foreground mb-1">역대 총동창회 회장</h4>
          <p>• 초대 — 김OO (1965~1970)</p>
          <p>• 2대 — 이OO (1970~1975)</p>
          <p>• 3대 — 박OO (1975~1980)</p>
          <p className="text-xs mt-1">※ 전체 목록은 홈페이지를 참고해주세요</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-1">역대 총장</h4>
          <p>• 초대 — 김OO (1946~1950)</p>
          <p>• 2대 — 이OO (1950~1955)</p>
          <p className="text-xs mt-1">※ 전체 목록은 홈페이지를 참고해주세요</p>
        </div>
      </div>
    ),
  },
  {
    id: "rules",
    title: "총동창회 회칙",
    content: (
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
        <p><strong className="text-foreground">제1조 (명칭)</strong> 본 회는 성균관대학교 총동창회라 칭한다.</p>
        <p><strong className="text-foreground">제2조 (목적)</strong> 본 회는 회원 상호간의 친목을 도모하고 모교의 발전에 기여함을 목적으로 한다.</p>
        <p><strong className="text-foreground">제3조 (회원)</strong> 본 회의 회원은 성균관대학교 졸업자 및 재학생으로 한다.</p>
        <p className="text-xs mt-2">※ 전문은 홈페이지를 참고해주세요</p>
      </div>
    ),
  },
  {
    id: "fees",
    title: "회비/임원분담금 납부 안내 및 혜택",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          총동창회 임원 기여금은 동창회 운영 및 모교 발전 기금으로 사용됩니다.
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th className="py-2.5 px-4 text-left font-semibold text-foreground">직급</th>
                <th className="py-2.5 px-4 text-right font-semibold text-foreground">기여금</th>
              </tr>
            </thead>
            <tbody>
              {feeTable.map((row) => (
                <tr key={row.position} className="border-b border-border last:border-0">
                  <td className="py-2.5 px-4 text-foreground">{row.position}</td>
                  <td className="py-2.5 px-4 text-right text-foreground">{row.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">혜택:</strong> 경조사 지원, 무료주차, 건강검진 할인, 총동창회보 수령 등
        </p>
      </div>
    ),
  },
  {
    id: "anthem",
    title: "교가 듣기",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">성균관대학교 교가</p>
        <div className="bg-muted rounded-lg p-4 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">🎵 오디오 플레이어 (준비 중)</p>
        </div>
      </div>
    ),
  },
];

function getRecentCommunityPosts() {
  const allPosts: { source: string; title: string; date: string; link: string }[] = [];
  [...CLUBS, ...RESEARCH_GROUPS].forEach((group) => {
    const basePath = group.type === "club" ? "/main/community/club" : "/main/community/research";
    group.posts.forEach((post) => {
      allPosts.push({
        source: group.name,
        title: post.title,
        date: post.date,
        link: `${basePath}/${group.id}`,
      });
    });
  });
  allPosts.push(
    { source: "협업 제안", title: "IT 시스템 구축 파트너 구합니다", date: "2026.03.22", link: "/main/community" },
    { source: "협업 제안", title: "강남 상업용 부동산 공동투자 제안", date: "2026.03.18", link: "/main/community" },
  );
  return allPosts.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
}

const HomePage = () => {
  const navigate = useNavigate();
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [idCardOpen, setIdCardOpen] = useState(false);

  const recentNotices = NEWS_ITEMS.filter((n) => n.type === "notice").slice(0, 3);
  const recentCommunity = getRecentCommunityPosts();

  const handleBenefitClick = (b: typeof benefits[0]) => {
    if (!b.ready) {
      toast.info("준비 중입니다");
      return;
    }
    window.open(b.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-8 animate-fade-in">

      {/* Section 1: Digital ID Card (preview + modal) */}
      <section>
        <button
          type="button"
          onClick={() => setIdCardOpen(true)}
          className="w-full flex items-center gap-4 p-4 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md hover:border-primary/40 active:scale-[0.99] transition-all cursor-pointer text-left"
          aria-label="신분증 펼쳐 보기"
        >
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold text-foreground truncate">{mockUser.name}</p>
            <p className="text-sm text-primary font-semibold truncate">{mockUser.position}</p>
          </div>
          <Maximize2 className="w-5 h-5 text-muted-foreground shrink-0" />
        </button>

        <Dialog open={idCardOpen} onOpenChange={setIdCardOpen}>
          <DialogContent
            className="max-w-full w-screen h-[100dvh] rounded-none border-0 p-0 left-0 top-0 translate-x-0 translate-y-0 sm:max-w-md sm:w-full sm:h-auto sm:rounded-lg sm:border sm:p-6 sm:left-[50%] sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] flex flex-col"
          >
            <DialogHeader className="px-6 pt-6 sm:px-0 sm:pt-0">
              <DialogTitle>디지털 신분증</DialogTitle>
            </DialogHeader>

            <div className="flex justify-center gap-2 mt-4 sm:mt-2">
              <button
                onClick={() => setIsHorizontal(true)}
                className={`px-4 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                  isHorizontal ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                가로형
              </button>
              <button
                onClick={() => setIsHorizontal(false)}
                className={`px-4 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                  !isHorizontal ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                세로형
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center px-4 py-6 sm:px-0 sm:py-4">
              {isHorizontal ? (
                <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-primary px-5 py-3 flex items-center justify-between">
                    <img src={skkuLogo} alt="SKKU" className="h-6 brightness-0 invert object-contain" />
                    <span className="text-primary-foreground text-xs font-medium">EXECUTIVE ID</span>
                  </div>
                  <div className="p-5 flex gap-5">
                    <div className="w-20 h-24 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-bold text-foreground">{mockUser.name}</p>
                      <p className="text-sm text-primary font-semibold mt-0.5">{mockUser.position}</p>
                      <p className="text-xs text-muted-foreground mt-1">{mockUser.dept} / {mockUser.year}학번</p>
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                          (03081) 서울시 종로구 율곡로 171, 204호(원남동, 글로벌센터)
                        </p>
                        <p className="text-[10px] text-primary mt-0.5">alumni.skku.edu</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-72 bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-primary px-5 py-4 text-center">
                    <img src={skkuLogo} alt="SKKU" className="h-6 brightness-0 invert mx-auto object-contain" />
                    <p className="text-primary-foreground text-[10px] mt-1.5 font-medium">
                      SUNGKYUNKWAN UNIVERSITY ALUMNI ASSOCIATION
                    </p>
                  </div>
                  <div className="p-6 text-center">
                    <div className="w-24 h-28 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-xl font-bold text-foreground">{mockUser.name}</p>
                    <p className="text-sm text-primary font-semibold mt-1">{mockUser.position}</p>
                    <p className="text-xs text-muted-foreground mt-1">{mockUser.dept} / {mockUser.year}학번</p>
                    <div className="mt-4 pt-4 border-t border-border text-left">
                      <p className="text-[10px] text-muted-foreground leading-relaxed">
                        (03081) 서울시 종로구 율곡로 171, 204호(원남동, 글로벌센터)
                      </p>
                      <p className="text-[10px] text-primary mt-1">https://alumni.skku.edu</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </section>

      {/* Section 2: Recent Notices */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-foreground">공지사항</h3>
          <button
            onClick={() => navigate("/main/news")}
            className="text-sm text-primary font-medium hover:underline flex items-center gap-0.5"
          >
            더보기 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {recentNotices.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/main/news/${item.id}`)}
              className="w-full text-left bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all"
            >
              <h4 className="text-sm font-semibold text-foreground line-clamp-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Section 3: Recent Community / Collab Posts */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-foreground">커뮤니티 소식</h3>
          <button
            onClick={() => navigate("/main/community")}
            className="text-sm text-primary font-medium hover:underline flex items-center gap-0.5"
          >
            더보기 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {recentCommunity.map((post, idx) => (
            <button
              key={idx}
              onClick={() => navigate(post.link)}
              className="w-full text-left bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{post.source}</Badge>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
              <h4 className="text-sm font-semibold text-foreground line-clamp-1">{post.title}</h4>
            </button>
          ))}
        </div>
      </section>

      {/* Section 4: Benefits */}
      <section>
        <h3 className="text-base font-bold text-foreground mb-3">납부자 혜택</h3>
        <div className="grid grid-cols-2 gap-3">
          {benefits.map((b) => (
            <button
              key={b.title}
              onClick={() => handleBenefitClick(b)}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all text-center"
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <b.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-foreground leading-tight">{b.title}</span>
              {!b.ready && <Badge variant="secondary" className="text-[10px]">준비 중</Badge>}
            </button>
          ))}
        </div>
      </section>

      {/* Section 5: About Alumni Association */}
      <section>
        <h3 className="text-base font-bold text-foreground mb-3">총동창회 소개</h3>
        <Accordion type="multiple" className="space-y-2">
          {aboutSections.map((section) => (
            <AccordionItem
              key={section.id}
              value={section.id}
              className="bg-card border border-border rounded-xl px-5 overflow-hidden"
            >
              <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                {section.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>자세한 내용은 총동창회 홈페이지를 참고해주세요</p>
          <a
            href="https://alumni.skku.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary font-medium mt-1 hover:underline"
          >
            alumni.skku.edu <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
