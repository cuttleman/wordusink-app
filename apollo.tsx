import { HttpLink, concat, ApolloLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-community/async-storage";

interface optionI {
  link: ApolloLink;
}

// Dynamically ip everything change
const httpLink: HttpLink = new HttpLink({ uri: "http://172.28.117.90:5000" });

const authLink: ApolloLink = setContext(async () => {
  const token = await AsyncStorage.getItem("token");
  return { headers: { authorization: token } };
});

export const options: optionI = {
  link: concat(authLink, httpLink),
};

const merged = () => (_: any, incoming = []) => incoming;

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      merge: true,
      fields: {
        allWords: {
          merge: merged(),
        },
        specificWords: {
          merge: merged(),
        },
      },
    },
    Word: {
      merge: true,
      fields: {
        votes: {
          merge: merged(),
        },
      },
    },
  },
});
