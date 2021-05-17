import React, { useEffect, useRef, useState } from "react";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useMutation } from "@apollo/client";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/core";
import styled from "styled-components/native";
import SlidingUpPanel from "rn-sliding-up-panel";
import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";
import useInput from "../../hooks/useInput";
import { DELETE_USER, EDIT_PROFILE } from "../../queries";
import {
  ManipulatedAvatarP,
  ManipulatorPassP,
  PassedInfo,
  UserProfleParamsP,
} from "../../types/interfaces";
import { MaterialIcons } from "@expo/vector-icons";
import { globalNotifi, hostForDev, userNameValidator } from "../../utils";
import AvatarFromLibrary from "./AvatarFromLibrary";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import { useLogOut } from "../../components/AuthContext";
import constants from "../../constants";
import Avatar from "../../components/Avatar";
import SectionTitle from "../../components/SectionTitle";

const Container = styled.ScrollView`
  flex: 1;
`;

const ProfileContainer = styled.View`
  width: ${constants.width}px;
  height: ${constants.height - 120}px;
  background-color: ${(prop) => prop.theme.colors.bgColor};
  align-items: center;
  padding-top: 20px;
`;

const AvatarContainer = styled.View`
  margin-bottom: 10px;
`;

const AvatarEditBtn = styled.TouchableOpacity`
  position: absolute;
  padding: 10px;
  border-width: 1px;
  border-color: ${(prop) => prop.theme.colors.tabColor};
  border-radius: 30px;
  background-color: white;
`;

const ConditionContainer = styled.View`
  margin-bottom: 20px;
`;

const Conditions = styled.Text`
  color: ${(prop) => prop.theme.colors.titleColor};
  margin-left: 15px;
  font-family: ${(prop) => prop.theme.fontFamily.noto400};
  font-size: 14px;
  line-height: 25px;
`;

const InputContainer = styled.View``;

const Input = styled.TextInput`
  width: ${constants.width / 2}px;
  background-color: white;
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 17px;
`;

const DeleteUserBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 15px;
  max-width: 300px;
  width: ${constants.width / 1.8}px;
  padding: 15px 0;
  background-color: ${(prop) => prop.theme.colors.darkDeleteColor};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const DeleteText = styled.Text`
  color: white;
  font-family: ${(prop) => prop.theme.fontFamily.rubik500};
  font-size: 17px;
`;

