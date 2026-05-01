import { useSyncExternalStore } from "react";

export type TargetKind = "communityPost" | "businessPost" | "memberProfile";
export type ReportStatus = "pending" | "resolved" | "rejected";

export type ReportReason =
  | "spam"
  | "abuse"
  | "obscene"
  | "fraud"
  | "privacy"
  | "copyright"
  | "other";

export interface ReportRecord {
  id: string;
  targetKind: TargetKind;
  targetId: string;
  targetSnapshot: {
    title?: string;
    content: string;
    authorName: string;
  };
  reportedAuthorMemberId: string;
  reporterMemberId: string;
  reporterName: string;
  reason: ReportReason;
  detail?: string;
  status: ReportStatus;
  createdAt: string;
  resolvedAt?: string;
  adminMemo?: string;
}

export interface BlockRecord {
  blockerMemberId: string;
  blockedMemberId: string;
  blockedName: string;
  createdAt: string;
}

interface DeletedTarget {
  targetKind: TargetKind;
  targetId: string;
}

interface ReportStore {
  reports: ReportRecord[];
  blocks: BlockRecord[];
  deleted: DeletedTarget[];
}

const initialReports: ReportRecord[] = [
  {
    id: "r1",
    targetKind: "businessPost",
    targetId: "b2",
    targetSnapshot: {
      title: "강남 상업용 부동산 공동투자 제안",
      content: "강남역 인근 상업용 부동산 공동투자 기회…",
      authorName: "박서연",
    },
    reportedAuthorMemberId: "4",
    reporterMemberId: "5",
    reporterName: "최동우",
    reason: "fraud",
    detail: "투자 수익률이 비현실적으로 높게 표기되어 있어 사기성 게시글로 의심됩니다.",
    status: "pending",
    createdAt: "2026-04-29T10:23:00.000Z",
  },
  {
    id: "r2",
    targetKind: "communityPost",
    targetId: "cp2",
    targetSnapshot: {
      title: "2월 라운딩 결과 및 사진",
      content: "2월 정기 라운딩이 성황리에 마무리되었습니다…",
      authorName: "이우진",
    },
    reportedAuthorMemberId: "1",
    reporterMemberId: "9",
    reporterName: "강태준",
    reason: "privacy",
    detail: "사진에 동의 없이 제 얼굴이 노출되었습니다.",
    status: "pending",
    createdAt: "2026-04-30T14:05:00.000Z",
  },
  {
    id: "r3",
    targetKind: "memberProfile",
    targetId: "8",
    targetSnapshot: {
      content: "AI 기반 소프트웨어 솔루션을 개발합니다.",
      authorName: "윤하린",
    },
    reportedAuthorMemberId: "8",
    reporterMemberId: "2",
    reporterName: "김영수",
    reason: "spam",
    detail: "프로필 PR 글이 광고성으로 보입니다.",
    status: "resolved",
    createdAt: "2026-04-20T09:11:00.000Z",
    resolvedAt: "2026-04-20T18:30:00.000Z",
    adminMemo: "광고성 표현 일부 삭제 안내, 게시 유지.",
  },
];

const store: ReportStore = {
  reports: [...initialReports],
  blocks: [],
  deleted: [],
};

const listeners = new Set<() => void>();

const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

const emit = () => {
  listeners.forEach((l) => l());
};

const snapshot = () => store;

export const useReportStore = <T,>(selector: (s: ReportStore) => T): T =>
  useSyncExternalStore(
    subscribe,
    () => selector(snapshot()),
    () => selector(snapshot()),
  );

const newId = (prefix: string) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export const addReport = (input: {
  targetKind: TargetKind;
  targetId: string;
  targetSnapshot: ReportRecord["targetSnapshot"];
  reportedAuthorMemberId: string;
  reporterMemberId: string;
  reporterName: string;
  reason: ReportReason;
  detail?: string;
}) => {
  store.reports = [
    {
      id: newId("r"),
      status: "pending",
      createdAt: new Date().toISOString(),
      ...input,
    },
    ...store.reports,
  ];
  emit();
};

export const resolveReport = (
  reportId: string,
  next: { status: Extract<ReportStatus, "resolved" | "rejected">; adminMemo?: string; deleteTarget?: boolean },
) => {
  const target = store.reports.find((r) => r.id === reportId);
  if (!target) return;
  store.reports = store.reports.map((r) =>
    r.id === reportId
      ? {
          ...r,
          status: next.status,
          adminMemo: next.adminMemo,
          resolvedAt: new Date().toISOString(),
        }
      : r,
  );
  if (next.deleteTarget) {
    store.deleted = [
      ...store.deleted,
      { targetKind: target.targetKind, targetId: target.targetId },
    ];
  }
  emit();
};

export const isTargetDeleted = (kind: TargetKind, id: string) =>
  store.deleted.some((d) => d.targetKind === kind && d.targetId === id);

export const deleteOwnTarget = (kind: TargetKind, id: string) => {
  if (store.deleted.some((d) => d.targetKind === kind && d.targetId === id)) return;
  store.deleted = [...store.deleted, { targetKind: kind, targetId: id }];
  emit();
};

export const addBlock = (input: {
  blockerMemberId: string;
  blockedMemberId: string;
  blockedName: string;
}) => {
  if (input.blockerMemberId === input.blockedMemberId) return;
  if (
    store.blocks.some(
      (b) =>
        b.blockerMemberId === input.blockerMemberId &&
        b.blockedMemberId === input.blockedMemberId,
    )
  ) {
    return;
  }
  store.blocks = [
    ...store.blocks,
    { ...input, createdAt: new Date().toISOString() },
  ];
  emit();
};

export const removeBlock = (blockerMemberId: string, blockedMemberId: string) => {
  store.blocks = store.blocks.filter(
    (b) => !(b.blockerMemberId === blockerMemberId && b.blockedMemberId === blockedMemberId),
  );
  emit();
};

export const isBlocked = (blockerMemberId: string, blockedMemberId: string) =>
  store.blocks.some(
    (b) => b.blockerMemberId === blockerMemberId && b.blockedMemberId === blockedMemberId,
  );

export const selectReports = (s: ReportStore) => s.reports;
export const selectBlocks = (s: ReportStore) => s.blocks;
export const selectDeleted = (s: ReportStore) => s.deleted;
export const selectPendingReportCount = (s: ReportStore) =>
  s.reports.filter((r) => r.status === "pending").length;
