import { HttpLink, concat, ApolloLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-community/async-storage";
import { hostForDev } from "./utils";

interface optionI {
  link: ApolloLink;
}

// Dynamically ip everything change
const httpLink: HttpLink = new HttpLink({
  uri: hostForDev(5000),
});

const authLink: ApolloLink = setContext(async () => {
  const token = await AsyncStorage.getItem("token");
  return { headers: { authorization: token } };
});

export const options: optionI = {
  link: concat(authLink, httpLink),
};

const merged = () => (_: any, incoming = []) => {
  return incoming;
};

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allWords: {
          merge: merged(),
        },
        specificWords: {
          merge: merged(),
        },
        havingWords: {
          merge: merged(),
        },
        allImages: {
          merge: merged(),
        },
      },
    },
    Word: {
      fields: {
        votes: {
          merge: merged(),
        },
      },
    },
  },
});
