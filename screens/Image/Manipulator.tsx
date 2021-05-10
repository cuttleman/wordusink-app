import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import ImageManipulator from "../../custom_lib";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackRouteP } from "../../types/interfaces";
import constants from "../../constants";
import Loading from "../../components/Loading";
import theme from "../../theme";
import SectionTitle from "../../components/SectionTitle";

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
  const [uri, setUri] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const onToggleModal = () => {
    setIsVisible((prev) => !prev);
  };

  const onPictureChooed = ({ uri: uriM }: { uri: string }) => {
    setUri(uriM);
  };

  useEffect(() => {
    if (params?.url !== undefined) {
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
          <DoneBtn
            onPress={() => {
              if (params && params.doneAction) {
                return params.doneAction(uri);
              } else {
                return null;
              }
            }}
          >
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
