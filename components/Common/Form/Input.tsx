import { memo } from "react";

import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

type Props = {
  id?: string;
  label?: string;
  labelMessage?: string;
  isRequired?: boolean;
  inputClass?: string;
  placeholder?: string;
  maxLength: number;
  state: string;
  errors?: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input: React.FC<Props> = memo(
  ({
    id,
    label = "",
    labelMessage = "",
    isRequired,
    inputClass = "w-full",
    placeholder = "",
    maxLength,
    state,
    errors = [],
    handleChange,
  }) => {
    return (
      <>
        <Label id={id} label={label} labelMessage={labelMessage} isRequired={isRequired} />
        <input
          id={id}
          className={`ring-2 ring-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400 ${inputClass}`}
          type="text"
          maxLength={maxLength}
          placeholder={placeholder}
          value={state}
          onChange={handleChange}
        />
        <ErrorMessage errors={errors}></ErrorMessage>
      </>
    );
  }
);

export default Input;
