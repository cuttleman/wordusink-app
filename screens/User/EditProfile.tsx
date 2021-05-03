import React, { useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import { useMutation } from "@apollo/client";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/core";
import styled from "styled-components/native";
import * as MediaLibrary from "expo-media-library";
import EditP from "../../components/EditP";
import useInput from "../../hooks/useInput";
import { EDIT_PROFILE } from "../../queries";
import { PassedInfo, UserProfleParamsP } from "../../types/interfaces";
import { MaterialIcons } from "@expo/vector-icons";

const DoneBtn = styled.TouchableOpacity`
  padding: 10px;
  padding-left: 15px;
  margin-right: 15px;
  background-color: ${(prop) => prop.theme.colors.mainColor};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DoneText = styled.Text`
  color: white;
  font-size: 15px;
  font-family: ${(prop) => prop.theme.fontFamily.rubik500};
`;

export default () => {
  const navigation = useNavigation();
  const { params }: UserProfleParamsP = useRoute();
  const [editProfileMutation] = useMutation(EDIT_PROFILE);
  const [avatarUrl, setAvatarUrl] = useState<MediaLibrary.Asset | null>(null);
  const name = useInput(params?.userInfo?.userName);
  const passedInfo: PassedInfo = {
    avatar: params?.userInfo?.avatar,
    email: params?.userInfo?.email,
  };

  const EditHandle = async () => {
    try {
      const result = await editProfileMutation({
        variables: {
          userName: name.value,
          avatar: avatarUrl ? avatarUrl.uri : null,
        },
      });
      if (result) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Profile" }],
          })
        );
      }
    } catch (e) {
      Alert.alert("", e.message);
    }
  };

  const setAvatarAction = (selected: MediaLibrary.Asset) => {
    setAvatarUrl(selected);
    console.log(selected);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DoneBtn
          onPress={() => {
            try {
              EditHandle();
            } catch (e) {
              Alert.alert("", e.message);
            }
          }}
        >
          <DoneText>Done</DoneText>
          <MaterialIcons
            name={"keyboard-arrow-right"}
            color={"white"}
            size={18}
          />
        </DoneBtn>
      ),
    });
  });

  return (
    <EditP
      editHandle={EditHandle}
      setAvatarAction={setAvatarAction}
      {...name}
      {...passedInfo}
    />
  );
};
