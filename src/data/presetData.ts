import { 
  RoomType, 
  BudgetTier, 
  InteriorMood, 
  TPOType, 
  WeatherType, 
  PersonalColor,
  InteriorReport,
  FashionReport,
  CrossMoodReport
} from '../types';

export interface RoomPreset {
  id: string;
  name: string;
  personaLabel: string;
  roomType: RoomType;
  areaPyung: number;
  mood: InteriorMood;
  budget: BudgetTier;
  imageUrl: string;
  description: string;
}

export const ROOM_PRESETS: RoomPreset[] = [
  {
    id: 'preset-room-1',
    name: '이지은의 7평 오피스텔 원룸',
    personaLabel: '페르소나 A 추천',
    roomType: 'one_room',
    areaPyung: 7,
    mood: 'natural_warm_wood',
    budget: 'under_300k',
    imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    description: '베이지 톤 벽지와 옅은 오크 원목, 따뜻한 패브릭이 어우러진 7평형 도심 원룸'
  },
  {
    id: 'preset-room-2',
    name: '박준혁의 22평 홈오피스 스튜디오',
    personaLabel: '페르소나 B 추천',
    roomType: 'home_office',
    areaPyung: 22,
    mood: 'midcentury',
    budget: 'over_1000k',
    imageUrl: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=800&q=80',
    description: '월넛 원목 데스크, 매트 블랙 스틸 프레임, 오렌지 컬러 체어가 돋보이는 감각적인 작업 공간'
  },
  {
    id: 'preset-room-3',
    name: '차분한 자팬디 침실',
    personaLabel: '휴식 지향',
    roomType: 'bedroom',
    areaPyung: 9,
    mood: 'japandi',
    budget: 'under_500k',
    imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
    description: '낮은 평상형 원목 침대, 한지 느낌의 조명, 흙빛 린넨이 주는 미니멀한 명상 분위기'
  },
  {
    id: 'preset-room-4',
    name: '모던 미니멀 화이트 거실',
    personaLabel: '개방감 극대화',
    roomType: 'living',
    areaPyung: 16,
    mood: 'minimal_white',
    budget: 'under_500k',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    description: '화이트와 라이트 그레이의 순수한 톤, 미니멀한 라인 조명과 깔끔한 플로팅 선반'
  }
];

export const ROOM_TYPES_INFO: Record<RoomType, { label: string; desc: string; icon: string }> = {
  one_room: { label: '원룸 / 오피스텔', desc: '휴식과 업무, 수납이 압축된 5~10평 공간', icon: 'Home' },
  bedroom: { label: '침실 (베드룸)', desc: '온전한 수면과 이완을 위한 프라이빗 공간', icon: 'Bed' },
  living: { label: '거실 (리빙룸)', desc: '손님맞이와 휴식이 공존하는 오픈형 메인 공간', icon: 'Armchair' },
  home_office: { label: '홈오피스 / 서재', desc: '화상미팅과 깊은 몰입을 위한 작업 데스크 공간', icon: 'Briefcase' },
  dress_room: { label: '드레스룸 / 옷장', desc: '의류 수납과 헤드투토 피팅이 이뤄지는 룩북 공간', icon: 'Shirt' }
};

export const INTERIOR_MOODS_INFO: Record<InteriorMood, { label: string; enLabel: string; desc: string; hexColors: string[] }> = {
  natural_warm_wood: {
    label: '내추럴 웜 우드',
    enLabel: 'Natural Warm Wood',
    desc: '참나무/오크의 포근한 결, 베이지 패브릭, 식물이 어우러진 편안한 온기',
    hexColors: ['#EFE9DF', '#BFA07A', '#3C2A1E']
  },
  midcentury: {
    label: '미드센추리 모던',
    enLabel: 'Mid-Century Modern',
    desc: '월넛의 짙은 우드, 크롬/스틸, 코발트 블루 or 머스터드 포인트의 레트로 감각',
    hexColors: ['#EAE4D9', '#5E412F', '#E75A24']
  },
  minimal_white: {
    label: '미니멀 화이트',
    enLabel: 'Minimal White',
    desc: '군더더기 없는 순백과 쿨 그레이, 여백의 미학으로 시각적 개방감 극대화',
    hexColors: ['#FAFAFA', '#D4D4D8', '#18181B']
  },
  japandi: {
    label: '자팬디 (Japandi)',
    enLabel: 'Japanese + Scandinavian',
    desc: '북유럽의 실용성과 일본의 선(禪) 사상이 결합된 차분한 어스(Earth) 톤',
    hexColors: ['#F3EFE6', '#A89F91', '#4A463F']
  },
  vintage_cozy: {
    label: '빈티지 코지',
    enLabel: 'Vintage Cozy',
    desc: '시간이 깃든 다크 체리 가구, 빈티지 러그, 따뜻한 백열등 촛불 감성',
    hexColors: ['#F7F1E5', '#8C5E3C', '#782823']
  }
};

