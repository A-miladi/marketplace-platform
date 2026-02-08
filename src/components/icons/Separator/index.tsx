import { IconProps } from "@/types";

export const Separator: React.FC<IconProps> = ({
  size = 32,
}) => {
  return (
    <svg
      width="2"
      height={size}
      viewBox="0 0 2 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 14L1 1" stroke="#E7E7E7" strokeLinecap="round" />
    </svg>
  );
};
