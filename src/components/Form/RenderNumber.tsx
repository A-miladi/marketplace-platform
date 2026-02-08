import { PropsInput } from "@/types/Forms";
import { ChangeEvent, memo } from "react";
import { useController } from "react-hook-form";

const RenderNumber = ({ input }: PropsInput) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: input.name,
    control: input.control,
    rules: {
      required: input.is_required ? `${input.label} is required` : false,
      min: input.validation?.min
        ? {
            value: input.validation.min,
            message: `Value must be at least ${input.validation.min}`,
          }
        : undefined,
      ...input.rules,
    },
    defaultValue: input.defaultValue ?? "",
  });

  const handleOnChanged = (e: ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.value);
  };

  return (
    <div className="relative w-full">
      <input
        ref={field.ref}
        value={field.value || ""}
        type="number"
        placeholder={input.placeholder}
        onChange={handleOnChanged}
        min={input.validation?.min}
        className={`h-10 w-full rounded-lg border border-neutral-400 bg-white py-2.5 pl-3 pr-3 text-xs md:h-12 ${
          error ? "focus:ring-error-500 border-red-500" : ""
        } transition focus:border-2 focus:border-primary-700 focus:outline-none active:outline-none ${input.className}`}
      />
    </div>
  );
};

export default memo(RenderNumber);