export const BUDGET_OPTIONS: Record<BudgetTier, { label: string; desc: string; target: string }> = {
  under_100k: { label: '10만원 이하', desc: '조명 전구 + 패브릭 쿠션/포스터 중심 소품 전환', target: '소품 및 조명 리프레시' },
  under_300k: { label: '10~30만원', desc: '단모 러그 + 암막 쉬폰 커튼 + 무드 스탠드 조명', target: '패브릭 & 조명 분위기 반전' },
  under_500k: { label: '30~50만원', desc: '보조 테이블/체어 + 대형 러그 + 액자 + 스마트 조명', target: '포인트 가구 및 동선 업그레이드' },
  over_1000k: { label: '100만원 이상', desc: '메인 데스크/침대 프레임/수납장 전면 재배치 및 가구 교체', target: '공간 아이덴티티 전면 개편' }
};

export const TPO_OPTIONS: Record<TPOType, { label: string; desc: string; icon: string }> = {
  business: { label: '출근 / 비즈니스', desc: '신뢰감을 주면서도 단정한 스마트 오피스웨어', icon: 'Briefcase' },
  dating: { label: '데이트 / 소개팅', desc: '매력적인 첫인상과 과하지 않은 센스가 돋보이는 룩', icon: 'Heart' },
  weekend: { label: '주말 나들이 / 전시회', desc: '활동성과 감각적인 실루엣이 균형을 이루는 캐주얼', icon: 'Compass' },
  wedding: { label: '하객룩 / 격식 모임', desc: '예의를 지키면서도 세련된 핏감의 포멀/세미포멀 룩', icon: 'Sparkles' },
  homeparty: { label: '홈파티 / 하우스워밍', desc: '호스트로서 편안하면서도 게스트의 눈길을 끄는 룩', icon: 'Wine' }
};

export const PERSONAL_COLORS_INFO: Record<PersonalColor, { label: string; enLabel: string; desc: string; palette: string[] }> = {
  spring_warm: {
    label: '봄 웜톤 (Spring Warm)',
    enLabel: 'Light & Bright',
    desc: '생기 있고 화사한 코랄, 피치, 라이트 웜 옐로우가 잘 어울리는 톤',
    palette: ['#FDBA74', '#F472B6', '#FEF08A', '#E2E8F0']
  },
  summer_cool: {
    label: '여름 쿨톤 (Summer Cool)',
    enLabel: 'Soft & Muted',
    desc: '맑고 청량한 라벤더, 스카이블루, 로즈베이지, 부드러운 그레이시 톤',
    palette: ['#BAE6FD', '#DDD6FE', '#FBCFE8', '#F1F5F9']
  },
  fall_warm: {
    label: '가을 웜톤 (Fall Warm)',
    enLabel: 'Deep & Rich',
    desc: '그윽하고 지적인 카멜, 올리브 카키, 테라코타, 딥 브라운 톤',
    palette: ['#B45309', '#65A30D', '#D97706', '#78350F']
  },
  winter_cool: {
    label: '겨울 쿨톤 (Winter Cool)',
    enLabel: 'Clear & Vivid',
    desc: '선명하고 도시적인 블랙, 퓨어 화이트, 네이비, 딥 플럼의 하이 콘트라스트',
    palette: ['#0F172A', '#FFFFFF', '#1E40AF', '#831843']
  },
  neutral_modern: {
    label: '뉴트럴 모던 (Neutral Modern)',
    enLabel: 'Balanced & Sleek',
    desc: '웜/쿨의 극단 없이 오트밀, 차콜, 소프트 블랙이 단정하게 매칭되는 톤',
    palette: ['#27272A', '#71717A', '#E4E4E7', '#FAF5EE']
  }
};

