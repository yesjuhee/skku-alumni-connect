import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LICENSES } from "@/data/licenses";

const OpenSourceLicensePage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        뒤로
      </button>

      <div>
        <h1 className="text-xl font-bold text-foreground">오픈소스 라이선스</h1>
        <p className="text-sm text-muted-foreground mt-1">
          본 앱은 다음 오픈소스 소프트웨어를 사용합니다. 각 라이브러리의 저작권 및 라이선스 전문은 해당 프로젝트의 공식 페이지를 참조해 주세요.
        </p>
      </div>

      <div className="space-y-2">
        {LICENSES.map((entry) => (
          <Card key={entry.name}>
            <CardContent className="p-4 flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-foreground">{entry.name}</p>
                  <span className="text-xs text-muted-foreground">v{entry.version}</span>
                  <Badge variant="secondary" className="text-[10px]">
                    {entry.license}
                  </Badge>
                </div>
                {entry.copyright && (
                  <p className="text-xs text-muted-foreground mt-1 break-words">
                    {entry.copyright}
                  </p>
                )}
              </div>
              {entry.homepage && (
                <a
                  href={entry.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${entry.name} 홈페이지 열기`}
                  className="shrink-0 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center pt-4 pb-2">
        라이선스 목록은 빌드 시점 기준이며, 일부 의존성은 표기되지 않을 수 있습니다.
      </p>
    </div>
  );
};

export default OpenSourceLicensePage;
