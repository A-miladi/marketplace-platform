import { IconProps } from "@/types";

export const Check: React.FC<IconProps> = ({ size = 14, className, color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6667 3.79169L5.25004 10.2084L2.33337 7.29169"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