export const SAMPLE_KEY_ITEMS = [
  '베이지 오버핏 트렌치코트',
  '차콜 원턱 슬랙스',
  '네이비 테일러드 블레이저',
  '미니멀 크림 캐시미어 니트',
  '화이트 옥스포드 오버사이즈 셔츠',
  '셀비지 스트레이트 데님 팬츠',
  '올리브 코튼 봄버 자켓',
  '블랙 레더 로퍼'
];

/**
 * Intelligent Fallback Generator for Interior Advisor
 */
export function generateCuratedInteriorReport(input: {
  roomType: RoomType;
  areaPyung: number;
  budget: BudgetTier;
  mood: InteriorMood;
}): InteriorReport {
  const moodInfo = INTERIOR_MOODS_INFO[input.mood];
  const roomInfo = ROOM_TYPES_INFO[input.roomType];

  let baseSwatch = {
    name: '소프트 크림 베이지',
    hex: '#F4EFE6',
    ratio: 60,
    role: 'Base (주조색 60%)' as const,
    description: '벽지와 바닥, 천장에 사용되어 시각적 확장감과 눈의 피로를 덜어주는 바탕색'
  };
  let subSwatch = {
    name: '오크 내추럴 우드',
    hex: '#B8976C',
    ratio: 30,
    role: 'Sub (보조색 30%)' as const,
    description: '데스크 상판, 침대 프레임, 선반장 등 메인 가구로 따뜻한 안정감을 주는 보조색'
  };
  let accentSwatch = {
    name: '포레스트 세이지 그린',
    hex: '#5B705B',
    ratio: 10,
    role: 'Accent (포인트색 10%)' as const,
    description: '스탠드 조명 갓, 쿠션, 인테리어 액자 속 포인트 컬러로 감각적인 리듬감 부여'
  };

  if (input.mood === 'midcentury') {
    baseSwatch = {
      name: '웜 에크루 베이지',
      hex: '#ECE7DC',
      ratio: 60,
      role: 'Base (주조색 60%)',
      description: '단정한 아이보리-에크루 톤으로 월넛 목재 가구의 윤곽을 선명하게 살리는 베이스'
    };
    subSwatch = {
      name: '다크 월넛 브라운',
      hex: '#4A3528',
      ratio: 30,
      role: 'Sub (보조색 30%)',
      description: '중후하고 감도 높은 월넛 데스크와 선반으로 미드센추리 감성의 뼈대 확립'
    };
    accentSwatch = {
      name: '코발트 블루 & 바우하우스 오렌지',
      hex: '#235789',
      ratio: 10,
      role: 'Accent (포인트색 10%)',
      description: '크롬 스틸 조명 갓 및 빈티지 포스터의 강렬한 컬러 포인트'
    };
  } else if (input.mood === 'minimal_white') {
    baseSwatch = {
      name: '퓨어 매트 화이트',
      hex: '#F9FAFB',
      ratio: 60,
      role: 'Base (주조색 60%)',
      description: '벽면과 천장의 경계를 지워 공간 체감 면적을 1.3배 넓어 보이게 하는 주조색'
    };
    subSwatch = {
      name: '소프트 헤더 그레이',
      hex: '#D1D5DB',
      ratio: 30,
      role: 'Sub (보조색 30%)',
      description: '차분한 단모 러그와 소파 패브릭으로 차가운 느낌을 완화하는 중간 톤'
    };
    accentSwatch = {
      name: '매트 잉크 블랙',
      hex: '#111827',
      ratio: 10,
      role: 'Accent (포인트색 10%)',
      description: '슬림한 철제 테이블 다리와 펜던트 조명 라인으로 그리는 간결한 직선 포인트'
    };
  } else if (input.mood === 'japandi') {
    baseSwatch = {
      name: '웜 페이퍼 오트밀',
      hex: '#EDE8DF',
      ratio: 60,
      role: 'Base (주조색 60%)',
      description: '한지의 은은한 결을 닮은 따뜻한 오트밀 톤의 편안한 바탕'
    };
    subSwatch = {
      name: '애쉬 그레이시 우드',
      hex: '#9E9484',
      ratio: 30,
      role: 'Sub (보조색 30%)',
      description: '결이 살아있는 물푸레나무/오크와 거친 린넨 패브릭의 내추럴한 조화'
    };
    accentSwatch = {
      name: '어스 테라코타 클레이',
      hex: '#8D5B4C',
      ratio: 10,
      role: 'Accent (포인트색 10%)',
      description: '토기 화분과 무광 도자기 화병의 소박하고 깊이 있는 포인트'
    };
  }

  const shoppingList = [
    {
      id: 'shop-1',
      category: '조명' as const,
      name: '플로어 장스탠드 (색온도 가변형)',
      spec: '2700K~3000K 전구색 권장, 패브릭 플리츠 or 미니멀 돔 갓',
      estimatedPrice: input.budget === 'under_100k' ? '38,000원' : '79,000원',
      searchKeyword: `${moodInfo.label} 장스탠드 3000K`,
      reason: '천장 형광등의 차가운 평면광을 끄고 코너 간접등을 켜면 방 전체의 입체감이 극대화됩니다.'
    },
    {
      id: 'shop-2',
      category: '러그' as const,
      name: '먼지 없는 단모 사이잘룩 러그',
      spec: input.areaPyung <= 8 ? '100x150cm (원룸 최적)' : '150x200cm (대형 공간 분리)',
      estimatedPrice: input.budget === 'under_100k' ? '29,000원' : '54,000원',
      searchKeyword: '워셔블 단모 사이잘룩 러그 베이지',
      reason: '바닥의 불필요한 반사광을 잡고 침대와 작업 공간의 시각적 경계를 자연스럽게 구획합니다.'
    },
    {
      id: 'shop-3',
      category: '커튼' as const,
      name: '호텔식 도톰 쉬폰 & 린넨 드레이프',
      spec: '나비주름 형상기억, 바닥에서 1cm 띄움 시공',
      estimatedPrice: input.budget === 'under_100k' ? '25,000원' : '48,000원',
      searchKeyword: '형상기억 쉬폰 린넨 암막 커튼',
      reason: '창가로 들어오는 직사광선을 부드럽게 필터링하여 방 전체에 소프트 포커스 조명 효과를 줍니다.'
    },
    {
      id: 'shop-4',
      category: '소품/식물' as const,
      name: '공기정화 올리브나무 / 아레카야자 + 토분',
      spec: '높이 40~60cm 테라코타 화분 세트',
      estimatedPrice: '32,000원',
      searchKeyword: '수형 예쁜 올리브나무 토분 세트',
      reason: '우드와 베이지 톤 사이에 살아있는 생명력과 싱그러운 10% 녹색 포인트를 완성합니다.'
    }
  ];

  return {
    id: `interior-${Date.now()}`,
    timestamp: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }),
    roomType: input.roomType,
    areaPyung: input.areaPyung,
    mood: input.mood,
    budget: input.budget,
    palette: {
      base: baseSwatch,
      sub: subSwatch,
      accent: accentSwatch,
      harmonyReason: `${moodInfo.label} 감성의 주조색(${baseSwatch.hex})이 전체 면적의 60%를 포근히 감싸고, 보조색 가구(${subSwatch.hex})와 포인트 소품(${accentSwatch.hex})이 황금 분할을 이룹니다.`
    },
    layout: {
      headline: `${input.areaPyung}평 ${roomInfo.label} 시각적 개방감 극대화 솔루션`,
      keyPoints: [
        '침대는 창문 바로 밑보다는 문을 열었을 때 대각선 코너에 배치하여 심리적 안정감 확보',
        '책상과 수납장은 벽면 한쪽 라인으로 정렬하여 통로 동선 폭을 최소 75cm 이상 확보',
        '등 뒤가 벽을 향하게 배치하는 배산임수형 데스크 배치는 화상회의 시 배경 정돈에 유리'
      ],
      openSpaceTip: '가구의 높이를 방문에서 안쪽으로 갈수록 점진적으로 낮아지게 배치하면 시선이 탁 트여 실제 면적보다 2평 이상 넓어 보입니다.',
      trafficFlow: '현관/방문 ➔ 수납존 ➔ 작업 데스크 ➔ 수면 코너로 이어지는 ㄷ자 무간섭 동선',
      diagramConcept: input.areaPyung <= 8 ? 'bed_desk_storage' : 'desk_facing_window'
    },
    shoppingList,
    doctorNote: {
      lighting: '차가운 6500K 주광색 천장 형광등을 절대 단독으로 켜지 마세요. 2700K~3000K 전구색 플로어 스탠드 2기를 대각선 코너에 배치하면 카페 같은 입체 무드가 완성됩니다.',
      wireManagement: '멀티탭은 벨크로 케이블 타이와 멀티탭 정리함 박스를 활용하여 책상 하판 밑으로 완전히 숨기세요. 바닥에 전선이 보이지 않는 것만으로 시각적 피로도가 40% 감소합니다.',
      visualNoiseReduction: '오픈형 행거의 옷들이 알록달록하게 노출되면 방이 어수선해집니다. 패브릭 가림막 커튼을 설치하거나 의류를 톤별(블랙-그레이-베이지-화이트)로 그러데이션 정렬하세요.',
      summaryAdvice: `${input.areaPyung}평 공간의 핵심은 물건을 채우는 것이 아니라 '시선의 머무름'을 제어하는 것입니다. 이번 진단 팔레트를 기준으로 소품 색상을 3가지 이내로 통일하세요.`
    }
  };
}

