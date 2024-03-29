import { useRef, memo } from "react";

import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

type Props = {
  children: React.ReactNode;
  id?: string;
  label?: string;
  labelMessage?: string;
  isRequired?: boolean;
  isMultiple?: boolean;
  errors?: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const InputFile: React.FC<Props> = memo(
  ({ children, id, label = "", labelMessage = "", isRequired, isMultiple = false, errors = [], handleChange }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
      <>
        <Label id={id} label={label} labelMessage={labelMessage} isRequired={isRequired} />
        {children}
        <input
          id={id}
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/jpeg, image/png"
          multiple={isMultiple}
          onChange={handleChange}
        />
        <button
          className="py-1 px-5 tracking-wide border-2 border-green-400 text-green-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={(e) => {
            inputRef.current.click();
            e.preventDefault();
          }}
        >
          Choose
        </button>
        <ErrorMessage errors={errors}></ErrorMessage>
      </>
    );
  }
);

export default InputFile;
