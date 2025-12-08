"use client";

import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useEffect } from "react";

interface RiveAnimationProps {
  src: string;
  stateMachineName?: string;
  autoplay?: boolean;
  className?: string;
  isHovered?: boolean;
  hoverInputName?: string;
}

export function RiveAnimation({
  src,
  stateMachineName = "Github SM",
  autoplay = true,
  className = "",
  isHovered,
  hoverInputName = "Hover",
}: RiveAnimationProps) {
  const { rive, RiveComponent } = useRive({
    src,
    stateMachines: stateMachineName,
    autoplay,
  });

  const hoverInput = useStateMachineInput(rive, stateMachineName, hoverInputName);

  useEffect(() => {
    if (hoverInput && isHovered !== undefined) {
      hoverInput.value = isHovered;
    }
  }, [hoverInput, isHovered]);

  return (
    <div className={`rive-comp ${className}`}>
      <RiveComponent />
    </div>
  );
}