/**
 * Intelligent Fallback Generator for Fashion Closet
 */
export function generateCuratedFashionReport(input: {
  tpo: TPOType;
  temperature: number;
  weather: WeatherType;
  personalColor: PersonalColor;
  keyItem: string;
}): FashionReport {
  const isCold = input.temperature < 12;
  const isMild = input.temperature >= 12 && input.temperature <= 22;
  const tpoInfo = TPO_OPTIONS[input.tpo];
  const pColorInfo = PERSONAL_COLORS_INFO[input.personalColor];

  const keyItemClean = input.keyItem.trim() || '베이지 트렌치코트';

  return {
    id: `fashion-${Date.now()}`,
    timestamp: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }),
    input,
    outfits: {
      best: {
        type: 'best',
        typeTitle: '가장 균형 잡힌 정석 코디 (Best Balance)',
        tagline: `${tpoInfo.label} 상황에 완벽히 부합하며 누구에게나 신뢰감을 주는 모범 착장`,
        headToToe: {
          outer: isMild ? {
            item: keyItemClean.includes('트렌치') || keyItemClean.includes('자켓') ? keyItemClean : '미니멀 싱글 테일러드 블레이저',
            material: '소프트 울 블렌드 / 코튼 개버딘',
            fit: '자연스러운 레귤러 세미오버 핏',
            color: '딥 네이비 or 클래식 카멜',
            colorHex: '#1E293B'
          } : undefined,
          top: {
            item: '메리노울 하이게이지 크루넥 니트 or 옥스포드 셔츠',
            material: '100% 엑스트라 파인 메리노울 (14게이지)',
            fit: '단정한 슬림 레귤러 핏',
            color: '오프화이트 / 크림 아이보리',
            colorHex: '#F8FAFC'
          },
          bottom: {
            item: '원턱 테이퍼드 슬랙스',
            material: '링클프리 울-폴리 스판덱스',
            fit: '발목 라인에서 툭 떨어지는 노브레이크 핏',
            color: '미디엄 차콜 그레이',
            colorHex: '#334155'
          },
          shoes: {
            item: '페니 로퍼 or 미니멀 플레인 레더 더비슈즈',
            material: '매트 카프스킨 레더',
            fit: '둥근 앞코의 클래식 실루엣',
            color: '다크 에스프레소 브라운',
            colorHex: '#291B14'
          },
          accessories: {
            items: ['슬림 가죽 벨트 (슈즈와 톤 매칭)', '심플 메탈 프레임 시계'],
            note: '악세서리의 금속 톤(실버/골드)을 벨트 버클과 시계 프레임으로 일치시키면 완성도가 올라갑니다.'
          }
        },
        stylingDetailTips: [
          '셔츠나 이너 니트의 밑단을 바지 안으로 반만 넣는 프렌치 턱(French Tuck)으로 다리 길이를 보정하세요.',
          '아우터 소매를 시계가 살짝 보일 정도로 1~2cm 가볍게 걷어 올리면 격식 속에서도 자연스러운 여유가 묻어납니다.',
          `${pColorInfo.label}에 맞춰 얼굴과 가장 가까운 이너 컬러에 밝은 반사판 효과를 부여하세요.`
        ],
        paletteSwatches: [
          { name: '네이비', hex: '#1E293B' },
          { name: '크림 아이보리', hex: '#F8FAFC' },
          { name: '차콜', hex: '#334155' },
          { name: '에스프레소', hex: '#291B14' }
        ]
      },
      trend: {
        type: 'trend',
        typeTitle: '트렌디한 포인트 룩 (Trend & Silhouette)',
        tagline: '감각적인 볼륨 실루엣과 텍스처 대비로 세련된 분위기를 연출하는 룩',
        headToToe: {
          outer: {
            item: '크롭 워크자켓 or 하이넥 미니멀 레더 블루종',
            material: '고밀도 코튼 워크 패브릭 / 비건 레더',
            fit: '쇼트한 기장감과 여유로운 암홀의 세미 박시핏',
            color: '빈티지 올리브 or 세피아 블랙',
            colorHex: '#3F4E4F'
          },
          top: {
            item: '헤비웨이트 피그먼트 다잉 롱슬리브 티셔츠',
            material: '16수 탄탄한 코튼 100%',
            fit: '드롭숄더 릴렉스드 핏',
            color: '워시드 멜란지 차콜',
            colorHex: '#475569'
          },
          bottom: {
            item: '투턱 와이드 벌룬 슬랙스 or 빈티지 데님',
            material: '드레이프성 높은 트윌 패브릭',
            fit: '신발 위로 자연스러운 주름이 잡히는 풀렝스 와이드',
            color: '애쉬 베이지 or 라이트 로우 인디고',
            colorHex: '#A8A29E'
          },
          shoes: {
            item: '청키 솔 독일군 스니커즈 or 스퀘어토 부츠',
            material: '스웨이드 & 레더 믹스',
            fit: '와이드 팬츠 밑단과 균형을 이루는 볼드한 솔',
            color: '샌드 그레이 & 오프화이트',
            colorHex: '#E7E5E4'
          },
          accessories: {
            items: ['실버 미니 체인 네크리스', '패디드 레더 메신저백'],
            note: '상의는 짧고 하의는 풍성한 A라인 실루엣으로 트렌디한 비율감을 형성합니다.'
          }
        },
        stylingDetailTips: [
          '하의를 와이드하게 착용할 때는 상의 기장을 벨트 라인 위로 크롭하게 맞춰 세련된 다리 비율을 완성하세요.',
          '스웨이드, 코튼, 레더의 서로 다른 텍스처를 한 착장에 믹스매치하여 단색 코디에서도 깊이감을 냅니다.',
          '바지 밑단이 신발 앞코를 살짝 덮는 브레이크 주름을 연출해 여유로운 스트리트 감성을 살려보세요.'
        ],
        paletteSwatches: [
          { name: '빈티지 올리브', hex: '#3F4E4F' },
          { name: '멜란지 차콜', hex: '#475569' },
          { name: '애쉬 베이지', hex: '#A8A29E' },
          { name: '샌드 그레이', hex: '#E7E5E4' }
        ]
      },
      comfort: {
        type: 'comfort',
        typeTitle: '편안하고 세련된 원마일 룩 (Relaxed Sophistication)',
        tagline: '장시간 착용에도 구김과 압박 없이 우아한 여유를 지켜주는 이지웨어',
        headToToe: {
          outer: {
            item: '숄칼라 니트 가디건 or 오버핏 코튼 셔켓',
            material: '부드러운 캐시미어 블렌드 / 피치스킨 코튼',
            fit: '몸을 포근하게 감싸는 루즈 가운 핏',
            color: '웜 오트밀 베이지',
            colorHex: '#D7C4B7'
          },
          top: {
            item: '실키 모달 하프터틀넥 / 코튼 저지 티',
            material: '텐셀-모달 코튼 혼방 (극상의 부드러움)',
            fit: '몸에 달라붙지 않는 내추럴 핏',
            color: '소프트 밀크 화이트',
            colorHex: '#FDFBF7'
          },
          bottom: {
            item: '스트링 밴딩 세미와이드 이지 팬츠',
            material: '탄력 있는 폰테/밀라노 립 조직',
            fit: '허리 밴딩 + 깔끔한 핀턱 주름',
            color: '웜 토프 브라운',
            colorHex: '#8C7A6B'
          },
          shoes: {
            item: '컴포트 스웨이드 뮬 or 미니멀 슬립온 스니커즈',
            material: '오일 스웨이드 & 코르크 인솔',
            fit: '신고 벗기 편한 이지 슬립온 핏',
            color: '토프 그레이',
            colorHex: '#A19388'
          },
          accessories: {
            items: ['캔버스-레더 콤비 토트백', '소프트 캐시미어 머플러'],
            note: '과한 장식을 배제하고 원사의 촉감과 은은한 드레이프만으로 고급스러움을 전달합니다.'
          }
        },
        stylingDetailTips: [
          '이너와 아우터를 동일한 웜 베이지 계열의 명도 차이(톤온톤)로 매치하면 시각적으로 정돈되고 편안한 인상을 줍니다.',
          '가디건의 맨 아래 단추를 풀어두어 걸을 때마다 자연스럽게 밑단이 흩날리도록 유도하세요.',
          '홈웨어의 편안함에 외출용 칼라 디테일이 더해져 실내외를 자유롭게 넘나드는 원마일 라이프스타일을 완성합니다.'
        ],
        paletteSwatches: [
          { name: '오트밀 베이지', hex: '#D7C4B7' },
          { name: '밀크 화이트', hex: '#FDFBF7' },
          { name: '토프 브라운', hex: '#8C7A6B' },
          { name: '스웨이드 토프', hex: '#A19388' }
        ]
      }
    },
    expertSummary: `현재 기온 ${input.temperature}℃와 ${input.weather} 날씨를 감안할 때, 체온 조절이 용이한 가벼운 레이어드가 핵심입니다. ${pColorInfo.label} 특유의 맑은 톤을 살려 소장 아이템 [${keyItemClean}]을 중심으로 안정감 있는 스타일을 즐겨보세요.`
  };
}

