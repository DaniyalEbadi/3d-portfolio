"use client";

import { Html, useProgress } from "@react-three/drei";
import { type FC } from "react";

export const Loader: FC = () => {
  const { progress } = useProgress();
  return (
    <Html center className="text-xl font-normal text-center">
      در حال بارگذاری {progress}٪
    </Html>
  );
};
