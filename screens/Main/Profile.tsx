import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  ApolloQueryResult,
  OperationVariables,
  useQuery,
} from "@apollo/client";
import { RefreshControl, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import Loading from "../../components/Loading";
import Avatar from "../../components/Avatar";
import UserOptions from "../../components/UserOptions";
import { SELF_PROFILE } from "../../queries";
import { globalNotifi } from "../../utils";
import constants from "../../constants";
import useSlide from "../../hooks/useSlide";
import { ProfileImageP, UserPSelf } from "../../types/interfaces";

const Container = styled.View`
  flex: 1;
`;

const ScrollContainer = styled.ScrollView`
  width: ${constants.width}px;
  background-color: ${(prop) => prop.theme.colors.bgColor};
  padding-top: 30px;
`;

const Header = styled.View`
  height: 60px;
  background-color: ${(prop) => prop.theme.colors.bgColor};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${(prop) => prop.theme.colors.tabColor};
`;

const UserName = styled(Animated.Text)`
  font-size: 25px;
  font-family: ${(prop) => prop.theme.fontFamily.rubik500};
`;

const Options = styled.TouchableOpacity`
  padding: 5px;
`;

const AvatarContainer = styled.View`
  margin-bottom: 30px;
`;

const HavingContainer = styled.View`
  width: ${constants.width}px;
  margin-bottom: 30px;
  flex-direction: row;
  justify-content: center;
`;

const HavingWords = styled.View`
  align-items: center;
  margin: 0 10px;
`;

const Title = styled.Text`
  font-family: ${(prop) => prop.theme.fontFamily.noto500};
  color: ${(prop) => prop.theme.colors.titleColor};
  line-height: 25px;
  font-size: 17px;
`;

const Number = styled.Text`
  font-family: ${(prop) => prop.theme.fontFamily.noto400};
  color: ${(prop) => prop.theme.colors.titleColor};
  margin-top: 5px;
  line-height: 25px;
  font-size: 15px;
`;

const MyImagesContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
`;

const ImageContent = styled.View<{ index: number }>`
  width: ${constants.width / 2}px;
  height: ${constants.width / 2}px;
  border-color: white;
  border-bottom-width: 1px;
  border-right-width: ${(prop) => (prop.index % 2 === 0 ? 1 : 0)}px;
  overflow: hidden;
`;

const MyImage = styled.Image`
  width: ${constants.width / 2}px;
  height: ${constants.width / 2}px;
`;

export default () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {
    data,
    loading,
    refetch,
  }: {
    data: { self: UserPSelf };
    loading: boolean;
    refetch: (
      variables?: Partial<OperationVariables> | undefined
    ) => Promise<ApolloQueryResult<any>>;
  } = useQuery(SELF_PROFILE, {
    fetchPolicy: "network-only",
  });
  const { toggleOpen, sliding, smalling } = useSlide();

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
      globalNotifi("error", "새로고침 할 수 없습니다.😱");
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <Header style={{ elevation: 5 }}>
        <UserName style={{ fontSize: smalling }}>
          {data?.self.userName}
        </UserName>
        <Options onPress={toggleOpen}>
          <AntDesign name={"menufold"} size={24} />
        </Options>
        {data?.self.isSelf && (
          <UserOptions
            animation={sliding}
            toggleFunc={toggleOpen}
            userInfo={data?.self}
          />
        )}
      </Header>
      <ScrollContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <AvatarContainer>
          <Avatar avatar={data?.self?.avatar} size={"lg"} />
        </AvatarContainer>
        <HavingContainer>
          <HavingWords>
            <Title>총 단어 수</Title>
            <Number>{data?.self?.images?.length}</Number>
          </HavingWords>
          <HavingWords>
            <Title>오늘 추가한 단어 수</Title>
            <Number>{data?.self?.onTodayWords?.length}</Number>
          </HavingWords>
        </HavingContainer>
        <MyImagesContainer>
          {data?.self?.images?.map((image: ProfileImageP, idx: number) => (
            <ImageContent key={image.id} index={idx}>
              <MyImage source={{ uri: image.url }} resizeMode={"cover"} />
            </ImageContent>
          ))}
        </MyImagesContainer>
      </ScrollContainer>
    </Container>
  );
};
