import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MEMBERS, FILTER_OPTIONS, type Member } from "@/data/members";
import { User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type FilterKey = "generation" | "position" | "department" | "industry" | "region";

const FILTER_LABELS: Record<FilterKey, string> = {
  generation: "기수",
  position: "직급",
  department: "학과",
  industry: "업종",
  region: "지역",
};

const positionOrder = FILTER_OPTIONS.position;

const MembersPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "year">("name");
  const [activeFilters, setActiveFilters] = useState<Record<FilterKey, string[]>>({
    generation: [],
    position: [],
    department: [],
    industry: [],
    region: [],
  });
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);

  const hasActiveFilters = Object.values(activeFilters).some((v) => v.length > 0);

  const toggleFilter = (key: FilterKey, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[key];
      return {
        ...prev,
        [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
      };
    });
  };

  const removeFilter = (key: FilterKey, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [key]: prev[key].filter((v) => v !== value),
    }));
  };

  const clearFilters = () => {
    setActiveFilters({ generation: [], position: [], department: [], industry: [], region: [] });
  };

  const getFilterOptions = (key: FilterKey): string[] => {
    if (key === "generation") return FILTER_OPTIONS.generationValues;
    return FILTER_OPTIONS[key];
  };

  const getFilterDisplayLabel = (key: FilterKey, value: string): string => {
    if (key === "generation") {
      const idx = FILTER_OPTIONS.generationValues.indexOf(value);
      return idx >= 0 ? FILTER_OPTIONS.generation[idx] : value;
    }
    return value;
  };

  const filtered = useMemo(() => {
    let result = MEMBERS.filter((m) => {
      const q = search.trim().toLowerCase();
      if (q && !m.name.includes(q) && !m.department.toLowerCase().includes(q) && !String(m.admissionYear).includes(q)) {
        return false;
      }
      if (activeFilters.generation.length && !activeFilters.generation.includes(m.generation)) return false;
      if (activeFilters.position.length && !activeFilters.position.includes(m.position)) return false;
      if (activeFilters.department.length && !activeFilters.department.includes(m.department)) return false;
      if (activeFilters.industry.length && !activeFilters.industry.includes(m.industry)) return false;
      if (activeFilters.region.length && !activeFilters.region.includes(m.region)) return false;
      return true;
    });

    result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name, "ko");
      return a.admissionYear - b.admissionYear;
    });

    return result;
  }, [search, activeFilters, sortBy]);

  const FilterPills = () => (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(FILTER_LABELS) as FilterKey[]).map((key) => (
        <DropdownMenu key={key}>
          <DropdownMenuTrigger asChild>
            <button
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                activeFilters[key].length > 0
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-foreground/30"
              }`}
            >
              {FILTER_LABELS[key]}
              {activeFilters[key].length > 0 && (
                <span className="ml-0.5 bg-primary-foreground/20 rounded-full px-1.5 text-xs">
                  {activeFilters[key].length}
                </span>
              )}
              <ChevronDown className="w-3 h-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-60 overflow-y-auto">
            {getFilterOptions(key).map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => toggleFilter(key, option)}
                className={activeFilters[key].includes(option) ? "bg-accent font-semibold" : ""}
              >
                {key === "generation" ? getFilterDisplayLabel(key, option) : option}
                {activeFilters[key].includes(option) && <span className="ml-auto text-primary">✓</span>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
  );

  const ActiveFilterTags = () => {
    const tags: { key: FilterKey; value: string }[] = [];
    (Object.keys(activeFilters) as FilterKey[]).forEach((key) => {
      activeFilters[key].forEach((value) => tags.push({ key, value }));
    });
    if (tags.length === 0) return null;

    return (
      <div className="flex flex-wrap items-center gap-1.5">
        {tags.map(({ key, value }) => (
          <Badge key={`${key}-${value}`} variant="secondary" className="gap-1 pr-1">
            {getFilterDisplayLabel(key, value)}
            <button onClick={() => removeFilter(key, value)} className="hover:text-destructive">
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
        <button onClick={clearFilters} className="text-xs text-primary hover:underline ml-1">
          초기화
        </button>
      </div>
    );
  };

  const MemberCard = ({ member }: { member: Member }) => (
    <button
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
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="이름, 학과, 학번으로 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Filters */}
      <FilterPills />
      <ActiveFilterTags />

      {/* Sort + count */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">총 {filtered.length}명</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-sm text-muted-foreground flex items-center gap-1 hover:text-foreground">
              {sortBy === "name" ? "이름순" : "학번순"}
              <ChevronDown className="w-3 h-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortBy("name")} className={sortBy === "name" ? "font-semibold" : ""}>
              이름순
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("year")} className={sortBy === "year" ? "font-semibold" : ""}>
              학번순
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Member cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg font-medium">검색 결과가 없습니다</p>
          <p className="text-sm mt-1">검색어나 필터를 변경해보세요</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MembersPage;
