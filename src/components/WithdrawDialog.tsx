import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CONFIRM_PHRASE = "탈퇴합니다";

const WithdrawDialog = ({ open, onOpenChange }: WithdrawDialogProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [agreed, setAgreed] = useState(false);
  const [phrase, setPhrase] = useState("");

  const reset = () => {
    setStep(1);
    setAgreed(false);
    setPhrase("");
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const handleNext = () => {
    if (!agreed) {
      toast.error("안내 사항에 동의해주세요");
      return;
    }
    setStep(2);
  };

  const handleConfirm = () => {
    if (phrase.trim() !== CONFIRM_PHRASE) {
      toast.error(`"${CONFIRM_PHRASE}"를 정확히 입력해주세요`);
      return;
    }
    toast.success("회원 탈퇴가 완료되었습니다");
    reset();
    onOpenChange(false);
    navigate("/login");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-destructive">회원 탈퇴</DialogTitle>
          <DialogDescription>
            {step === 1
              ? "탈퇴 전 아래 안내를 확인해주세요"
              : "탈퇴를 위해 확인 문구를 입력해주세요"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-4">
            <ul className="text-sm text-foreground space-y-2 list-disc pl-5">
              <li>회원님이 작성한 게시물·댓글이 모두 삭제됩니다.</li>
              <li>프로필 정보가 삭제되어 다른 동문에게 더 이상 노출되지 않습니다.</li>
              <li>탈퇴 후에는 동일 계정으로 다시 로그인할 수 없습니다.</li>
              <li>이미 납부한 회비는 환불되지 않으며, 사무처(02-760-1290)로 별도 문의해주세요.</li>
            </ul>
            <label className="flex items-start gap-2 cursor-pointer">
              <Checkbox
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
                className="mt-0.5"
              />
              <span className="text-sm text-foreground">
                위 안내 사항을 모두 확인했으며 탈퇴에 동의합니다.
              </span>
            </label>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              계속 진행하시려면 아래 입력란에 <span className="font-semibold text-destructive">{CONFIRM_PHRASE}</span>를 입력해주세요.
            </p>
            <div>
              <Label className="text-xs">확인 문구</Label>
              <Input
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                placeholder={CONFIRM_PHRASE}
                className="mt-1"
                autoFocus
              />
            </div>
          </div>
        )}

        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end gap-2">
          {step === 1 ? (
            <>
              <Button variant="outline" onClick={() => handleOpenChange(false)}>
                취소
              </Button>
              <Button
                onClick={handleNext}
                disabled={!agreed}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                다음
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setStep(1)}>
                이전
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={phrase.trim() !== CONFIRM_PHRASE}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                탈퇴하기
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawDialog;
