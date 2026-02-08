/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IFormContainer,
  IFormInputs,
  IRenderInputs,
  PropsInput,
} from "@/types/Forms";
import { cn } from "@/utils";
import { createContext, useContext } from "react";
import RenderDate from "./RenderDate";
import RenderInput from "./RenderInput";
import RenderNumber from "./RenderNumber";
import RenderSelect from "./RenderSelect";

const FormContext = createContext<any>({});

const HandleInputType = ({ input }: PropsInput) => {
  switch (input.type) {
    case "TEXT":
      return <RenderInput input={input} />;
    case "SELECT":
      return <RenderSelect input={input} />;
    case "NUMBER":
      return <RenderNumber input={input} />;
    case "DATE":
      return <RenderDate input={input} />;
    default:
      return <></>;
  }
};

const RenderInputs = ({ input, gridProps, className }: IRenderInputs) => {
  const { errors } = useContext(FormContext);

  console.log(errors);

  const renderInput = (
    <>
      {input.label && (
        <label
          className={`mb-3 block text-sm font-normal lg:mb-4 lg:text-base lg:font-medium${
            errors?.[input.name] ? "text-red-600" : "text-black"
          }`}
        >
          {input.is_required ? (
            <p>
              {input.label} <span className="text-red-500">*</span>{" "}
            </p>
          ) : (
            input.label
          )}
        </label>
      )}
      <HandleInputType input={input} />
      {errors?.[input.name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors?.[input.name]?.message || input.helperText}
        </p>
      )}
    </>
  );

  return (
    <div className={cn("flex items-center", className)} key={input.name}>
      <div className={`w-full ${gridProps?.flexBasis ?? "md:flex-none"}`}>
        <div
          className={` ${errors?.[input.name] ? "border-red-500" : "border-gray-300"}`}
        >
          {renderInput}
        </div>
      </div>
    </div>
  );
};

const FormInputs = ({
  children,
  inputs,
  gridProps,
  showDotsInLabel = true,
  className,
  control,
  boxClassName,
  labelClassName,
}: IFormInputs) => {
  return (
    <div className={`grid grid-cols-1 gap-4 ${className}`}>
      {inputs.map((input, i) => (
        <RenderInputs
          className={boxClassName}
          key={`${input?.name} ${i}`}
          input={{ ...input, control, labelClassName }}
          gridProps={gridProps}
          showDotsInLabel={showDotsInLabel}
        />
      ))}
      {children}
    </div>
  );
};

const FormContainer = ({ children, errors, data, setData }: IFormContainer) => {
  return (
    <FormContext.Provider value={{ errors, data, setData }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContainer, FormInputs };
