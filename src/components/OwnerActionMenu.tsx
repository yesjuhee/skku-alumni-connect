import { useState } from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteOwnTarget, type TargetKind } from "@/data/reports";

interface OwnerActionMenuProps {
  targetKind: TargetKind;
  targetId: string;
  className?: string;
  triggerSize?: "sm" | "md";
  onDeleted?: () => void;
}

const OwnerActionMenu = ({
  targetKind,
  targetId,
  className,
  triggerSize = "md",
  onDeleted,
}: OwnerActionMenuProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const sizeClass = triggerSize === "sm" ? "w-7 h-7" : "w-8 h-8";
  const iconClass = "w-4 h-4";

  const handleDelete = () => {
    deleteOwnTarget(targetKind, targetId);
    toast.success("게시물이 삭제되었습니다");
    setConfirmOpen(false);
    onDeleted?.();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            aria-label="더보기"
            className={`${sizeClass} rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors ${className ?? ""}`}
          >
            <MoreHorizontal className={iconClass} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44" onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setConfirmOpen(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>이 게시물을 삭제할까요?</AlertDialogTitle>
            <AlertDialogDescription>
              삭제한 게시물은 복구할 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OwnerActionMenu;
