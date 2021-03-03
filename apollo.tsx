import { HttpLink, concat, ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-community/async-storage";

interface optionI {
  link: ApolloLink;
}

const httpLink: HttpLink = new HttpLink({ uri: "http://172.29.19.118:5000" });

const authLink: ApolloLink = setContext(async () => {
  const token = await AsyncStorage.getItem("token");
  return { headers: { authorization: token } };
});

const options: optionI = {
  link: concat(authLink, httpLink),
};

export default options;
