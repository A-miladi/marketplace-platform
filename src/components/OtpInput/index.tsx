"use client";
import { OtpInput as Otp } from "reactjs-otp-input";

interface OtpInputProps {
  otp: string;
  onChange: (otp: string) => void;
  length?: number;
  disabled?: boolean;
}

const OtpInput = ({ disabled, length, otp, onChange }: OtpInputProps) => {
  return (
    <Otp
      isDisabled={disabled}
      value={otp}
      onChange={onChange}
      numInputs={length || 5}
      separator={<span className="mx-2 font-bold text-primary-700">-</span>}
      inputStyle={{
        borderRadius: "10px",
        width: "3rem",
        height: "3rem",
        fontSize: "14px",
        color: "#0357A5",
        fontWeight: "400",
        caretColor: "#0357A5",
        border: "1px solid #CFD3DB",
      }}
      focusStyle={{
        border: "2px solid #0357A5",
        outline: "none",
      }}
    />
  );
};

export default OtpInput;
