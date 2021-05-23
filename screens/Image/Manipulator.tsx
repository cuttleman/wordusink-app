import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components/native";
import { useMutation } from "@apollo/client";
import * as MediaLibrary from "expo-media-library";
import * as ExpoImageManipulator from "expo-image-manipulator";
import ImageManipulator from "../../custom_lib";
import {
  CommonActions,
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { ManipulatorPassP, StackRouteP } from "../../types/interfaces";
import constants from "../../constants";
import Loading from "../../components/Loading";
import theme from "../../theme";
import SectionTitle from "../../components/SectionTitle";
import { CREATE_WORD } from "../../queries";
import { globalNotifi, hostForDev, hostForProd } from "../../utils";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Result = styled.Image`
  width: ${constants.width / 1.1}px;
  height: ${constants.width / 1.1}px;
`;

const OptionsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const DoneBtn = styled.TouchableOpacity`
  padding: 10px 15px;
  margin: 0 7px;
  background-color: ${(prop) => prop.theme.colors.doneColor};
  border-radius: 10px;
`;

const EditBtn = styled(DoneBtn)`
  background-color: ${(prop) => prop.theme.colors.deleteColor};
`;

const BtnText = styled.Text`
  color: white;
  font-size: 17px;
  font-family: ${(prop) => prop.theme.fontFamily.rubik500};
`;

export default () => {
  const { params }: StackRouteP = useRoute();
  const navigation = useNavigation();
  const [passedData, setPassedData] = useState<ManipulatorPassP>({
    name: "",
    caption: "",
    examples: [],
    url: "",
    filename: "",
    from: "",
  });
  const [uri, setUri] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [createWordMutation] = useMutation(CREATE_WORD);

  const uploadImage = async (manipulatedUrl: string) => {
    try {
      if (passedData.from !== "EditProfile") {
        const formData: any = new FormData();
        const manipulatedImg = await ExpoImageManipulator.manipulateAsync(
          manipulatedUrl,
          [{ resize: { width: 300 } }]
        );
        if (passedData.from === "Photo") {
          const savedPhoto = await MediaLibrary.createAssetAsync(
            manipulatedImg.uri
          );
          if (savedPhoto) {
            formData.append("photo", {
              name: savedPhoto.filename,
              uri: manipulatedImg.uri,
              type: `image/${savedPhoto.filename.split(".")[1]}`,
            });
          }
        } else if (passedData.from === "Library") {
          formData.append("photo", {
            name: passedData.filename,
            uri: manipulatedImg.uri,
            type: `image/${passedData.filename.split(".")[1]}`,
          });
        }
        const {
          data: { file },
        } = await axios.post(
          hostForProd("server", "/api/upload/word"),
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const { data } = await createWordMutation({
          variables: {
            name: passedData.name,
            caption: passedData.caption,
            examples: passedData.examples,
            url: file.linkUrl,
          },
        });
        if (data?.createWord?.result) {
          navigation.dispatch(StackActions.replace("Tab"));
          globalNotifi("success", "새 단어가 등록되었습니다.😎");
        } else {
          throw Error(data?.createWord?.message);
        }
      } else {
        navigation.dispatch(
          CommonActions.navigate("EditProfile", {
            manipulated: {
              url: uri,
              filename: passedData.filename,
              userName: params?.userName,
            },
          })
        );
      }
    } catch (e) {
      globalNotifi("error", e.message);
    }
  };

  const onToggleModal = () => {
    setIsVisible((prev) => !prev);
  };

  const onPictureChooed = ({ uri: uriM }: { uri: string }) => {
    setUri(uriM);
  };

  useEffect(() => {
    if (
      params?.url !== undefined &&
      params?.filename !== undefined &&
      params?.name !== undefined &&
      params?.caption !== undefined &&
      params?.examples !== undefined &&
      params?.from !== undefined
    ) {
      setPassedData({
        name: params.name,
        caption: params.caption,
        examples: params.examples,
        url: params.url,
        filename: params.filename,
        from: params.from,
      });
      setUri(params.url);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <OptionsContainer>
          <EditBtn onPress={onToggleModal}>
            <BtnText>편집</BtnText>
          </EditBtn>
          <DoneBtn onPress={() => uploadImage(uri)}>
            <BtnText>등록</BtnText>
          </DoneBtn>
        </OptionsContainer>
      ),
    });
  });

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <SectionTitle text="저장할 이미지 :" />
      <Result source={{ uri }} resizeMode={"contain"} />
      <ImageManipulator
        photo={{ uri }}
        borderColor={theme.colors.doneColor}
        isVisible={isVisible}
        btnTexts={{ done: "완료" }}
        onToggleModal={onToggleModal}
        onPictureChoosed={onPictureChooed}
      />
    </Container>
  );
};
