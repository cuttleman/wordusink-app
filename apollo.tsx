import { HttpLink, concat, ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-community/async-storage";

const httpLink:HttpLink = new HttpLink({ uri: "http://172.30.1.21:5000" });

const authLink:ApolloLink = setContext(async (reqeust, previous) => {
  const token = await AsyncStorage.getItem("token");
  return { headers: { authorization: token } };
});

const options:{link:ApolloLink} = {
  link: concat(authLink, httpLink),
};

export default options;
