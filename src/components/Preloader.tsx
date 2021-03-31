import React, { FC } from "react";
import SemipolarLoading from "react-loadingg/lib/SemipolarLoading";

interface LoadingIndicatorProps {
  size?: string;
  color?: string;
  style?:
    | string
    | {
        [key: string]: string;
      };
}

const Preloader: FC<LoadingIndicatorProps> = ({ size, color, style }) => {
  return (
    <SemipolarLoading
      size={size ? size : "large"}
      color={color ? color : "#304159"}
      style={style && style}
    />
  );
};

export default Preloader;
