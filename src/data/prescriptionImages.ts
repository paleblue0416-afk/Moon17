import { InteriorMood, RoomType, TPOType, SynergyDirection } from '../types';

// AI Generated Local Prescription Assets
import localWarmwood from '../assets/images/rx_interior_warmwood_1789626793535.jpg';
import localFloorplan from '../assets/images/rx_floorplan_layout_1789626826773.jpg';
import localFashionLookbook from '../assets/images/rx_fashion_lookbook_1789626808432.jpg';
import localCrossMoodSync from '../assets/images/rx_crossmood_sync_1789626840338.jpg';

export interface PrescriptionImageItem {
  id: string;
  tag: string; // e.g. "처방 이미지 1: 60:30:10 톤앤매너 렌더"
  title: string;
  url: string;
  caption: string;
  aspectRatio?: '4:3' | '16:9' | '1:1' | '3:4';
  specs?: { label: string; value: string }[];
}

export function getInteriorPrescriptionImages(mood: InteriorMood, roomType: RoomType): PrescriptionImageItem[] {
  // Curated mood-specific multi-image prescription gallery
  const moodGalleries: Record<InteriorMood, PrescriptionImageItem[]> = {
    natural_warm_wood: [
      {
        id: 'rx-int-1',
        tag: '처방 이미지 01 : 톤앤매너 마스터 렌더',
        title: '내추럴 웜 우드 & 60:30:10 완성 렌더컷',
        url: localWarmwood,
        caption: '참나무 가구의 따스한 결(30%)과 크림 아이보리 패브릭(60%), 세이지 그린 플랜테리어(10%)가 결합된 이상적 무드',
        aspectRatio: '4:3',
        specs: [
          { label: '주조색 60%', value: '#F4EFE6 (크림)' },
          { label: '보조색 30%', value: '#B8976C (오크)' },
          { label: '포인트 10%', value: '#5B705B (세이지)' }
        ]
      },
      {
        id: 'rx-int-2',
        tag: '처방 이미지 02 : 가구 재배치 & 개방감 2D/3D 플랜',
        title: '동선 개방형 가구 재배치 모식도',
        url: localFloorplan,
        caption: '창가 자연광을 데스크 측면으로 유도하고 침대와 생활 공간을 수납장으로 분리해 시각적 개방감 극대화',
        aspectRatio: '4:3',
        specs: [
          { label: '동선 체감', value: '+35% 확장' },
          { label: '가구 배치', value: 'L자형 순환 동선' }
        ]
      },
      {
        id: 'rx-int-3',
        tag: '처방 이미지 03 : 색온도 2700K 앰비언트 조명',
        title: '2700K 전구색 간접 조명 & 무드 스탠드 연출컷',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
        caption: '형광등 직접조명을 끄고 벽면 반사 간접광과 E26 2700K 스탠드로 밤시간 눈의 피로를 덜어주는 무드 처방',
        aspectRatio: '4:3',
        specs: [
          { label: '색온도', value: '2700K 전구색' },
          { label: '연색성(CRI)', value: 'Ra 90 이상 권장' }
        ]
      },
      {
        id: 'rx-int-4',
        tag: '처방 이미지 04 : 패브릭 & 단모 러그 텍스처',
        title: '무표백 천연 린넨 침구 & 오트밀 사이잘룩 러그',
        url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1000&q=80',
        caption: '바닥의 차가운 톤을 차단하고 발에 닿는 촉감과 시각적 아늑함을 배가시키는 텍스처 큐레이션',
        aspectRatio: '4:3',
        specs: [
          { label: '소재', value: '천연 린넨 100%' },
          { label: '관리', value: '물세탁 가능 단모' }
        ]
      },
      {
        id: 'rx-int-5',
        tag: '처방 이미지 05 : 시각적 노이즈 감축 & 데스크테리어',
        title: '케이블 언더데스크 트레이 & 플랜트 포인트',
        url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
        caption: '멀티탭과 충전선을 책상 하부로 완전 매립하여 시야에서 전선을 100% 배제한 클린 데스크',
        aspectRatio: '4:3',
        specs: [
          { label: '노이즈 감축', value: '전선 100% 매립' },
          { label: '추천 식물', value: '몬스테라 / 극락조' }
        ]
      }
    ],
    midcentury: [
      {
        id: 'rx-int-1',
        tag: '처방 이미지 01 : 톤앤매너 마스터 렌더',
        title: '미드센추리 모던 & 다크 월넛 마스터 렌더컷',
        url: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=1000&q=80',
        caption: '짙은 월넛 원목과 매트 블랙 스틸, 바우하우스 오렌지/코발트 블루가 조화로운 스튜디오 렌더',
        aspectRatio: '4:3',
        specs: [
          { label: '주조색 60%', value: '#ECE7DC (에크루)' },
          { label: '보조색 30%', value: '#4A3528 (월넛)' },
          { label: '포인트 10%', value: '#E75A24 (오렌지)' }
        ]
      },
      {
        id: 'rx-int-2',
        tag: '처방 이미지 02 : 가구 재배치 & 개방감 2D/3D 플랜',
        title: '월넛 데스크 중심의 몰입형 서재 플로어플랜',
        url: localFloorplan,
        caption: '벽을 등지고 방 전체를 조망하는 독립형 데스크 배치로 화상미팅 카메라 뒷배경까지 통제',
        aspectRatio: '4:3',
        specs: [
          { label: '배치 유형', value: 'Executive Centered' },
          { label: '카메라 앵글', value: '정돈된 선반 배경' }
        ]
      },
      {
        id: 'rx-int-3',
        tag: '처방 이미지 03 : 크롬 스틸 & 조명 연출',
        title: '3000K 웜화이트 머쉬룸 스탠드 & 아치형 조명',
        url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
        caption: '크롬 스틸의 모던한 반사광과 유리 글로브 조명으로 레트로한 위트를 더하는 조명 처방',
        aspectRatio: '4:3',
        specs: [
          { label: '색온도', value: '3000K 웜화이트' },
          { label: '디자인', value: '바우하우스 스틸 라인' }
        ]
      },
      {
        id: 'rx-int-4',
        tag: '처방 이미지 04 : 디자인 체어 & 기하학 러그',
        title: '바우하우스 캔틸레버 체어 & 체커보드 포인트',
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
        caption: '철제 튜블러 프레임 체어와 미니멀한 러그 매치로 밋밋한 바닥에 예술적 리듬감 부여',
        aspectRatio: '4:3',
        specs: [
          { label: '소재', value: '스틸 파이프 + 레더' },
          { label: '내구성', value: '오피스 급 고강도' }
        ]
      }
    ],
    minimal_white: [
      {
        id: 'rx-int-1',
        tag: '처방 이미지 01 : 톤앤매너 마스터 렌더',
        title: '미니멀 화이트 & 여백의 미학 렌더컷',
        url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=80',
        caption: '벽면과 천장의 경계를 지워 공간 체감 면적을 1.4배 넓어 보이게 하는 순백의 인테리어',
        aspectRatio: '4:3',
        specs: [
          { label: '주조색 60%', value: '#FAFAFA (퓨어 화이트)' },
          { label: '보조색 30%', value: '#D4D4D8 (소프트 그레이)' },
          { label: '포인트 10%', value: '#18181B (매트 블랙)' }
        ]
      },
      {
        id: 'rx-int-2',
        tag: '처방 이미지 02 : 가구 재배치 & 개방감 2D/3D 플랜',
        title: '시각적 노이즈를 0으로 줄이는 빌트인 플로어플랜',
        url: localFloorplan,
        caption: '낮은 가구 높이(Low Profile)로 시선을 낮추고 바닥 노출 면적을 극대화한 미니멀 평면',
        aspectRatio: '4:3',
        specs: [
          { label: '개방감', value: '바닥 가시 면적 70%+' },
          { label: '수납', value: '도어형 히든 수납' }
        ]
      },
      {
        id: 'rx-int-3',
        tag: '처방 이미지 03 : 은은한 라인 조명 & 미니멀 펜던트',
        title: '3500K 다운라이트 & 간접 라인 조명 연출컷',
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
        caption: '돌출된 조명 기구를 최소화하고 벽면을 부드럽게 씻어내리는 월워셔 라이팅 기법 적용',
        aspectRatio: '4:3',
        specs: [
          { label: '조명 방식', value: '슬림 마그네틱 트랙' },
          { label: '빛 퍼짐', value: '그라데이션 월워셔' }
        ]
      },
      {
        id: 'rx-int-4',
        tag: '처방 이미지 04 : 모노톤 패브릭 & 오브제',
        title: '매트 블랙 슬림 체어 & 질감 있는 린넨 커튼',
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
        caption: '단색 공간 속에서 단조로움을 깨는 거친 린넨 패브릭 텍스처와 슬림한 철제 라인의 조화',
        aspectRatio: '4:3',
        specs: [
          { label: '포인트', value: '블랙 라인 실루엣' },
          { label: '텍스처', value: '슬러브 린넨' }
        ]
      }
    ],
    japandi: [
      {
        id: 'rx-int-1',
        tag: '처방 이미지 01 : 톤앤매너 마스터 렌더',
        title: '자팬디 (Japandi) 선(禪)적 미학 렌더컷',
        url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
        caption: '북유럽의 실용적 가구와 일본의 와비사비 토기, 한지 조명이 결합된 평온한 침실',
        aspectRatio: '4:3',
        specs: [
          { label: '주조색 60%', value: '#EDE8DF (오트밀)' },
          { label: '보조색 30%', value: '#9E9484 (애쉬 우드)' },
          { label: '포인트 10%', value: '#3E423A (모스 그린)' }
        ]
      },
      {
        id: 'rx-int-2',
        tag: '처방 이미지 02 : 저상형 침대 & 가구 플로어플랜',
        title: '저상형 침대와 여백을 살린 로우 프로파일 플랜',
        url: localFloorplan,
        caption: '좌식과 입식의 중간 높이로 천장고를 높아 보이게 연출하고 벽면 포스터 대신 족자형 여백 배치',
        aspectRatio: '4:3',
        specs: [
          { label: '가구 높이', value: '바닥 35cm 저상형' },
          { label: '천장 체감', value: '+20cm 상승 효과' }
        ]
      },
      {
        id: 'rx-int-3',
        tag: '처방 이미지 03 : 한지(Paper) 펜던트 램프 연출',
        title: '2500K~2700K 은은한 페이퍼 조명 컷',
        url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1000&q=80',
        caption: '한지 결을 통과하며 흩어지는 부드럽고 따스한 확산광으로 침실 전체에 온화한 쉼을 유도',
        aspectRatio: '4:3',
        specs: [
          { label: '갓 소재', value: '와시 페이퍼 (한지)' },
          { label: '빛 성질', value: '극저현광 확산광' }
        ]
      },
      {
        id: 'rx-int-4',
        tag: '처방 이미지 04 : 분청 도예 토기 & 나뭇가지 연출',
        title: '무유 분청 세라믹 화병 & 자연목 소품',
        url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
        caption: '인공적인 플라스틱 소품을 배제하고 흙과 돌, 나무의 질감 그대로를 살린 자연주의 소품',
        aspectRatio: '4:3',
        specs: [
          { label: '소품군', value: '세라믹 화병 + 건조화' },
          { label: '무드', value: '와비사비 젠스타일' }
        ]
      }
    ],
    vintage_cozy: [
      {
        id: 'rx-int-1',
        tag: '처방 이미지 01 : 톤앤매너 마스터 렌더',
        title: '빈티지 코지 & 다크 체리우드 렌더컷',
        url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1000&q=80',
        caption: '세월의 깊이가 느껴지는 체리우드 책장과 페르시안 빈티지 러그, 따뜻한 촛불 감성의 공간',
        aspectRatio: '4:3',
        specs: [
          { label: '주조색 60%', value: '#F7F1E5 (바닐라 크림)' },
          { label: '보조색 30%', value: '#8C5E3C (체리 우드)' },
          { label: '포인트 10%', value: '#782823 (버건디 레드)' }
        ]
      },
      {
        id: 'rx-int-2',
        tag: '처방 이미지 02 : 코지 리딩 코너 플로어플랜',
        title: '1인용 암체어와 플로어 스탠드가 있는 서재 코너 플랜',
        url: localFloorplan,
        caption: '방 한켠에 독립된 독서/LP 감상 아지트를 형성하여 집 안에서의 공간 경험을 다변화',
        aspectRatio: '4:3',
        specs: [
          { label: '코너 특화', value: '1인 리딩 누크' },
          { label: '집중도', value: '프라이빗 몰입 구역' }
        ]
      },
      {
        id: 'rx-int-3',
        tag: '처방 이미지 03 : 앰버 글라스 조명 연출',
        title: '2200K 촛불색 에디슨 전구 & 앰버 조명 컷',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
        caption: '호박색(Amber) 유리 갓을 통해 퍼지는 짙고 따뜻한 앰비언트로 아늑함을 극대화',
        aspectRatio: '4:3',
        specs: [
          { label: '색온도', value: '2200K 촛불빛' },
          { label: '전구 타입', value: '에디슨 필라멘트' }
        ]
      },
      {
        id: 'rx-int-4',
        tag: '처방 이미지 04 : 빈티지 페르시안 러그 & 가죽 패브릭',
        title: '에이징된 브라운 가죽 쿠션 & 오리엔탈 러그',
        url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1000&q=80',
        caption: '시간이 지날수록 멋스러워지는 에이징 가죽과 워싱 처리된 빈티지 패브릭의 중후한 조화',
        aspectRatio: '4:3',
        specs: [
          { label: '러그 타입', value: '워시드 빈티지 페르시안' },
          { label: '가죽', value: '오일 풀업 가죽' }
        ]
      }
    ]
  };

  return moodGalleries[mood] || moodGalleries.natural_warm_wood;
}

