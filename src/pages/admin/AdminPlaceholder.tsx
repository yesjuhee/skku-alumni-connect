import { toast } from "sonner";

const AdminPlaceholder = ({ title }: { title: string }) => (
  <div className="max-w-4xl">
    <h1 className="text-2xl font-bold text-foreground mb-4">{title}</h1>
    <div className="bg-card border border-border rounded-xl p-12 text-center">
      <p className="text-muted-foreground">이 페이지는 준비 중입니다.</p>
    </div>
  </div>
);

export default AdminPlaceholder;