/**
 * Intelligent Fallback Generator for Cross-Mood Synergy
 */
export function generateCuratedCrossMoodReport(
  direction: 'roomToFashion' | 'fashionToRoom',
  sourceMoodText: string
): CrossMoodReport {
  if (direction === 'roomToFashion') {
    return {
      id: `cross-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }),
      direction,
      sourceConcept: sourceMoodText || '내 방의 웜 우드 & 코발트 블루 무드',
      targetTransformation: {
        title: '룸 팔레트의 패션웨어화: 아틀리에 테일러드 룩',
        concept: '방의 묵직한 오크/월넛 우드 베이스를 카멜 코트로 치환하고, 방 안의 코발트 블루 포인트 쿠션을 네이비 캐시미어 니트로 번역한 착장',
        keyItemsOrElements: [
          '아우터: 웜 카멜 헤링본 울 코트 (가구의 오크 우드 결 표현)',
          '이너: 딥 코발트 블루 터틀넥 니트 (방의 10% 포인트 컬러 차용)',
          '팬츠: 크림 오프화이트 와이드 슬랙스 (방 벽지의 60% 주조색 바탕 반영)',
          '슈즈: 다크 초콜릿 첼시 부츠 (바닥 몰딩과 앤틱 체어 다리의 무게감 재현)'
        ],
        colorTranslation: {
          sourceColors: [
            { name: '벽지 주조색 (Cream Base)', hex: '#F4EFE6' },
            { name: '오크 가구 (Warm Oak Wood)', hex: '#B8976C' },
            { name: '인테리어 소품 (Cobalt Accent)', hex: '#235789' }
          ],
          translatedColors: [
            { name: '크림 슬랙스', hex: '#F4EFE6', application: '하의 및 이너 티셔츠의 화사한 바탕' },
            { name: '카멜 울 코트', hex: '#B8976C', application: '메인 아우터의 묵직하고 따스한 감촉' },
            { name: '코발트 니트', hex: '#235789', application: '얼굴을 화사하게 살리는 포인트 니트' }
          ]
        },
        practicalAdvice: [
          '방 안에 들어섰을 때 본인의 옷과 방이 마치 한 폭의 갤러리처럼 녹아드는 시각적 일체감을 느낄 수 있습니다.',
          '가구의 질감(나뭇결, 거친 패브릭)을 의류의 조직감(헤링본, 굵은 골지 니트)으로 1:1 매칭하는 것이 핵심입니다.'
        ]
      },
      harmonyIndices: {
        videoCallContrastScore: 94,
        videoCallAdvice: '크림색 벽지 배경 앞에서 짙은 코발트 블루 니트가 명확한 윤곽 대비(Contrast Ratio 4.8:1)를 형성하여 웹캠 화면 속 인물이 한층 또렷하게 집중됩니다.',
        homePartyHostScore: 92,
        homePartyAdvice: '홈파티 공간과 호스트의 옷이 톤온톤으로 자연스럽게 공명하여 게스트들에게 극도의 시각적 편안함과 세련된 인상을 각인시킵니다.',
        dailyVibeCoherenceScore: 96
      }
    };
  } else {
    return {
      id: `cross-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }),
      direction,
      sourceConcept: sourceMoodText || '내가 즐겨 입는 어반 보태니컬 룩 (Urban Botanical)',
      targetTransformation: {
        title: '패션 룩북의 공간화: 보태니컬 미드센추리 룸',
        concept: '즐겨 입는 올리브 카키 자켓과 황동 버튼, 내추럴 리넨 팬츠의 톤을 방 안의 대형 관엽식물과 황동 스탠드 조명, 베이지 사이잘룩 러그로 공간화',
        keyItemsOrElements: [
          '조명: 매트 브라스(황동) 2700K 아치형 플로어 램프 (자켓 메탈 부자재 느낌 투영)',
          '플랜테리어: 키 큰 극락조 or 올리브 나무 토분 배치 (자켓의 올리브 카키 그린 확장)',
          '패브릭: 무표백 천연 린넨 침구 커버 및 쿠션 (리넨 팬츠의 여유로운 드레이프 반영)',
          '가구: 오일 마감된 내추럴 티크 사이드 테이블 (슈즈의 브라운 레더 질감 환원)'
        ],
        colorTranslation: {
          sourceColors: [
            { name: '카키 자켓', hex: '#525B44' },
            { name: '린넨 팬츠', hex: '#DED0B6' },
            { name: '브라스 단추', hex: '#B99470' }
          ],
          translatedColors: [
            { name: '대형 관엽 식물', hex: '#525B44', application: '방 코너의 싱그러운 포인트 그린' },
            { name: '사이잘룩 러그', hex: '#DED0B6', application: '바닥의 차분한 텍스처와 바탕' },
            { name: '황동 무드등', hex: '#B99470', application: '밤시간을 채우는 따스한 금빛 반사광' }
          ]
        },
        practicalAdvice: [
          '퇴근 후 옷을 벗고 침실에 누웠을 때도 내가 좋아하는 옷의 촉감과 색온도가 방 전체에 연속성을 유지하게 됩니다.',
          '공간의 향기까지 우디 & 시더우드 룸 스프레이로 일치시키면 오감으로 완성되는 라이프스타일 듀오가 완성됩니다.'
        ]
      },
      harmonyIndices: {
        videoCallContrastScore: 88,
        videoCallAdvice: '뒷배경의 식물 잎새와 황동 간접 조명이 깊이감 있는 보케(아웃포커싱) 효과를 자아내어 전문가다운 세련미를 연출합니다.',
        homePartyHostScore: 95,
        homePartyAdvice: '게스트가 문을 열고 들어오는 순간 호스트의 옷차림과 공간이 하나의 브랜드 쇼룸처럼 일관된 철학을 뿜어냅니다.',
        dailyVibeCoherenceScore: 93
      }
    };
  }
}
