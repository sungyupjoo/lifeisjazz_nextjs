"use client";
import { RotatingLines } from "react-loader-spinner";

export default function Loading() {
  return (
    <RotatingLines
      strokeColor="gray"
      strokeWidth="40"
      animationDuration="0.75"
      width="40"
      visible
    />
  );
}
