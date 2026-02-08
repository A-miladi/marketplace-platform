import Select from "@/components/ui/Select";
import { PropsInput } from "@/types/Forms";
import { memo } from "react";
import { useController } from "react-hook-form";

const RenderSelect = ({ input }: PropsInput) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: input.name,
    control: input.control,
    rules: {
      required: input.is_required ? `${input.label} is required` : false,
      ...input.rules,
    },
    defaultValue: input.validation?.multiple ? [] : "",
  });

  const selectedValue = input.validation?.multiple
    ? Array.isArray(field.value)
      ? field.value
      : []
    : field.value;

  return (
    <div className="flex flex-col">
      <Select
        value={selectedValue}
        onChange={(value) => field.onChange(value)}
        options={input.options || []}
        multiSelect={input.validation?.multiple}
        error={!!error}
        helperText={error?.message}
        className="text-sm font-normal lg:text-base lg:font-medium"
      />
    </div>
  );
};

export default memo(RenderSelect);
