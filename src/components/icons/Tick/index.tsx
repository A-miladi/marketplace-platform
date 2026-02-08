import { IconProps } from "@/types";

export const Tick: React.FC<IconProps> = ({ size = 32, color = "white" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6663 3.7915L5.24967 10.2082L2.33301 7.2915"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