export function getFashionPrescriptionImages(tpo: TPOType, lookType: 'best' | 'trend' | 'comfort'): PrescriptionImageItem[] {
  const fashionGalleries: Record<'best' | 'trend' | 'comfort', PrescriptionImageItem[]> = {
    best: [
      {
        id: 'rx-fas-1',
        tag: '처방 룩북 01 : 메인 착장 마스터 컷',
        title: '가장 균형 잡힌 정석 코디 (Best Balance Look)',
        url: localFashionLookbook,
        caption: '어깨 라인이 유려한 오버핏 베이지 트렌치코트와 크림 캐시미어 니트, 차콜 슬랙스의 황금비 착장',
        aspectRatio: '4:3',
        specs: [
          { label: '실루엣', value: '테일러드 세미 와이드' },
          { label: '소재 조화', value: '울 캐시미어 + 개버딘' },
          { label: '신뢰도', value: 'TPO 만족도 99%' }
        ]
      },
      {
        id: 'rx-fas-2',
        tag: '처방 룩북 02 : 헤드투토 피스 분해 컷',
        title: '아우터 & 이너 디테일 텍스처 컷',
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
        caption: '피부에 닿는 부드러운 니트의 게이지감과 각이 살아있는 코트 칼라의 입체적인 실루엣',
        aspectRatio: '4:3',
        specs: [
          { label: '이너 니트', value: '12게이지 파인 울' },
          { label: '단추 사양', value: '매트 천연 소뿔 단추' }
        ]
      },
      {
        id: 'rx-fas-3',
        tag: '처방 룩북 03 : 슈즈 & 가방 매칭 컷',
        title: '다크 브라운 더비 슈즈 & 레더 토트백',
        url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
        caption: '과하게 광택이 나지 않는 세미 매트 가죽으로 하체의 중심을 잡아주는 세련된 슈즈 처방',
        aspectRatio: '4:3',
        specs: [
          { label: '슈즈 라스트', value: '라운드 토 세미 정장' },
          { label: '가죽 질감', value: '풀그레인 카프스킨' }
        ]
      },
      {
        id: 'rx-fas-4',
        tag: '처방 룩북 04 : 메탈 워치 & 악세서리 팁',
        title: '실버 스틸 메탈 워치 & 미니멀 레더 벨트',
        url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
        caption: '소매를 가볍게 걷었을 때 드러나는 시계 다이얼과 2.8cm 폭의 슬림 가죽 벨트로 정돈된 마무리',
        aspectRatio: '4:3',
        specs: [
          { label: '워치 케이스', value: '38mm 슬림 스테인리스' },
          { label: '벨트 폭', value: '28mm 미니멀 스퀘어 버클' }
        ]
      }
    ],
    trend: [
      {
        id: 'rx-fas-1',
        tag: '처방 룩북 01 : 트렌드 실루엣 마스터 컷',
        title: '트렌디한 포인트 룩 (Trend & Silhouette)',
        url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
        caption: '크롭 기장의 레더/스웨이드 재킷과 과감한 투턱 와이드 슬랙스, 볼드한 로퍼의 트렌디한 조합',
        aspectRatio: '4:3',
        specs: [
          { label: '실루엣', value: '크롭 탑 + 롱 와이드' },
          { label: '포인트', value: '비율을 극대화하는 다리길이' }
        ]
      },
      {
        id: 'rx-fas-2',
        tag: '처방 룩북 02 : 소재 믹스매치 디테일 컷',
        title: '비건 레더 & 헤비 코튼 패브릭 대비 컷',
        url: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=80',
        caption: '매끄러운 레더 표면과 러프한 코튼 트윌의 텍스처 충돌로 입체감을 선사하는 디테일',
        aspectRatio: '4:3',
        specs: [
          { label: '재킷 질감', value: '매트 엠보 레더' },
          { label: '팬츠 원단', value: '헤비 코튼 개버딘' }
        ]
      },
      {
        id: 'rx-fas-3',
        tag: '처방 룩북 03 : 볼드 청키 슈즈 & 실버 링',
        title: '스퀘어 토 청키 로퍼 & 실버 레이어드 링',
        url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80',
        caption: '와이드 팬츠 밑단 아래로 살짝 엿보이는 볼드한 솔과 미니멀 실버 주얼리의 엣지',
        aspectRatio: '4:3',
        specs: [
          { label: '아웃솔', value: '3.5cm 비브람 청키 솔' },
          { label: '주얼리', value: '925 실버 밴드 링' }
        ]
      }
    ],
    comfort: [
      {
        id: 'rx-fas-1',
        tag: '처방 룩북 01 : 릴렉스드 컴포트 마스터 컷',
        title: '편안하고 세련된 원마일 룩 (Relaxed Comfort)',
        url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80',
        caption: '도톰한 울 오버셔츠와 이지 밴딩 슬랙스, 미니멀 클린 화이트 레더 스니커즈의 여유로운 멋',
        aspectRatio: '4:3',
        specs: [
          { label: '실루엣', value: '이지 릴렉스드 핏' },
          { label: '착용감', value: '하루종일 피로 없는 신축성' }
        ]
      },
      {
        id: 'rx-fas-2',
        tag: '처방 룩북 02 : 천연 코튼 & 캐시미어 텍스처',
        title: '헤비웨이트 코튼 롱슬리브 & 울 니트 조화',
        url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
        caption: '목 늘어남 없는 짱짱한 넥라인 립과 부드러운 촉감으로 실내외 어디서나 단정한 무드 유지',
        aspectRatio: '4:3',
        specs: [
          { label: '티셔츠 사양', value: '16수 2합 탄탄 코튼' },
          { label: '신축성', value: '히든 허리 밴딩' }
        ]
      },
      {
        id: 'rx-fas-3',
        tag: '처방 룩북 03 : 클린 화이트 레더 스니커즈',
        title: '스티치 없는 올 화이트 카프스킨 스니커즈',
        url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80',
        caption: '로고를 지운 군더더기 없는 올 화이트 레더 스니커즈로 정갈하고 깨끗한 발끝 완성',
        aspectRatio: '4:3',
        specs: [
          { label: '갑피 소재', value: '천연 이태리 카프스킨' },
          { label: '인솔 쿠셔닝', value: '오솔라이트 충격 흡수' }
        ]
      }
    ]
  };

  return fashionGalleries[lookType] || fashionGalleries.best;
}

