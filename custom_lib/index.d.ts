import React from "react";

interface defaultProps {
  onPictureChoosed?: ({ uri, base64 }) => void;
  borderColor?: string;
  btnTexts?: {
    crop?: string;
    rotate?: string;
    done?: string;
    processing?: string;
  };
  saveOptions?: {
    compress?: number;
    format?: string;
    base64?: boolean;
  };
  fixedMask?: { width: number; height: number } | null;
  isVisible: boolean;
  photo: {
    uri: string;
  };
  onToggleModal: () => void;
}
export default class ImageManipulator extends React.Component<defaultProps> {}
