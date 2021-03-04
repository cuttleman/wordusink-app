import { useEffect, useState } from "react";
import { Animated } from "react-native";

export default () => {
  const [turn, setTurn] = useState<boolean>(false);
  const [isInit, setIsInit] = useState<number>(0);
  const animation = isInit
    ? new Animated.Value(turn ? 0 : 1)
    : new Animated.Value(0);

  const turnning = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-180deg"],
  });

  const perspectiving = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [700, 10, 700],
  });

  const NameZIndexing = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 2],
  });

  const toggleTurn = () => {
    setTurn((prev) => !prev);
    if (!isInit) {
      setIsInit(1);
    }
  };

  useEffect(() => {
    if (isInit) {
      Animated.timing(animation, {
        toValue: turn ? 1 : 0,
        duration: 600,
        useNativeDriver: false,
      }).start();
    }
  }, [turn]);

  return { toggleTurn, turnning, perspectiving, NameZIndexing };
};
