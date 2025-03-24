/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { sfxr } from "jsfxr";

export const play8BitSound = () => {
  const preset = "powerUp";
  const sound = sfxr.generate(preset);

  sfxr.play(sound);
};
