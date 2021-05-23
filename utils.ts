import axios from "axios";
import Toast from "react-native-toast-message";
import { DictionaryData } from "./types/interfaces";

export const hostForDev = (port: number, param = ""): string => {
  return `http://172.30.1.45:${port}${param}`;
};

export const hostForProd = (type: "api" | "server", param = ""): string => {
  if (type === "api") {
    return `https://wordusink-api-server.herokuapp.com${param}`;
  } else {
    return `https://wordusink-server.herokuapp.com${param}`;
  }
};

export const inputValidator = (name: string, caption?: string): void => {
  const engValidation = (term: string): boolean => {
    const enRegex = new RegExp("^[a-zA-Z]*$");
    return enRegex.test(term);
  };

  if (name === "") {
    throw new Error("단어 이름을 입력해주세요.");
  } else if (name.length > 22) {
    throw new Error("단어 이름은 22글자까지 입력할 수 있습니다.");
  } else if (caption !== undefined && caption.length > 8) {
    throw new Error("단어 의미는 8글자까지 입력할 수 있습니다.");
  } else if (engValidation(name) === false) {
    throw new Error("띄어쓰기 없이 영어로만 입력해주세요.");
  }
};

export const userNameValidator = (userName: string) => {
  const nameValidation = (term: string): boolean => {
    const nameRegex =
      /^([^\s!?@#$%^&*._\-~,;:"'+=()<>\[\]ㄱ-ㅎ가-힣]|([a-zA-Z0-9][._]+))*[^\s!?@#$%^&*._\-~,;:"'+=()<>\[\]ㄱ-ㅎ가-힣]$/;
    return nameRegex.test(term);
  };
  if (userName === "") {
    throw new Error("닉네임을 입력해주세요.");
  } else if (userName.length > 15) {
    throw new Error("닉네임은 15글자까지 입력할 수 있습니다.");
  } else if (nameValidation(userName) === false) {
    throw new Error("닉네임 작성 조건을 확인해주세요.");
  }
};

export const exampleGenerator = async (term: string): Promise<string[]> => {
  const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en_US/";
  const examples: string[] = [];
  try {
    const result: DictionaryData = await axios.get(`${baseUrl}${term}`);
    if (result) {
      const filtering = result.data[0].meanings[0];
      filtering.definitions?.map((definition: { example?: string }) => {
        if (definition.example) {
          examples.push(definition.example);
        }
      });
    }
  } catch (e) {
  } finally {
    return examples;
  }
};

export const globalNotifi = (
  type: "success" | "error" | "info",
  text1: string,
  text2 = ""
): void => {
  Toast.show({
    type,
    text1,
    text2,
    topOffset: 30,
    visibilityTime: 2000,
  });
};
