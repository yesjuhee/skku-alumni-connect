import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileSpreadsheet, CheckCircle2, XCircle, AlertTriangle, Download } from "lucide-react";
import { toast } from "sonner";

interface UploadResult {
  total: number;
  success: number;
  failed: number;
  duplicate: number;
  errors: { row: number; name: string; reason: string }[];
  duplicates: { row: number; name: string; existing: string }[];
}

const AdminUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);

  const simulateUpload = () => {
    setUploadResult({
      total: 150,
      success: 145,
      failed: 5,
      duplicate: 3,
      errors: [
        { row: 12, name: "홍길순", reason: "연락처 형식 오류" },
        { row: 34, name: "김철수", reason: "학과/학부 미입력" },
        { row: 56, name: "이영미", reason: "입학년도 범위 초과" },
        { row: 89, name: "박지성", reason: "성명 미입력" },
        { row: 112, name: "최유리", reason: "직급 값 오류" },
      ],
      duplicates: [
        { row: 7, name: "조창식", existing: "IMBA, 2007학번" },
        { row: 45, name: "김영수", existing: "경영학과, 1986학번" },
        { row: 98, name: "이정민", existing: "법학과, 1982학번" },
      ],
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    simulateUpload();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-foreground">엑셀 업로드</h1>

      {/* Upload guide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">업로드 양식 안내</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm space-y-1">
            <p className="font-medium text-foreground">필수 컬럼:</p>
            <p className="text-muted-foreground">성명, 학과/학부, 입학년도, 연락처, 직급, 기수</p>
            <p className="font-medium text-foreground mt-2">선택 컬럼:</p>
            <p className="text-muted-foreground">이메일, 기여금 납부 여부</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.success("양식 파일이 다운로드됩니다 (mock)")}>
              <Download className="w-4 h-4 mr-1" />
              양식 다운로드
            </Button>
            <p className="text-xs text-muted-foreground self-center">지원 형식: .xlsx, .xls, .csv</p>
          </div>
        </CardContent>
      </Card>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={simulateUpload}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        }`}
      >
        <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
        <p className="text-foreground font-medium">파일을 드래그하거나 클릭하여 업로드</p>
        <p className="text-sm text-muted-foreground mt-1">.xlsx, .xls, .csv 파일 지원</p>
      </div>

      {/* Upload result */}
      {uploadResult && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-4 gap-3">
            <Card>
              <CardContent className="p-3 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">전체</p>
                  <p className="font-bold text-foreground">{uploadResult.total}건</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-xs text-muted-foreground">성공</p>
                  <p className="font-bold text-green-600">{uploadResult.success}건</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-xs text-muted-foreground">실패</p>
                  <p className="font-bold text-red-500">{uploadResult.failed}건</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-xs text-muted-foreground">중복</p>
                  <p className="font-bold text-orange-500">{uploadResult.duplicate}건</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Error table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-600">실패 항목 ({uploadResult.failed}건)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>행 번호</TableHead>
                    <TableHead>이름</TableHead>
                    <TableHead>사유</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploadResult.errors.map((e) => (
                    <TableRow key={e.row}>
                      <TableCell>{e.row}</TableCell>
                      <TableCell>{e.name}</TableCell>
                      <TableCell className="text-red-600">{e.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Duplicate table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-orange-600">중복 항목 ({uploadResult.duplicate}건)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>행 번호</TableHead>
                    <TableHead>이름</TableHead>
                    <TableHead>기존 회원 정보</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploadResult.duplicates.map((d) => (
                    <TableRow key={d.row}>
                      <TableCell>{d.row}</TableCell>
                      <TableCell>{d.name}</TableCell>
                      <TableCell className="text-orange-600">{d.existing}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setUploadResult(null)}>취소</Button>
            <Button onClick={() => { toast.success("145건이 등록되었습니다 (mock)"); setUploadResult(null); }}>확인 및 등록</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUpload;
