export interface WordP {
  word: {
    id: string;
    name: string;
    caption: string;
    image: {
      id: string;
      url: string;
    };
    votes: {
      id: string;
    };
  };
}

export interface ParamsP {
  params?: {
    firstTerm?: string;
  };
}

export interface CardListHP {
  words: string[];
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
