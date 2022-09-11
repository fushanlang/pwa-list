import { useRef } from "react";

import Label from "./Label";

type Props = {
  children: React.ReactNode;
  id?: string;
  label?: string;
  labelMessage?: string;
  isRequired?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input: React.FC<Props> = ({ children, id, label = "", labelMessage = "", isRequired, handleChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Label id={id} label={label} labelMessage={labelMessage} isRequired={isRequired} />
      {children}
      <input id={id} ref={inputRef} type="file" className="hidden" accept="image/*" multiple onChange={handleChange} />
      <button
        className="py-1 px-5 tracking-wide border-2 border-green-400 text-green-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={(e) => {
          inputRef.current.click();
          e.preventDefault();
        }}
      >
        Choose
      </button>
    </>
  );
};

export default Input;
