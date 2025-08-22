// container styles
export const containerStyles =
  "min-w-[300px] bg-white h-fit p-2 [&:not(header)]:mt-5 shadow-[rgba(0,0,0,0.25)_3px_3px_6px,rgba(0,0,0,0.18)_6px_6px_12px]";
export const dashContainerStyles =
  "dash-border w-full h-full flex flex-col justify-center items-center py-5";

// btn styles
const btnColors = [
  "bg-accent-red/30",
  "bg-accent-orange/30",
  "bg-accent-green/30",
];
const btnHovers = [
  "hover:bg-accent-red",
  "hover:bg-accent-orange",
  "hover:bg-accent-green",
];
const btnActive = [
  "active:bg-accent-red",
  "active:bg-accent-orange",
  "active:bg-accent-green",
];
export const btnStyles = (index) => {
  return `${btnColors[index]} ${btnHovers[index]} ${btnActive[index]}`;
};
