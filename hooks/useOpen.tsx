import { useEffect } from "react";
import { Animated, Easing } from "react-native";

export default (isMount: boolean) => {
  const animation = new Animated.Value(0);

  const slowDown = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, 0],
  });

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.bounce,
    }).start();
  }, [isMount]);

  return { slowDown };
};
