import { useCallback } from "react";
import { type AriaSliderProps } from "react-aria";

import Slider from "./Slider";

export default function LogSlider({
  formatter,
  minValue = -6,
  maxValue = 2,
  base = 2,
  onChangeEnd,
  onChange,
  ...props
}: AriaSliderProps & { base?: number; formatter?: (value: number) => string }) {
  const handleFormat = (value: number) => {
    const trueValue = Math.pow(base, value);
    const numZeros = Math.floor(Math.log10(trueValue));
    const numDecimals = Math.max(0, -numZeros + 2);

    const linearValue = Math.pow(base, value);
    return `${linearValue.toFixed(numDecimals)}`;
  };

  const handleChange = useCallback(
    (value: number | number[]) => {
      if (typeof value === "number") {
        const linearValue = Math.pow(base, value);
        onChange?.(linearValue);
        return;
      }

      const linearValue = value.map((v) => Math.pow(base, v));
      onChange?.(linearValue);
    },
    [onChange, base],
  );

  const handleChangeEnd = useCallback(
    (value: number | number[]) => {
      if (typeof value === "number") {
        const linearValue = Math.pow(base, value);
        onChangeEnd?.(linearValue);
        return;
      }

      const linearValue = value.map((v) => Math.pow(base, v));
      onChangeEnd?.(linearValue);
    },
    [onChangeEnd, base],
  );

  return (
    <Slider
      formatter={formatter}
      {...props}
      minValue={minValue}
      maxValue={maxValue}
      onChange={handleChange}
      onChangeEnd={handleChangeEnd}
    />
  );
}
