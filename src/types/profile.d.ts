export type TProfileContent =
  | "MY_PROFILE"
  | "MY_ADS"
  | "MY_FAVORITE_ADS"
  | "SUPPORT"
  | "RESET_PASS"
  | "DELETE_ACCOUNT"
  | "LOG_OUT";

export interface IProfileContentProps {
  content: TProfileContent;
}
