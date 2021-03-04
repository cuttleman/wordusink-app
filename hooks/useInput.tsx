import { useState } from "react";
import { InputHooksP } from "../types/interfaces";

export default (initValue: InputHooksP) => {
  const [value, setValue] = useState<InputHooksP>(initValue);

  const onChangeText = (text: string) => {
    setValue(text);
  };

  return { value, onChangeText };
};
