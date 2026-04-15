import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import skkuLogo from "@/assets/skku-alumni-logo.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-5">
      <div className="w-full max-w-sm text-center animate-fade-in">
        <div className="mb-10">
          <img
            src={skkuLogo}
            alt="성균관대학교 총동창회"
            className="h-16 mx-auto mb-6 object-contain"
          />
          <div className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
            임원수첩
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <Button
            onClick={() => navigate("/login")}
            className="w-full h-13 text-base font-semibold"
            size="lg"
          >
            로그인
          </Button>
          <Button
            onClick={() => navigate("/register/verify")}
            variant="outline"
            className="w-full h-13 text-base font-semibold border-primary text-primary hover:bg-secondary"
            size="lg"
          >
            회원가입
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          회비 납부자만 이용 가능합니다
        </p>
      </div>
    </div>
  );
};

export default Landing;
