import { Toaster } from "react-hot-toast";
import { SuccessToast } from "../icons/SuccessToast";
import { ErrorToast } from "../icons/ErrorToast";
import { WarningToast } from "../icons/WarningToast";

const TOAST_COLORS = {
  background: "#fff",
  success: "#0E9F6E",
  error: "#F05252",
  warning: "#EDCF0E",
};

const Toast = () => {
  return (
    <Toaster
      position="bottom-left"
      toastOptions={{
        duration: 3000,
        style: {
          marginLeft: 16,
          marginBottom: 28,
          direction: "ltr",
          backgroundColor: TOAST_COLORS.background,
        },
        error: {
          style: {
            border: `1px solid ${TOAST_COLORS.error}`,
            color: TOAST_COLORS.error,
          },
          icon: <ErrorToast size={24} />,
        },
        success: {
          style: {
            border: `1px solid ${TOAST_COLORS.success}`,
            color: TOAST_COLORS.success,
          },
          icon: <SuccessToast size={24} />,
        },
        custom: {
          style: {
            border: `1px solid ${TOAST_COLORS.warning}`,
            color: TOAST_COLORS.warning,
          },
          icon: <WarningToast size={24} />,
        },
      }}
    />
  );
};

export default Toast;
