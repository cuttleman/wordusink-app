import React, { useLayoutEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { useMutation } from "@apollo/client";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/core";
import styled from "styled-components/native";
import SlidingUpPanel from "rn-sliding-up-panel";
import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";
import EditP from "../../components/EditP";
import useInput from "../../hooks/useInput";
import { EDIT_PROFILE } from "../../queries";
import { PassedInfo, UserProfleParamsP } from "../../types/interfaces";
import { MaterialIcons } from "@expo/vector-icons";
import { hostForDev, userNameValidator } from "../../utils";
import AvatarFromLibrary from "./AvatarFromLibrary";
import axios from "axios";

const Container = styled.View`
  background-color: ${(prop) => prop.theme.colors.bgColor};
  flex: 1;
  margin-top: 150px;
  padding-top: 30px;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
`;

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
  const panel = useRef<SlidingUpPanel>(null);
  const [avatarUrl, setAvatarUrl] = useState<MediaLibrary.Asset | null>(null);
  const name = useInput(params?.userInfo?.userName);
  const passedInfo: PassedInfo = {
    avatar: params?.userInfo?.avatar,
    email: params?.userInfo?.email,
  };

  const doneHandle = async () => {
    const formData: any = new FormData();
    let result;
    try {
      if (avatarUrl) {
        const manipulatedImg = await ImageManipulator.manipulateAsync(
          avatarUrl.uri,
          [{ resize: { width: 300 } }]
        );
        formData.append("photo", {
          name: avatarUrl.filename,
          uri: manipulatedImg.uri,
          type: `image/${avatarUrl.filename.split(".")[1]}`,
        });
        const {
          data: { file },
        } = await axios.post(hostForDev(5000, "/api/upload/avatar"), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        result = await editProfileMutation({
          variables: {
            userName: name.value,
            avatar: file.linkUrl,
          },
        });
      } else {
        result = await editProfileMutation({
          variables: {
            userName: name.value,
          },
        });
      }
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
    panel?.current?.hide();
  };

  const openAlbum = () => {
    panel?.current?.show();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DoneBtn
          onPress={() => {
            try {
              userNameValidator(name?.value);
              doneHandle();
            } catch (e) {
              Alert.alert("", e.message);
            }
          }}
        >
          <DoneText>수정완료</DoneText>
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
    <>
      <EditP
        albumTrigger={openAlbum}
        avatarUrl={avatarUrl?.uri}
        {...name}
        {...passedInfo}
      />
      <SlidingUpPanel ref={panel} allowDragging={false}>
        <Container>
          <AvatarFromLibrary setAvatarAction={setAvatarAction} />
        </Container>
      </SlidingUpPanel>
    </>
  );
};
