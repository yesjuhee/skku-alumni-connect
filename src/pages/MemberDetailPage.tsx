import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Mail, MapPin, Briefcase, Globe, User, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MEMBERS } from "@/data/members";

const MemberDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = MEMBERS.find((m) => m.id === id);

  if (!member) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">회원 정보를 찾을 수 없습니다.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/main/members")}>
          목록으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Back button */}
      <button onClick={() => navigate("/main/members")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" />
        임원정보
      </button>

      {/* Profile header */}
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
          <User className="w-12 h-12 text-muted-foreground" />
        </div>
        <div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">{member.name}</h1>
            <Badge>{member.position}</Badge>
          </div>
          <p className="text-muted-foreground mt-1">
            {member.department} · {member.admissionYear}학번 · {member.generation}
          </p>
        </div>
      </div>

      {/* Job info */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            직장 정보
          </h3>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <span className="text-muted-foreground">회사/기관명</span>
            <span className="text-foreground">{member.company}</span>
            <span className="text-muted-foreground">직위/직책</span>
            <span className="text-foreground">{member.jobTitle}</span>
            <span className="text-muted-foreground">업종</span>
            <span className="text-foreground">{member.industry}</span>
          </div>
        </CardContent>
      </Card>

      {/* Contact info */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            연락처
          </h3>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <span className="text-muted-foreground">전화번호</span>
            <a href={`tel:${member.phone}`} className="text-primary hover:underline">{member.phone}</a>
            <span className="text-muted-foreground">이메일</span>
            <a href={`mailto:${member.email}`} className="text-primary hover:underline break-all">{member.email}</a>
            <span className="text-muted-foreground">주소</span>
            <span className="text-foreground">{member.address}</span>
          </div>
        </CardContent>
      </Card>

      {/* Additional info */}
      {(member.hobby || member.website || member.prText) && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              추가 정보
            </h3>
            <div className="space-y-2 text-sm">
              {member.hobby && (
                <div className="grid grid-cols-[auto_1fr] gap-x-4">
                  <span className="text-muted-foreground">취미</span>
                  <span className="text-foreground">{member.hobby}</span>
                </div>
              )}
              {member.website && (
                <div className="grid grid-cols-[auto_1fr] gap-x-4">
                  <span className="text-muted-foreground">홈페이지</span>
                  <a href={member.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
                    {member.website}
                  </a>
                </div>
              )}
              {member.prText && (
                <div>
                  <p className="text-muted-foreground mb-1">자기(회사) PR</p>
                  <p className="text-foreground bg-muted/50 rounded-lg p-3">{member.prText}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        <Button asChild className="flex-1">
          <a href={`tel:${member.phone}`}>
            <Phone className="w-4 h-4 mr-1" />
            전화하기
          </a>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <a href={`mailto:${member.email}`}>
            <Mail className="w-4 h-4 mr-1" />
            이메일 보내기
          </a>
        </Button>
      </div>
    </div>
  );
};

export default MemberDetailPage;
