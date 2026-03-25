export interface Member {
  id: string;
  name: string;
  department: string;
  admissionYear: number;
  position: string;
  generation: string;
  company: string;
  jobTitle: string;
  industry: string;
  region: string;
  phone: string;
  email: string;
  address: string;
  hobby: string;
  website: string;
  prText: string;
  profileImage?: string;
}

export const MEMBERS: Member[] = [
  { id: "1", name: "조창식", department: "IMBA", admissionYear: 2007, position: "부회장", generation: "제40대", company: "(주)글로벌투자", jobTitle: "대표이사", industry: "금융/보험업", region: "서울", phone: "010-1234-5678", email: "cho@globalinvest.co.kr", address: "서울시 강남구 테헤란로 123", hobby: "골프, 독서", website: "https://globalinvest.co.kr", prText: "글로벌 투자 전문기업으로 해외 부동산 및 금융상품 투자를 선도합니다." },
  { id: "2", name: "김영수", department: "경영학과", admissionYear: 1986, position: "상임이사", generation: "제40대", company: "성균테크", jobTitle: "대표이사", industry: "전기/정보통신", region: "서울", phone: "010-2345-6789", email: "kim@sktech.co.kr", address: "서울시 종로구 율곡로 25", hobby: "등산, 바둑", website: "", prText: "IT 솔루션 및 컨설팅 전문 기업입니다." },
  { id: "3", name: "이정민", department: "법학과", admissionYear: 1982, position: "부회장", generation: "제40대", company: "법무법인 정의", jobTitle: "대표변호사", industry: "공무원/회사원/협회/단체", region: "서울", phone: "010-3456-7890", email: "lee@justice-law.co.kr", address: "서울시 서초구 서초대로 200", hobby: "와인, 클래식음악", website: "https://justice-law.co.kr", prText: "30년 전통의 종합 법률서비스를 제공합니다." },
  { id: "4", name: "박서연", department: "건축학과", admissionYear: 1990, position: "이사", generation: "제40대", company: "한빛건설", jobTitle: "전무이사", industry: "건설/건축/부동산업", region: "경기", phone: "010-4567-8901", email: "park@hanbit.co.kr", address: "경기도 성남시 분당구 판교로 50", hobby: "사진촬영, 여행", website: "", prText: "친환경 건축 설계 및 시공 전문기업입니다." },
  { id: "5", name: "최동우", department: "경제학과", admissionYear: 1988, position: "상임이사", generation: "제40대", company: "우리은행", jobTitle: "부행장", industry: "금융/보험업", region: "서울", phone: "010-5678-9012", email: "choi@wooribank.com", address: "서울시 중구 소공로 51", hobby: "마라톤, 독서", website: "", prText: "" },
  { id: "6", name: "정미영", department: "행정학과", admissionYear: 1985, position: "자문위원", generation: "제40대", company: "서울시청", jobTitle: "국장", industry: "공무원/회사원/협회/단체", region: "서울", phone: "010-6789-0123", email: "jung@seoul.go.kr", address: "서울시 중구 세종대로 110", hobby: "요가, 서예", website: "", prText: "서울시 도시계획 분야에서 30년간 근무하고 있습니다." },
  { id: "7", name: "한상철", department: "의학과", admissionYear: 1980, position: "고문", generation: "제40대", company: "성균병원", jobTitle: "원장", industry: "예술/스포츠/보건/의료업", region: "대구", phone: "010-7890-1234", email: "han@skkhospital.co.kr", address: "대구시 수성구 달구벌대로 1234", hobby: "낚시, 골프", website: "https://skkhospital.co.kr", prText: "지역사회 건강증진에 힘쓰는 종합병원입니다." },
  { id: "8", name: "윤하린", department: "컴퓨터공학과", admissionYear: 1992, position: "이사", generation: "제40대", company: "넥스트소프트", jobTitle: "CTO", industry: "전기/정보통신", region: "경기", phone: "010-8901-2345", email: "yoon@nextsoft.io", address: "경기도 성남시 분당구 판교역로 166", hobby: "코딩, 게임", website: "https://nextsoft.io", prText: "AI 기반 소프트웨어 솔루션을 개발합니다." },
  { id: "9", name: "강태준", department: "경영학과", admissionYear: 1978, position: "감사", generation: "제40대", company: "강태준회계법인", jobTitle: "대표", industry: "금융/보험업", region: "서울", phone: "010-9012-3456", email: "kang@ktjcpa.co.kr", address: "서울시 영등포구 여의대로 108", hobby: "등산", website: "", prText: "40년 경력의 회계·세무 전문 법인입니다." },
  { id: "10", name: "송미래", department: "경제학과", admissionYear: 1995, position: "이사", generation: "제40대", company: "미래에셋", jobTitle: "팀장", industry: "금융/보험업", region: "서울", phone: "010-0123-4567", email: "song@miraeasset.com", address: "서울시 중구 을지로 76", hobby: "요리, 와인", website: "", prText: "" },
  { id: "11", name: "오준혁", department: "행정학과", admissionYear: 1983, position: "상임이사", generation: "제40대", company: "교육부", jobTitle: "과장", industry: "교육/연구개발업", region: "세종", phone: "010-1111-2222", email: "oh@moe.go.kr", address: "세종시 도움6로 11", hobby: "독서, 테니스", website: "", prText: "교육 정책 수립 및 연구를 담당하고 있습니다." },
  { id: "12", name: "임소정", department: "IMBA", admissionYear: 2010, position: "이사", generation: "제41대", company: "삼성전자", jobTitle: "부장", industry: "제조업", region: "경기", phone: "010-3333-4444", email: "lim@samsung.com", address: "경기도 수원시 영통구 삼성로 129", hobby: "필라테스, 독서", website: "", prText: "반도체 사업부 전략기획을 담당하고 있습니다." },
];

export const FILTER_OPTIONS = {
  generation: ["제40대(2026~2027년)", "제41대(2028~2029년)"],
  generationValues: ["제40대", "제41대"],
  position: ["고문", "회장", "총괄부회장", "감사", "사무총장", "운영위원회", "자문위원", "부회장", "상임이사", "이사"],
  department: ["경영학과", "법학과", "컴퓨터공학과", "건축학과", "경제학과", "행정학과", "의학과", "전자공학과", "화학공학과", "IMBA"],
  industry: ["농업/광업/수산업/목축업", "제조업", "유통/물류/도소매업", "건설/건축/부동산업", "숙박/음식점/서비스업", "금융/보험업", "전기/정보통신", "교육/연구개발업", "예술/스포츠/보건/의료업", "공무원/회사원/협회/단체"],
  region: ["서울", "경기", "인천", "부산", "대구", "대전", "광주", "울산", "세종", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주", "해외"],
};
