import React, { useLayoutEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../components/Loading";
import User from "../../components/User";
import { SELF_PROFILE } from "../../queries";

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data, loading, refetch } = useQuery(SELF_PROFILE, {
    fetchPolicy: "network-only",
  });

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return loading ? (
    <Loading />
  ) : (
    <User refreshing={refreshing} onRefresh={onRefresh} self={data?.self} />
  );
};

export default Profile;
