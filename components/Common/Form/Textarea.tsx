import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

type Props = {
  id: string;
  label?: string;
  labelMessage?: string;
  isRequired?: boolean;
  maxLength: number;
  state: string;
  errors?: string[];
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
const Textarea: React.FC<Props> = ({ id, label = "", isRequired, maxLength, state, errors = [], handleChange }) => {
  return (
    <>
      <Label id={id} label={label} isRequired={isRequired} />
      <textarea
        id={id}
        className="ring-2 ring-gray-300 mt-1 block w-full rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
        rows={10}
        maxLength={maxLength}
        value={state}
        onChange={handleChange}
      ></textarea>
      <ErrorMessage errors={errors}></ErrorMessage>
    </>
  );
};

export default Textarea;
