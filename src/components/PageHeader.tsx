import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
}

const PageHeader = ({ title, showBack = true }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 mb-6">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          aria-label="뒤로가기"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
      )}
      <h1 className="text-xl font-bold text-foreground">{title}</h1>
    </div>
  );
};

export default PageHeader;