const PanelContainer = styled.View`
  flex: 1;
  margin-top: 150px;
  padding-top: 30px;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  background-color: ${(prop) => prop.theme.colors.bgColor};
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
  const avatarPanel = useRef<SlidingUpPanel>(null);
  const navigation = useNavigation();
  const { params }: UserProfleParamsP = useRoute();
  const [editProfileMutation] = useMutation(EDIT_PROFILE);
  const [deleteUserMutation] = useMutation(DELETE_USER);
  const [isClear, setIsClear] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<ManipulatedAvatarP | null>(null);
  const inputName = useInput(
    params?.manipulated?.userName ?? params?.userInfo?.userName
  );
  const logOut = useLogOut();
  const passedInfo: PassedInfo = {
    avatar: params?.userInfo?.avatar,
    email: params?.userInfo?.email,
    userName: params?.userInfo?.userName,
    images: params?.userInfo?.images,
  };

  const clearAvatarAction = () => {
    setIsClear(true);
  };

  const doneHandle = async () => {
    const formData: any = new FormData();
    let result;
    try {
      // prevent leak of resources
      if (avatarUrl && avatarUrl.url && avatarUrl.filename) {
        const manipulatedImg = await ImageManipulator.manipulateAsync(
          avatarUrl.url,
          [{ resize: { width: 150 } }]
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
            userName: inputName.value,
            avatar: isClear ? null : file.linkUrl,
          },
        });
      } else {
        result = await editProfileMutation({
          variables: {
            userName: inputName.value,
            avatar: isClear ? null : passedInfo.avatar,
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
        globalNotifi("success", "프로필이 수정되었습니다.😊");
      }
    } catch (e) {
      globalNotifi("error", e.message);
    }
  };

  const deleteHandle = async () => {
    try {
      const { data } = await deleteUserMutation({
        variables: { email: passedInfo.email },
      });
      if (data.deleteUser) {
        logOut();
      } else {
        throw new Error();
      }
    } catch (e) {
      globalNotifi("error", "요청작업을 완료할 수 없습니다.😥");
    }
  };

  const preDeleteHandle = () => {
    Alert.alert(
      "계정을 정말 지우시겠습니까?",
      "(지울 시 저장된 데이터가 모두 삭제됩니다.)",
      [
        {
          text: "아니요",
          style: "cancel",
        },
        { text: "예", onPress: (): Promise<void> => deleteHandle() },
      ],
      { cancelable: false }
    );
  };

  const manipulatingAvatar = (selected: MediaLibrary.Asset) => {
    setTimeout(() => avatarPanel?.current?.hide(), 500);
    const passedData: Partial<ManipulatorPassP> = {
      url: selected.uri,
      name: "",
      caption: "",
      examples: [],
      filename: selected.filename,
      from: "EditProfile",
    };
    navigation.navigate("Manipulator", {
      ...passedData,
      userName: inputName.value,
    });
  };

  const openAlbum = () => {
    let checkKeyboard = false;
    Keyboard.addListener("keyboardDidShow", () => (checkKeyboard = true));
    Keyboard.addListener("keyboardDidHide", () => (checkKeyboard = false));
    if (checkKeyboard) {
      avatarPanel?.current?.show();
    } else {
      Keyboard.dismiss();
      setTimeout(() => avatarPanel?.current?.show(), 400);
    }
  };

  const openDeleteView = () => {
    setIsModal(true);
  };

  const closeDeleteView = () => {
    setIsModal(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DoneBtn
          onPress={() => {
            try {
              userNameValidator(inputName?.value);
              doneHandle();
            } catch (e) {
              globalNotifi("error", e.message);
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

  useEffect(() => {
    if (
      params?.manipulated !== undefined &&
      params?.manipulated?.url !== undefined &&
      params?.manipulated?.filename !== undefined
    ) {
      setAvatarUrl({
        url: params.manipulated.url,
        filename: params.manipulated.filename,
      });
    }
  }, [params]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container showsVerticalScrollIndicator={false}>
        <ProfileContainer>
          <AvatarContainer>
            <Avatar
              avatar={
                isClear
                  ? null
                  : avatarUrl?.url
                  ? avatarUrl?.url
                  : passedInfo.avatar
              }
              size="lg"
            />

            <AvatarEditBtn
              style={{ elevation: 4, top: 0, right: 0 }}
              onPress={clearAvatarAction}
            >
              <MaterialIcons name={"cancel"} color="black" size={23} />
            </AvatarEditBtn>
            <AvatarEditBtn
              style={{ elevation: 4, bottom: 0, right: 0 }}
              onPress={openAlbum}
            >
              <MaterialIcons name={"edit"} color="black" size={23} />
            </AvatarEditBtn>
          </AvatarContainer>
          <InputContainer>
            <SectionTitle text="닉네임 *" />
            <ConditionContainer>
              <Conditions> _ . 은 문자 중간에만 입력할 수 있습니다.</Conditions>
              <Conditions>띄어쓰기는 사용할 수 없습니다.</Conditions>
              <Conditions>
                닉네임은 영어, 숫자, _ . 만 사용할 수 있습니다.
              </Conditions>
              <Conditions>닉네임은 15자까지 입력할 수 있습니다.</Conditions>
            </ConditionContainer>
            <Input
              style={{ elevation: 5 }}
              placeholder="새로운 닉네임"
              value={inputName.value}
              onChangeText={inputName.onChangeText}
            />
          </InputContainer>
          <DeleteUserBtn style={{ elevation: 7 }} onPress={openDeleteView}>
            <DeleteText>계정 삭제</DeleteText>
          </DeleteUserBtn>
        </ProfileContainer>
        <SlidingUpPanel ref={avatarPanel} allowDragging={false}>
          <PanelContainer>
            <AvatarFromLibrary
              setAvatarAction={(selected: MediaLibrary.Asset) =>
                manipulatingAvatar(selected)
              }
            />
          </PanelContainer>
        </SlidingUpPanel>
        <DeleteUser
          isModal={isModal}
          closeDeleteView={closeDeleteView}
          preDeleteHandle={preDeleteHandle}
          {...passedInfo}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};
