export interface WordP {
  word: PartialWord;
  words?: PartialWord[];
  index?: number;
  total?: number;
}

export interface Vote {
  id: string;
}

export interface PartialWord {
  id: string;
  caption: string;
  image: {
    id: string;
    url: string;
  };
  name: string;
  votes: Vote[];
}

export interface SpecificWordParamsP {
  params?: {
    firstTerm?: string;
  };
}

export interface AllWordsParamsP {
  params?: {
    wordId?: string;
    words?: PartialWord[];
  };
}

export interface CardListHP {
  words: {
    name?: string;
    count?: number;
  }[];
  scrollEvent: boolean;
}

export interface WordTextSt {
  index: number;
}

export interface AuthButtonP {
  text: string;
  type?: string;
  onPress: () => void;
}

export interface AuthBtnSt {
  type: string | undefined;
}

export interface AuthProviderP {
  initLoggedIn: boolean;
  children: React.ReactChild[];
}

export interface WordNameSt {
  turn: boolean;
}

export interface EditWordParams {
  params?: {
    wordId?: string;
    name?: string;
    caption?: string;
    url?: string;
  };
}

export type InputHooksP = string | undefined;

export interface CardNameStyle {
  isName?: boolean;
}

type AvatarSize = "lg" | "md" | "sm";

export interface AvatarP {
  avatar: string | null;
  size: AvatarSize;
}

export interface AvatarStyle {
  size: AvatarSize;
}

export interface TabsP {
  name: string;
  Component: React.FC<{ stackNavigation: any }>;
  iconName: "logo-google" | "camera" | "albums";
}

export interface StackNavigationP {
  setOptions: (event: { headerRight: () => React.ReactNode }) => void;
}
