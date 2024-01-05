"use client";

import { MotionConfig } from "framer-motion";

const MotionConfigProvider = ({ children }) => {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
};

export default MotionConfigProvider;
