import { useEffect, useState } from "react";
import { Animated, Easing } from "react-native";

export default () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isInit, setIsInit] = useState<number>(0);
  const animation = isInit
    ? new Animated.Value(open ? 0 : 1)
    : new Animated.Value(0);

  const sliding = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const toggleOpen = () => {
    setOpen((prev) => !prev);
    if (!isInit) {
      setIsInit(1);
    }
  };

  useEffect(() => {
    if (isInit) {
      Animated.timing(animation, {
        toValue: open ? 1 : 0,
        duration: 700,
        useNativeDriver: false,
        easing: Easing.circle,
      }).start();
    }
  }, [open]);

  return { toggleOpen, sliding, open };
};
