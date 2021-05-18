import { Asset } from "expo-media-library";
import { Camera } from "expo-camera";
import { Animated } from "react-native";
import * as MediaLibrary from "expo-media-library";
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
  examples: string[];
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

export interface HavingWord {
  count: number;
  name: string;
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
  params?: subset<Partial<ManipulatorPassP>>;
}

export interface ManipulatorPassP {
  name: string;
  caption: string;
  examples: string[];
  url: string;
  filename: string;
  from: "Library" | "Photo" | "EditProfile" | "";
  userName?: string;
}

export interface ManipulatedAvatarP
  extends Pick<ManipulatorPassP, "url" | "filename"> {}

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
  isEnd: boolean;
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

export interface ProfileImageP {
  id: string;
  url: string;
}

export interface UserOptionsP {
  animation: Animated.AnimatedInterpolation;
  toggleFunc: () => void;
  userInfo: subset<UserPSelf>;
}

export interface UserProfleParamsP {
  params?: {
    userInfo?: subset<UserPSelf>;
    manipulated?: {
      url?: string;
      filename?: string;
      userName?: string;
    };
  };
}

export interface AvatarFromLibraryP {
  setAvatarAction: (v: MediaLibrary.Asset) => void;
}

export interface PassedInfo
  extends Pick<UserPSelf, "email" | "avatar" | "userName" | "images"> {}

export interface DeleteUserP extends PassedInfo {
  isModal: boolean;
  closeDeleteView: () => void;
  preDeleteHandle: () => void;
}

export interface HomeSlideP {
  images?: {
    id: string;
    url: string;
  }[];
  loading: boolean;
}

// Api type

export interface DictionaryData {
  data: {
    word: string;
    phonetics: {
      text?: string;
      audio?: string;
    }[];
    meanings: {
      partOfSpeech: string;
      definitions: {
        definition?: string;
        example?: string;
        synonyms?: string[];
      }[];
    }[];
  }[];
}

// Styled Type

export interface IsCaptionP {
  isCaption: string;
}

export interface AuthBtnSt {
  type: string | undefined;
}

export interface CardNameSt {
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

export interface PhotoItemSt {
  selectPhoto?: photoPInAlbum;
  photo?: photoPInAlbum;
  index?: number;
}

export interface DeleteBtnSt {
  verified: boolean;
}

// Query return type

export type UserPSelf = {
  id?: string;
  userName?: string;
  email?: string;
  avatar?: string | null;
  isSelf?: boolean;
  images?: {
    id: string;
    url: string;
  }[];
  onTodayWords?: {
    id: string;
  }[];
};
