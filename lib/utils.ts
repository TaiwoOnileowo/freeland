import { Photo } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// Fisher-Yates shuffle algorithm to shuffle the array

export const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const formatImageData = (data: Photo[]) => {
  const dataLengthQuarter = data.length / 4;
  const firstData = data.slice(0, dataLengthQuarter);
  const secondData = data.slice(dataLengthQuarter, dataLengthQuarter * 2);
  const thirdData = data.slice(dataLengthQuarter * 2, dataLengthQuarter * 3);
  const fourthData = data.slice(dataLengthQuarter * 3, data.length);
  return [fourthData, thirdData, secondData, firstData];
};
