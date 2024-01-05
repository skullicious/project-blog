"use client";

import dynamic from "next/dynamic";

export const CircularColorsDemo = dynamic(() =>
  import("../CircularColorsDemo/CircularColorsDemo")
);