export function getCrossMoodPrescriptionImages(direction: SynergyDirection): PrescriptionImageItem[] {
  return [
    {
      id: 'rx-cross-1',
      tag: '처방 이미지 01 : 공간 ↔ 패션 듀얼 싱크 렌더',
      title: '방의 분위기(오크 우드)와 의상(카멜 코트) 1:1 무드 싱크',
      url: localCrossMoodSync,
      caption: '방 인테리어의 60% 주조색과 30% 보조색을 옷장의 메인 아우터와 슬랙스로 완벽하게 번역한 듀얼 하모니',
      aspectRatio: '4:3',
      specs: [
        { label: '공간 주조색', value: '#F4EFE6 ➔ 크림 슬랙스' },
        { label: '공간 보조색', value: '#B8976C ➔ 카멜 울 코트' },
        { label: '조화도', value: '라이프스타일 싱크 96점' }
      ]
    },
    {
      id: 'rx-cross-2',
      tag: '처방 이미지 02 : 화상회의 웹캠 시점 대비 앵글',
      title: '웹캠 배경 대비도 4.8:1 인물 강조 앵글 컷',
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
      caption: '밝은 크림 벽지 앞에서 짙은 코발트 블루 니트가 명확한 외곽선 윤곽을 형성하여 웹캠 화면 속 시선 집중',
      aspectRatio: '4:3',
      specs: [
        { label: '웹캠 대비 점수', value: '94점 (탁월)' },
        { label: '권장 거리', value: '배경 벽면과 1.2m 이상 이격' }
      ]
    },
    {
      id: 'rx-cross-3',
      tag: '처방 이미지 03 : 홈파티 호스트 공간 융합 컷',
      title: '홈파티 공간 패브릭과 호스트 의류 텍스처 공명',
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80',
      caption: '소파 쿠션 및 식탁보의 패브릭 감촉과 호스트의 린넨/울 텍스처가 따스하게 이어져 게스트에게 심리적 안정감 선사',
      aspectRatio: '4:3',
      specs: [
        { label: '호스트 조화도', value: '92점' },
        { label: '색채 공명', value: '톤온톤 내추럴 융합' }
      ]
    }
  ];
}
