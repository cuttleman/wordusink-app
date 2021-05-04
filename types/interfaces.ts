import { Asset } from "expo-media-library";
import { Camera } from "expo-camera";
import { Animated } from "react-native";

type subset<T> = { [P in keyof T]: T[P] };

export interface WordP {
  word: subset<PartialWord>;
  words?: subset<PartialWord>[];
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
  votes: subset<Vote>[];
}

export interface CarouselP {
  item: subset<PartialWord>;
  index: number;
}

export interface SpecificWordParamsP {
  params?: {
    firstTerm?: string;
  };
}

export interface AllWordsParamsP {
  params?: {
    index?: number;
    words?: subset<PartialWord>[];
  };
}

export interface CardListHP {
  words: {
    name?: string;
    count?: number;
  }[];
  scrollEvent: boolean;
  loading: boolean;
}

export interface CardListVP {
  words: subset<PartialWord>[];
  loading: boolean;
}

export type AuthButtonP = {
  text: string;
  type?: string;
  onPress: () => void;
};

export interface AuthProviderP {
  initLoggedIn: boolean;
  children: React.ReactChild[];
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

export interface InputHooksR {
  value: InputHooksP;
  onChangeText: (text: string) => void;
}

export interface EditP {
  url: string | undefined;
  name: subset<InputHooksR>;
  caption: subset<InputHooksR>;
  doneHandle: () => Promise<void>;
  deleteHandle: () => Promise<void>;
  preDeleteHandle: () => void;
}

export type NewP = { [K in "name" | "caption"]: InputHooksR };

type AvatarSize = "lg" | "md" | "sm";

export interface AvatarP {
  avatar?: string | null;
  size?: AvatarSize;
}

export interface ComponentInMaterialTabs {
  stackRoute: subset<StackRouteP>;
}

export interface MaterialTabsP {
  name: string;
  Component: React.FC<ComponentInMaterialTabs>;
  iconName: "logo-google" | "camera" | "albums";
}

export interface StackRouteP {
  params?: {
    name?: string;
    caption?: string;
  };
}

export interface SrollBotReachedP {
  layoutMeasurement: { height: number };
  contentOffset: { y: number };
  contentSize: { height: number };
}

export type photoPInAlbum = string | Asset;

export interface PhotoAlbumP {
  photos: photoPInAlbum[];
  selectPhoto: photoPInAlbum;
  selectPhotoAction: (photo: any) => void;
  onSrollBotReached: (params: SrollBotReachedP) => void;
  doneAction: () => Promise<void> | void;
}

export type HomeRouteParam = {
  Check: {
    comebackHome: boolean;
  };
};

export interface StacksP {
  name: string;
  component: React.FC;
}

export interface CameraSectionP {
  cameraRef: React.MutableRefObject<Camera | null>;
  hasPermission: boolean;
  type: "back" | "front";
  typeAction: () => void;
  takeAction: () => Promise<void>;
  readyForCamera: () => void;
}

export interface TabIconP {
  focused?: boolean;
  iconName: string | any;
}

type UserPSelf = {
  id?: string;
  userName?: string;
  email?: string;
  avatar?: string | null;
  images?: {
    id: string;
    url: string;
  }[];
  onTodayWords?: {
    id: string;
  }[];
};

export interface UserP {
  refreshing: boolean;
  onRefresh: () => void;
  self: subset<UserPSelf>;
}

export interface UserOptionsP {
  animation: Animated.AnimatedInterpolation;
  toggleFunc: () => void;
  userInfo: subset<UserPSelf>;
}

export interface UserProfleParamsP {
  params?: {
    userInfo?: subset<UserPSelf>;
  };
}

export interface EditPProp extends InputHooksR, PassedInfo {
  avatarUrl?: string;
  albumTrigger: () => void;
}

export interface PassedInfo extends Pick<UserPSelf, "email" | "avatar"> {}

// Styled Type

export interface IsCaptionP {
  isCaption: string;
}

export interface AuthBtnSt {
  type: string | undefined;
}

export interface CardNameStyle {
  isName?: boolean;
}

export interface WordNameSt {
  turn: boolean;
}

export interface EditBtnSt {
  isDone?: boolean;
}

export interface AvatarStyle {
  size: AvatarSize;
}
