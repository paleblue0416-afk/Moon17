/**
 * StyleSpace (Atelier Duo) - Type Definitions
 */

export type RoomType = 'one_room' | 'bedroom' | 'living' | 'home_office' | 'dress_room';

export type BudgetTier = 'under_100k' | 'under_300k' | 'under_500k' | 'over_1000k';

export type InteriorMood = 
  | 'midcentury' 
  | 'natural_warm_wood' 
  | 'minimal_white' 
  | 'japandi' 
  | 'vintage_cozy';

export interface InteriorInput {
  roomType: RoomType;
  areaPyung: number;
  budget: BudgetTier;
  mood: InteriorMood;
  imageUrl?: string;
  imageBase64?: string;
  customNotes?: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  ratio: number; // e.g. 60, 30, 10
  role: 'Base (주조색 60%)' | 'Sub (보조색 30%)' | 'Accent (포인트색 10%)';
  description: string;
}

export interface FurnitureLayoutGuide {
  headline: string;
  keyPoints: string[];
  openSpaceTip: string;
  trafficFlow: string;
  diagramConcept: 'bed_desk_storage' | 'desk_facing_window' | 'living_l_shape' | 'open_studio';
}

export interface ShoppingItem {
  id: string;
  category: '조명' | '러그' | '커튼' | '소품/식물' | '가구';
  name: string;
  spec: string; // e.g. "색온도 2700K-3000K 전구색, E26 플로어 램프"
  estimatedPrice: string;
  searchKeyword: string;
  reason: string;
}

export interface InteriorDoctorNote {
  lighting: string;
  wireManagement: string;
  visualNoiseReduction: string;
  summaryAdvice: string;
}

export interface InteriorReport {
  id: string;
  timestamp: string;
  roomType: RoomType;
  areaPyung: number;
  mood: InteriorMood;
  budget: BudgetTier;
  palette: {
    base: ColorSwatch;
    sub: ColorSwatch;
    accent: ColorSwatch;
    harmonyReason: string;
  };
  layout: FurnitureLayoutGuide;
  shoppingList: ShoppingItem[];
  doctorNote: InteriorDoctorNote;
}

export type TPOType = 'business' | 'dating' | 'weekend' | 'wedding' | 'homeparty';

export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'windy' | 'chilly' | 'summer';

export type PersonalColor = 
  | 'spring_warm' 
  | 'summer_cool' 
  | 'fall_warm' 
  | 'winter_cool' 
  | 'neutral_modern';

export interface FashionInput {
  tpo: TPOType;
  temperature: number;
  weather: WeatherType;
  personalColor: PersonalColor;
  keyItem: string;
}

export interface ApparelPiece {
  item: string;
  material: string;
  fit: string;
  color: string;
  colorHex: string;
}

export interface OutfitOption {
  type: 'best' | 'trend' | 'comfort';
  typeTitle: string; // "가장 균형 잡힌 정석 코디" | "트렌디한 포인트 룩" | "편안하고 세련된 디자인"
  tagline: string;
  headToToe: {
    outer?: ApparelPiece;
    top: ApparelPiece;
    bottom: ApparelPiece;
    shoes: ApparelPiece;
    accessories: {
      items: string[];
      note: string;
    };
  };
  stylingDetailTips: string[];
  paletteSwatches: Array<{ name: string; hex: string }>;
}

export interface FashionReport {
  id: string;
  timestamp: string;
  input: FashionInput;
  outfits: {
    best: OutfitOption;
    trend: OutfitOption;
    comfort: OutfitOption;
  };
  expertSummary: string;
}

export type SynergyDirection = 'roomToFashion' | 'fashionToRoom';

export interface CrossMoodReport {
  id: string;
  timestamp: string;
  direction: SynergyDirection;
  sourceConcept: string;
  targetTransformation: {
    title: string;
    concept: string;
    keyItemsOrElements: string[];
    colorTranslation: {
      sourceColors: Array<{ name: string; hex: string }>;
      translatedColors: Array<{ name: string; hex: string; application: string }>;
    };
    practicalAdvice: string[];
  };
  harmonyIndices: {
    videoCallContrastScore: number; // 0 - 100
    videoCallAdvice: string;
    homePartyHostScore: number; // 0 - 100
    homePartyAdvice: string;
    dailyVibeCoherenceScore: number; // 0 - 100
  };
}

export interface CrossMoodInput {
  direction: SynergyDirection;
  sourceDescription: string;
  targetContext?: string;
}

export interface SavedReportItem {
  id: string;
  type: 'interior' | 'fashion' | 'cross_mood' | 'cross-mood';
  title: string;
  subtitle: string;
  timestamp: number;
  payload: any;
}

export interface BookmarkItem {
  id: string;
  type: 'interior' | 'fashion' | 'cross-mood';
  title: string;
  subtitle: string;
  date: string;
  payload: InteriorReport | FashionReport | CrossMoodReport;
}

export interface Persona {
  id: 'personaA' | 'personaB';
  name: string;
  age: number;
  job: string;
  housing: string;
  problems: string[];
  needs: string[];
  presetInterior: Partial<InteriorInput>;
  presetFashion: Partial<FashionInput>;
}
